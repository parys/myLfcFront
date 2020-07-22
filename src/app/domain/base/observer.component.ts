import { OnDestroy, Directive } from '@angular/core';
import { Subscription } from 'rxjs';

// TODO: Add Angular decorator.
export abstract class ObserverComponent implements OnDestroy {

    subscriptions: Subscription[] = [];

    public ngOnDestroy(): void {
        this.subscriptions.forEach(s => s && s.unsubscribe());
    }
}
