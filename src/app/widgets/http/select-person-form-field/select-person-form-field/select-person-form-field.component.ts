import {
    Component,
    ChangeDetectionStrategy,
    OnInit, ChangeDetectorRef,
    ElementRef,
    ViewChild,
    Input,
    AfterViewInit,
    OnChanges,
    SimpleChanges,
    Output,
    EventEmitter
} from '@angular/core';
import { FormControl, ControlValueAccessor } from '@angular/forms';

import { distinctUntilChanged, debounceTime, switchMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { AbstractControlComponent, ControlValueProvider } from '@domain/base/abstract-control.component';
import { PagedList, Person, PersonFilters } from '@domain/models';
import { DEBOUNCE_TIME } from '@constants/app.constants';
import { PersonService } from '@persons/person.service';
import { GetMatchPersonsListQuery } from '@network/shared/match-persons';
import { BasePerson } from '@domain/models/base-person.model';


@Component({
    selector: 'select-person-form-field',
    templateUrl: './select-person-form-field.component.html',
    styleUrls: ['./select-person-form-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [
        ControlValueProvider(SelectPersonFormFieldComponent)
    ],
})
export class SelectPersonFormFieldComponent extends AbstractControlComponent<number>
    implements OnInit, OnChanges, AfterViewInit, ControlValueAccessor {

    @Input() personName: string;
    @Input() public selected: GetMatchPersonsListQuery.MatchPersonListDto;
    @Input() public src: Observable<BasePerson[]>;
    @Input() focus = false;
    @Input() type = null;
    @Input() matchId = null;
    @Output() selectionChange = new EventEmitter<BasePerson>();
    @ViewChild('selectInput', { static: true }) selectInput: ElementRef;

    public persons$: Observable<BasePerson[]>;
    public selectCtrl = new FormControl();

    constructor(private personService: PersonService, protected cdRef: ChangeDetectorRef) {
        super(cdRef);
    }

    public ngOnInit(): void {
        if (!this.src) {
            this.persons$ = this.selectCtrl.valueChanges.pipe(
                debounceTime(DEBOUNCE_TIME),
                distinctUntilChanged(),
                switchMap((value: string) => {
                    const filter = new PersonFilters();
                    filter.name = value;
                    filter.type = this.type;
                    filter.matchId = this.matchId;
                    filter.pageSize = 50;
                    return this.personService.getAll(filter);
                }),
                switchMap((pagingPersons: PagedList<Person>): Observable<Person[]> => {
                    return of(pagingPersons.results);
                }));
        } else {
            this.persons$ = this.selectCtrl.valueChanges.pipe(
                distinctUntilChanged(),
                switchMap((value: string) => {
                    value = value.toLowerCase();
                    return this.src.pipe(map(p => p.filter(x => x.personName.toLowerCase().includes(value))                    ));
                }));
        }
        this.selectCtrl.setValue(this.selected?.personName ?? this.personName);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.personName) {
            this.selectCtrl.setValue(changes.personName.currentValue);
        }
        if (changes.person) {
            this.selectCtrl.setValue(changes.person.currentValue.personName);
        }
        if (changes.selected) {
            this.selectCtrl.setValue(changes.selected.currentValue?.personName);
        }
    }


    public onSelectionChange(person: BasePerson): void {
        this.value = person.id || person.personId;
        this.personName = person.personName;
        this.selectionChange.emit(person);
    }

    public ngAfterViewInit(): void {
        this.onFocus();
    }

    private onFocus(): void {
        this.selectInput.nativeElement.focus();
    }

}
