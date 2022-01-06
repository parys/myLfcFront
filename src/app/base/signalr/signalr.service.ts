import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';

import { Pm, MatchEvent } from '@domain/models';
import { environment } from '@environments/environment';
import { NewPm, ReadPms, NewNotification, ReadNotifications, CoreActios } from '@core/store/core.actions';
import { Cookies } from '@base/cookie';
import { GetChatMessagesListQuery } from '@network/shared/chat/get-chat-messages-list.query';
import { UsersOnline } from '@network/shared/right-sidebar/user-online.model';

import { SignalrEntity } from './models';
import { SignalRActions } from './signalr.actions';
import { GetMatchDetailQuery } from '@network/shared/matches/get-match-detail.query';
import { GetCommentListByEntityIdQuery } from '@network/comments/get-comment-list-by-entity-id-query';
import { MatchPerson } from '@match-persons/models/match-person.model';
import { Notification } from '@notifications/models/notification.model';

@Injectable({ providedIn: 'root' })
export class SignalRService {
    private hubConnection: HubConnection;
    public commentUpdate = new Subject<SignalrEntity<GetCommentListByEntityIdQuery.CommentListDto>>();

    constructor(private cookies: Cookies,
                private store: Store,
                @Inject(PLATFORM_ID) private platformId: object) {
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
            .withAutomaticReconnect()
            .withUrl(`${environment.apiUrl}hubs/${hubUrl}`, options)
            .configureLogging(LogLevel.Warning)
            .build();
        this.hubConnection.on('updateChat', (data: GetChatMessagesListQuery.ChatMessageListDto) => {
            this.store.dispatch(new SignalRActions.UpdateChat(data));
        });
        this.hubConnection.on('updateOnline', (data: UsersOnline) => {
            this.store.dispatch(new SignalRActions.SetOnlineUsers(data));
        });
        this.hubConnection.on('updateMp', (data: SignalrEntity<MatchPerson>) => {
            this.store.dispatch(new SignalRActions.UpdateMP(data));
        });
        this.hubConnection.on('updateMe', (data: SignalrEntity<MatchEvent>) => {
            this.store.dispatch(new SignalRActions.UpdateME(data));
        });
        this.hubConnection.on('updateMatch', (data: SignalrEntity<GetMatchDetailQuery.Response>) => {
            this.store.dispatch(new SignalRActions.UpdateMatch(data));
        });
        this.hubConnection.on('toggleHideTeams', (data: {matchId: number, result: boolean}) => {
            this.store.dispatch(new SignalRActions.ToggleHideTeams(data));
        });
        this.hubConnection.on('comment', (data: SignalrEntity<GetCommentListByEntityIdQuery.CommentListDto>) => {
            data.entity.children = data.entity.children || [];
            this.commentUpdate.next(data);
         //   this.store.dispatch(new SignalRActions.UpdateComment(data));
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

        this.hubConnection.onclose(() => {
            console.log('signalR: on close');
            this.store.dispatch(new CoreActios.ChangeSignalr(false));
        });

        this.hubConnection.stop().then(() => {
            console.log('signalR: stop');
            this.store.dispatch(new CoreActios.ChangeSignalr(false));
        });
        this.hubConnection.start()
            .then(() => {
                this.store.dispatch(new CoreActios.ChangeSignalr(true));
            })
            .catch((err: Error) => {
                this.store.dispatch(new CoreActios.ChangeSignalr(false));
                console.error('signalr-ee', err);
            });
    }

    public on(methodName: string, newMethod: (...args: any[]) => void): void {
        if (!this.hubConnection) {
            console.error('Try to register signalr without worked service');
            return;
        }
        this.hubConnection.on(methodName, newMethod);
    }
}
