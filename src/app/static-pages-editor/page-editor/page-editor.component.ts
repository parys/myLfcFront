import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subscription } from 'rxjs';

import { StaticPagesEditorService } from '@static-pages-editor/static-pages-editor.service';
import { StaticPage } from '@static-pages-editor/models/static-page.model';
import { HelperType } from '@domain/enums/helper-type.enum';

// import "tinymce/plugins/fullscreen/plugin.min.js";
// import "tinymce/plugins/code/plugin.min.js";
// import "tinymce/plugins/spellchecker/plugin.min.js";
// import "tinymce/plugins/table/plugin.min.js";
// import "tinymce/plugins/visualblocks/plugin.min.js";

@Component({
    selector: 'page-editor',
    templateUrl: './page-editor.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PageEditorComponent implements OnInit, OnDestroy {
    private sub: Subscription;
    private sub2: Subscription;
    private id: number;
    public title: string;
    public editPageForm: FormGroup;
    public content: string;


    constructor(private service: StaticPagesEditorService,
                private cd: ChangeDetectorRef,
                private route: ActivatedRoute,
                private snackBar: MatSnackBar,
                private formBuilder: FormBuilder) {
    }

    public ngOnInit(): void {
        this.initForm();
        this.sub = this.route.params.subscribe(data => {
                this.id = +data.id;
                if (this.id > 0) {
                    this.title = HelperType[this.id];
                    this.sub2 = this.service.getValue(this.id).subscribe((pageData: string) => {
                            if (pageData) {
                                this.content = pageData;
                                this.editPageForm.get('content').patchValue(pageData);
                            }
                        });
                }
            });
    }

    public ngOnDestroy(): void {
        if (this.sub) { this.sub.unsubscribe(); }
        if (this.sub2) { this.sub2.unsubscribe(); }
    }

    private initForm(): void {
        this.editPageForm = this.formBuilder.group({
            content: ['', Validators.required]
        });
        this.editPageForm.valueChanges.subscribe(_ => this.cd.markForCheck());
    }

    public onSubmit(): void {
        const pageModel = new StaticPage();
        pageModel.value = this.editPageForm.controls.content.value;
        if (pageModel.value === '&nbsp;') { pageModel.value = ''; }
        this.service.updateValue(this.id, pageModel).subscribe(data => {
            if (data) {
                this.snackBar.open('Страница обновлена.');
            } else {
                this.snackBar.open('Страница НЕ обновлена.');
            }
        });
    }
}
