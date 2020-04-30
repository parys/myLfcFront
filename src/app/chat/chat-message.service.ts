import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpWrapper } from '@base/httpWrapper';
import { CHAT_MESSAGES_ROUTE } from '@constants/routes.constants';

import { GetChatMessagesListQuery } from '@network/shared/chat/get-chat-messages-list.query';
import { CreateChatMessageCommand } from '@network/shared/chat/create-chat-message.command';
import { UpdateChatMessageCommand } from '@network/shared/chat/update-chat-message.command';


@Injectable()
export class ChatMessageService {
    private actionUrl: string = CHAT_MESSAGES_ROUTE + '/';

    constructor(public http: HttpWrapper) {
    }

    public getAll(filters: GetChatMessagesListQuery.Request): Observable<GetChatMessagesListQuery.Response> {
        return this.http.getWithParams<GetChatMessagesListQuery.Response>(this.actionUrl, filters);
    }

    public create(item: CreateChatMessageCommand.Request): Observable<CreateChatMessageCommand.Response> {
        const stringify = JSON.stringify(item);
        return this.http.post<CreateChatMessageCommand.Response>(this.actionUrl, stringify);
    }

    public update(id: number, item: UpdateChatMessageCommand.Request): Observable<UpdateChatMessageCommand.Response> {
        const stringify = JSON.stringify(item);
        return this.http.put<UpdateChatMessageCommand.Response>(this.actionUrl + id, stringify);
    }

    public delete(id: number): Observable<boolean> {
        return this.http.delete<boolean>(this.actionUrl + id);
    }
}
