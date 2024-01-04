import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

import { PersonService } from '@persons/person.service';
import { Person, PersonType } from '@domain/models';
import { PERSONS_ROUTE } from '@constants/routes.constants';
import { PersonEditService } from '../person-edit.service';
import { PersonEditActions, PersonEditState } from '../store';

@Component({
    selector: 'person-edit',
    templateUrl: './person-edit.component.html'
})

export class PersonEditComponent implements OnInit, AfterViewInit {
    private id: number;
    public editPersonForm: FormGroup;
    public photo: string;

    @Select(PersonEditState.types) types$: Observable<PersonType[]>;

    @Input() public isFull = true;
    @Output() public newPerson = new EventEmitter<Person>();
    @ViewChild('pInput')private elementRef: ElementRef;

    constructor(private service: PersonService,
                private editService: PersonEditService,
                private route: ActivatedRoute,
                private router: Router,
                private snackBar: MatSnackBar,
                private store: Store,
                private formBuilder: FormBuilder) {
    }

    public ngOnInit(): void {
        this.initForm();
        if (this.isFull) {
            this.id = +this.route.snapshot.params.id || 0;
            if (this.id > 0) {
                this.service.getSingle(this.id)
                    .subscribe((data: Person) => this.parse(data));
            }
        }

        this.store.dispatch(new PersonEditActions.GetTypes());
    }

    public ngAfterViewInit(): void {
        this.elementRef.nativeElement.focus();
    }

    public croppedImage(image: string): void {
        this.editPersonForm.controls.photo.patchValue(image);
    }

    public clearImg(): void {
        this.editPersonForm.controls.photo.patchValue(null);
        this.photo = null;
    }

    public onSubmit(): void {
        const person: Person = this.parseForm();
        if (person.birthday) {
            person.birthday = new Date(person.birthday);
            person.birthday = new Date(person.birthday.setHours(person.birthday.getHours() +
                (-1) * person.birthday.getTimezoneOffset() / 60));
        }
        this.service.createOrUpdate(this.id, person)
            .subscribe((data: Person) => {
                    this.snackBar.open('Изменения сохранены');
                    if (this.isFull) {
                        this.router.navigate([PERSONS_ROUTE]);
                    } else {
                        this.newPerson.emit(data);
                        this.editPersonForm.get('firstRussianName').setValue(null);
                        this.editPersonForm.get('lastRussianName').setValue(null);
                        this.editPersonForm.get('nickname').setValue(null);
                        this.editPersonForm.get('number').setValue(null);
                    }
                },
                () => this.snackBar.open('Изменения НЕ сохранены'));

    }

    public parseAcademy(value: string): void {
        this.editService.parseAcademy(value).subscribe(x => this.parse(x));
    }

    public getRandomNumber(): number {
        return Math.random();
    }

    private parse(data: Person): void {
        this.id = data.id;
        data.birthday = new Date(data.birthday);
        this.editPersonForm.patchValue(data);
        if (data?.photo) {
            this.photo = `${data?.photo}?${Math.random()}`;
        }
    }

    private parseForm(): Person {
        const item: Person = this.editPersonForm.value;
        item.id = this.id;
        return item;
    }

    private initForm(): void {
        this.editPersonForm = this.formBuilder.group({
            firstName: ['', Validators.maxLength(30)],
            firstRussianName: [
                '', Validators.compose([
                    Validators.required, Validators.maxLength(30)
                ])
            ],
            lastName: ['', Validators.maxLength(30)],
            lastRussianName: [
                '', Validators.compose([
                    Validators.required, Validators.maxLength(30)
                ])
            ],
            nickname: [null],
            position: [null],
            country: [null],
            birthday: [null],
            number: [null],
            photo: [''],
            type: ['', Validators.required]
        });
    }
}
