﻿import {
    Component,
    OnInit,
    Input,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    OnChanges,
    AfterViewChecked,
    ElementRef,
    Renderer2
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Comment } from '@domain/models';

import { CommentService } from '@comments/comment.service';
import { ObserverComponent } from '@domain/base';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '@auth/store';
import { GetCommentListByEntityIdQuery } from '@network/comments/get-comment-list-by-entity-id-query';
import { CommentActions, CommentsState } from '../store';
import { SignalRService } from '@base/signalr';
import { SignalrEntity, SignalREntityEnum } from '@base/signalr/models';

@Component({
    selector: 'comment-section',
    templateUrl: './comment-section.component.html',
    styleUrls: ['./comment-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentSectionComponent extends ObserverComponent implements OnInit, OnChanges, AfterViewChecked {
    private prevHeight = 0;
    private isScrolled: boolean;
    public commentAddForm: FormGroup;
    public comments: GetCommentListByEntityIdQuery.CommentListDto[];
    public isSaving = false;
    @Input() public materialId: number;
    @Input() public matchId: number;
    @Input() public type: number;
    @Input() public canCommentary = false;


    @Select(AuthState.isLogined) isLogined$: Observable<boolean>;

    @Select(CommentsState.comments) comments$: Observable<GetCommentListByEntityIdQuery.CommentListDto[]>;
    @Select(CommentsState.commentsNumber) commentsNumber$: Observable<number>;

    constructor(private commentService: CommentService,
        private cd: ChangeDetectorRef,
        private location: Location,
        private store: Store,
        private renderer: Renderer2,
        public element: ElementRef,
        private router: Router,
        private signalR: SignalRService,
        private cdr: ChangeDetectorRef,
        private formBuilder: FormBuilder) {
        super();
    }

    public ngOnInit(): void {
        const sub$ = this.comments$.subscribe(comments => this.comments = comments);
        this.subscriptions.push(sub$);
        //  this.update();
        this.commentAddForm = this.formBuilder.group({
            message: ['', Validators.compose([
                Validators.required, Validators.minLength(3)])]
        });
        this.type = this.type ? this.type : 3;

        const sub2$ = this.commentAddForm.valueChanges.subscribe(() => {
            this.cd.markForCheck();
        });
        this.subscriptions.push(sub2$);
        this.subscribeOnSignalR();
    }

    public ngOnChanges(): void {
        this.isScrolled = false;
    }

    // todo research
    // public ngAfterViewChecked(): void {
    //    if (this.isScrolled) return;
    //    const fragment = this.router.parseUrl(this.router.url).fragment;
    //    if (fragment) {
    //        const element = document.getElementById(fragment);
    //        if (element) {
    //            let scrollTop = document.body.offsetHeight || window.pageYOffset ||
    //                document.documentElement.offsetHeight;
    //            let clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
    //            let top = element.getBoundingClientRect().top + scrollTop - clientTop;
    //            this.renderer.addClass(element, "active");
    //            while (this.prevHeight !== top) {
    //           // do {
    //                console.log("element ");


    //                if (this.prevHeight !== top) {
    //                    console.log("!=");
    //                    console.warn("prevHeight= " + this.prevHeight);
    //                    this.prevHeight = top;
    //                    console.warn("prevHeight= " + this.prevHeight);
    //                } else {
    //                    console.log("===");
    //                }
    //                scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    //                clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
    //                top = element.getBoundingClientRect().top + scrollTop - clientTop;
    //            }
    //            element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" } );
    //           // this.isScrolled = true;

    //        }
    //    }
    // }

    public ngAfterViewChecked(): void {
        if (this.isScrolled) { return; }
        const fragment = this.router.parseUrl(this.router.url).fragment;
        if (fragment) {
            const element = document.getElementById(fragment);
            if (element) {
                this.renderer.addClass(element, 'active');
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                const clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
                const top = element.getBoundingClientRect().top + scrollTop - clientTop;
                if (this.prevHeight !== top) {
                    this.prevHeight = top;
                } else {
                    element.scrollIntoView();
                    this.isScrolled = true;
                    const pathWithoutHash = this.location.path(false);
                    this.location.replaceState(pathWithoutHash);
                }
            }
        }
    }

    public update(): void {
        const filters = new GetCommentListByEntityIdQuery.Request();
        filters.materialId = this.materialId;
        filters.matchId = this.matchId;
        this.store.dispatch(new CommentActions.GetCommentsListByEntity(filters));
    }


    public trackByFn(index: number, item: GetCommentListByEntityIdQuery.CommentListDto) {
        if (!item) { return null; }
        return item.id;
    }

    public onSubmit(): void {
        if (this.isSaving) {
            return;
        }
        this.isSaving = true;
        const comment: Comment = { ...this.commentAddForm.value,
            materialId: this.materialId,
            matchId: this.matchId,
            type: this.type ? this.type : 3 }; // todo

        const sub$ = this.commentService.createOrUpdate(comment.id, comment)
            .subscribe((data: any) => {
                this.commentAddForm.controls.message.patchValue('');
            },
                null,
                () => {
                    this.isSaving = false;
                    this.cd.markForCheck();
                });
        this.subscriptions.push(sub$);
    }

    private subscribeOnSignalR(): void {
        const sub$ = this.signalR.commentUpdate.subscribe(comment => this.putComment(comment));
        this.subscriptions.push(sub$);
    }

    private putComment(comment: SignalrEntity<GetCommentListByEntityIdQuery.CommentListDto>): void {

        if (this.matchId !== comment.entity.matchId && this.materialId !== comment.entity.materialId) {
            return;
        }
        // add comments count update
        if (comment.entity.parentId) {
            return;
        }

        if (comment.type === SignalREntityEnum.Add) {
            this.comments = [...this.comments, comment.entity];
            this.cdr.detectChanges();
        }
        // TODO implement remove comments
    }
}
