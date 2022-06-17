import { Component, OnInit, ChangeDetectorRef, Input, ViewChild, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MESSAGE } from '@constants/help.constants';
import { MAX_CHAT_MESSAGE_LENGTH } from '@constants/app.constants';

import { EditorComponent } from '@editor/editor.component';

import { NotifierService } from '@notices/services';
import { ConfirmationMessage } from '@notices/shared';
import { ObserverComponent } from '@domain/base';
import { GetChatMessagesListQuery } from '@network/shared/chat/get-chat-messages-list.query';
import { CreateChatMessageCommand } from '@network/shared/chat/create-chat-message.command';
import { UpdateChatMessageCommand } from '@network/shared/chat/update-chat-message.command';

@Component({
    selector: 'chat-window',
    templateUrl: './chat-window.component.html',
    styleUrls: ['./chat-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent extends ObserverComponent implements OnInit {
    public messageForm: FormGroup;
    public selectedEditIndex: number = null;

    @ViewChild('chatInput') private elementRef: EditorComponent;
    @Input() public type: number;
    @Input() public height = 200;
    @Input() isLogined: boolean;
    @Input() isModerator: boolean;
    @Input() userId: number;
    @Input() messages: GetChatMessagesListQuery.ChatMessageListDto[];
    @Output() createMessage = new EventEmitter<CreateChatMessageCommand.Request>();
    @Output() updateMessage = new EventEmitter<UpdateChatMessageCommand.Request>();
    @Output() deleteMessage = new EventEmitter<number>();

    constructor(private formBuilder: FormBuilder,
                private cd: ChangeDetectorRef,
                private notifier: NotifierService) {
                    super();
    }

    public ngOnInit(): void {
        this.initForm();
    }

    public onSubmit(): void {
        this.messageForm.markAsPending();
        let message = this.messageForm.value;
        message.type = this.type;

        if (this.selectedEditIndex != null) {
            message = { ...this.messages[this.selectedEditIndex], message: this.messageForm.get(MESSAGE).value };
            this.updateMessage.emit(message);
        } else {
            this.createMessage.emit(message);
        }

        this.cancelEdit();
    }

    public showDeleteModal(index: number): void {
        const sub$ = this.notifier.confirm(new ConfirmationMessage({
            title: 'Удалить ?'
        })).subscribe(result => {
            if (result) {
                this.deleteMessage.emit(this.messages[index].id);
            }
        });
        this.subscriptions.push(sub$);
    }

    public addReply(index: number): void {
        const message: string = this.messageForm.get(MESSAGE).value;
        const userName: string = this.messages[index].userName;
        const newMessage = `<i>${userName}</i>, ${message}`;
        this.messageForm.get(MESSAGE).patchValue(newMessage);
        this.elementRef.setFocus();
        this.cd.markForCheck();
    }

    public edit(index: number): void {
        this.selectedEditIndex = index;
        this.messageForm.get(MESSAGE).patchValue(this.messages[index].message);
    }

    public cancelEdit(): void {
        this.selectedEditIndex = null;
        this.messageForm.get(MESSAGE).patchValue('');
        this.cd.markForCheck();
    }

    public trackByFn(index: number, item: GetChatMessagesListQuery.ChatMessageListDto) {
        if (!item) { return null; }
        return item.id;
    }

    private initForm(message: string = ''): void {
        this.messageForm = this.formBuilder.group({
            message: [message,
                Validators.compose([Validators.required,
                Validators.maxLength(MAX_CHAT_MESSAGE_LENGTH)])], // todo add visual warning
            type: [this.type, Validators.required]
        });
        this.messageForm.valueChanges.subscribe(() => {
            this.cd.markForCheck();
        });
    }
}
