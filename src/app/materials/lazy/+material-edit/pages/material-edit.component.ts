import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';

import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

import { AuthState } from '@auth/store';
import { ConfirmationMessage } from '@notices/shared';
import { NotifierService } from '@notices/services';
import { ObserverComponent } from '@domain/base';

import { MaterialType } from '@domain/models/material-type.enum';
import { EDIT_ROUTE, MESSAGE } from '@constants/index';
import { MaterialEditService } from '../materials-edit.service';
import { MaterialsState } from '@materials/lazy/store';
import { GetMaterialDetailQuery } from '@network/shared/materials';
import { tap } from 'rxjs/operators';
import { MaterialCategoriesState } from '@material-categories/core/store';
import { GetMaterialCategoriesListQuery } from '@network/shared/material-categories';

@Component({
    selector: 'material-edit',
    templateUrl: './material-edit.component.html'
})

export class MaterialEditComponent extends ObserverComponent implements OnInit {
    private id: number;
    public editForm: FormGroup;
    public item: GetMaterialDetailQuery.Response;
    public type: MaterialType;
    public additional = 'additional';

    @Select(AuthState.isEditor) isEditor$: Observable<boolean>;

    @Select(MaterialCategoriesState.materialCategories) categories$: Observable<GetMaterialCategoriesListQuery.MaterialCategoryListDto[]>;

    constructor(private service: MaterialEditService,
                private router: Router,
                private snackBar: MatSnackBar,
                private location: Location,
                private notifierService: NotifierService,
                private store: Store,
                private clipboard: Clipboard,
                private formBuilder: FormBuilder) {
        super();
        if (this.router.url.startsWith('/news')) {
            this.type = MaterialType.News;
        } else if (this.router.url.startsWith('/blogs')) {
            this.type = MaterialType.Blogs;
        }
    }

    public ngOnInit(): void {
        this.item = this.store.selectSnapshot(MaterialsState.material) || new GetMaterialDetailQuery.Response();
        const userId = this.store.selectSnapshot(AuthState.userId);
        this.id = this.item ?.id ?? 0;
        this.item.userId = userId;
        this.initForm(this.item);
    }

    public onFullSave(): void {
        this.editForm.get('stayOnPage').setValue(false);
        this.editForm.get('pending').setValue(false);
        this.onSubmit(true);
    }

    public onSubmit(copyUrl: boolean = false): void {
        const newsItem = this.editForm.value;
        newsItem.type = this.type;
        this.service.createOrUpdate(newsItem, this.id)
            .subscribe(data => {
                if (!this.editForm.get('stayOnPage').value) {
                    this.router.navigate([`/${MaterialType[this.type].toLowerCase()}`, data.id]);
                }
                if (!this.id) {
                    this.location.go(this.router.createUrlTree([MaterialType[this.type].toLowerCase(), data.id, EDIT_ROUTE]).toString());
                    this.id = data.id;
                    this.editForm.patchValue({id: this.id });
                    this.snackBar.open('Материал создан');
                } else {
                    this.snackBar.open('Материал обновлен');
                }
                if (copyUrl) {
                    this.clipboard.copy(window.location.href);
                }
            },
                e => {
                    this.snackBar.open('Материал НЕ обновлен');
                });
        this.editForm.markAsPristine();
    }

    public updateImage(path: string): void {
        this.editForm.patchValue({ photo: path });
    }

    public updatePreviewImage(path: string): void {
        this.editForm.patchValue({ photoPreview: path });
    }

    public copyPhoto(): void {
        const url = this.editForm.get('source').value;
        let imgTags = '';
        this.service.extractPhoto(url)
            .pipe(
                tap(result => {
                    if (result) {
                        for (const src of result) {
                            imgTags += `<img src="${src}" alt="" /><br/>`;
                        }
                    }
                },
                    null,
                    () => {
                        const oldValue = this.editForm.get(MESSAGE).value;
                        this.editForm.get(MESSAGE).patchValue(oldValue + imgTags);
                    }));
    }

    public showLeaveModal(): Observable<boolean> | boolean {
        if (this.editForm.dirty && this.editForm.touched) {
            return this.notifierService.confirm(new ConfirmationMessage({ title: 'Уйти со страницы?' }));
        } else {
            return true;
        }
    }

    private initForm(material: GetMaterialDetailQuery.Response): void {
        this.editForm = this.formBuilder.group({
            categoryId: [Validators.required],
            title: ['', Validators.required],
            brief: ['', Validators.required],
            message: ['', Validators.required],
            source: [''],
            photoPreview: [null, Validators.required],
            photo: [null, Validators.required],
            canCommentary: [true],
            onTop: [false],
            pending: [true],
            stayOnPage: [true],
            usePhotoInBody: [true],
            tags: [''],
            userId: [],
            type: [],
            id: []
        });
        this.editForm.patchValue(material);
    }
}
