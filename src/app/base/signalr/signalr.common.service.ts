import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Store } from '@ngxs/store';

import { Comment, Pm, Notification, MatchPerson, MatchEvent } from '@domain/models';
import { environment } from '@environments/environment';
import { NewPm, ReadPms, NewNotification, ReadNotifications } from '@core/store/core.actions';
import { MatchPersonActions } from '@match-persons/store/match-persons.actions';
import { Cookies } from '@cedx/ngx-cookies';
import { ChatActions } from '@chat/store';
import { GetChatMessagesListQuery } from '@network/shared/chat/get-chat-messages-list.query';
import { RightSidebarActions } from '@lazy-modules/sidebar-right/store';
import { GetLatestCommentListQuery } from '@network/shared/right-sidebar/get-latest-comments-list.query';
import { UsersOnline } from '@network/shared/right-sidebar/user-online.model';
import { CommentActions } from '@comments/shared/store';
import { AdminActions } from '@admin/store';
import { SignalrEntity } from './models';
import { MatchEventActions } from '@match-events/store';

@Injectable({ providedIn: 'root' })
export class SignalRService {
    private hubConnection: HubConnection;

    constructor(private cookies: Cookies,
                private store: Store,
                @Inject(PLATFORM_ID) private platformId: object) {
                    console.warn("NEW SIGNALR");
    }

    public initializeHub(): void {
        if (isPlatformServer(this.platformId)) {
            return;
        }
        let hubUrl = 'anonym';

        const token = this.cookies.getObject('auth-tokens')?.access_token;
        if (token) {
            hubUrl = 'auth';
        }
        const options = {
            accessTokenFactory() { return token; },
        };

        this.hubConnection?.stop();
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(`${environment.apiUrl}hubs/${hubUrl}`, options)
            .configureLogging(LogLevel.Warning)
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
            this.store.dispatch(new MatchPersonActions.PushMatchPerson(data));
        });
        this.hubConnection.on('updateMe', (data: SignalrEntity<MatchEvent>) => {
            this.store.dispatch(new MatchEventActions.Update(data));
        });
        this.hubConnection.on('newComment', (data: Comment) => {
            data.children = data.children || [];
            this.store.dispatch(new CommentActions.PutNewComment(data));
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
            this.hubConnection.on('updateMatCommCount',
                (data: string) => {
                    this.store.dispatch(new AdminActions.UpdateMaterialCommentsCount(data));
                });
            this.hubConnection.on('updateUserNumbers',
                (data: string) => {
                    this.store.dispatch(new AdminActions.UpdateUsersNumbersCount(data));
                });

        }

        this.hubConnection.stop();
        this.hubConnection.start()
            .then(() => {
                console.warn('started');
            })
            .catch((err: Error) => {
                console.error("signalr-ee", err);
            });
    }
}
