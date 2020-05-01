import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

import { Subject } from 'rxjs';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Store } from '@ngxs/store';

import { StorageService } from '@base/storage';
import { Comment, Pm, Notification, MatchPerson, MatchEvent } from '@domain/models';
import { environment } from '@environments/environment';
import { NewPm, ReadPms, NewNotification, ReadNotifications } from '@core/store/core.actions';
import { Actions as MpActions } from '@match-persons/store/match-persons.actions';
import { Cookies } from '@cedx/ngx-cookies';
import { ChatActions } from '@chat/store';
import { GetChatMessagesListQuery } from '@network/shared/chat/get-chat-messages-list.query';
import { RightSidebarActions } from '@lazy-modules/sidebar-right/store';
import { GetLatestCommentListQuery } from '@network/shared/right-sidebar/get-latest-comments-list.query';
import { UsersOnline } from '@network/shared/right-sidebar/user-online.model';

@Injectable({ providedIn: 'root' })
export class SignalRService {
    private hubConnection: HubConnection;
    private alreadyStarted = false;
    public newComment: Subject<Comment> = new Subject<Comment>();
    public matchEvent: Subject<MatchEvent> = new Subject<MatchEvent>();

    constructor(private storage: StorageService,
                private cookies: Cookies,
                private store: Store,
                @Inject(PLATFORM_ID) private platformId: object) {
    }

    public initializeHub(): void {
        if (isPlatformServer(this.platformId)) {
            return;
        }
        let hubUrl = 'anonym';

        const token = this.cookies.getObject('auth-tokens')?.access_token || this.storage.getAccessToken();
        if (token) {
            hubUrl = 'auth';
        }
        const options = {
            accessTokenFactory() { return token; },
        };

        if (this.alreadyStarted) {
            this.alreadyStarted = false;
            this.hubConnection.stop();
        }

        this.hubConnection = new HubConnectionBuilder()
            .withUrl(`${environment.apiUrl}hubs/${hubUrl}`, options)
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Error)
            .build();
        this.hubConnection.on('updateChat', (data: GetChatMessagesListQuery.ChatMessageListDto) => {
            this.store.dispatch(new ChatActions.PutToChatMessage(data));
        });
        this.hubConnection.on('updateOnline', (data: UsersOnline) => {
            this.store.dispatch(new RightSidebarActions.SetOnlineUsers(data));
        });
        this.hubConnection.on('addComment', (data: GetLatestCommentListQuery.LastCommentListDto) => {
            this.store.dispatch(new RightSidebarActions.PutToLatestComments(data))
        });
        this.hubConnection.on('updateComment', (data: GetLatestCommentListQuery.LastCommentListDto) => { // todo combine with above method
            this.store.dispatch(new RightSidebarActions.PutToLatestComments(data))
        });
        this.hubConnection.on('addMp', (data: MatchPerson) => {
            this.store.dispatch(new MpActions.PushMatchPerson(data));
        });
        this.hubConnection.on('addMe', (data: MatchEvent) => {
            this.matchEvent.next(data);
        });
        this.hubConnection.on('newComment', (data: Comment) => {
            data.children = data.children || [];
            this.newComment.next(data);
        });
        if (token) {
            this.hubConnection.on('readPm',
                (data: boolean) => {
                    this.store.dispatch(new ReadPms());
                });
            this.hubConnection.on('newPm',
                (data: Pm) => {
                    this.store.dispatch(new NewPm(data));
                });
            this.hubConnection.on('newNotify',
                (data: Notification) => {
                    this.store.dispatch(new NewNotification(data));
                });
            this.hubConnection.on('readNotify',
                (data: number) => {
                    this.store.dispatch(new ReadNotifications(data));
                });
        }

        this.hubConnection.start()
            .then(() => {
                this.alreadyStarted = true;
            })
            .catch((err: Error) => {
               // console.error(err);
            });
    }
}
