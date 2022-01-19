import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'not-found',
    templateUrl: './not-found.page.html',
    styleUrls: ['./not-found.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {

    constructor() {
    }
}
