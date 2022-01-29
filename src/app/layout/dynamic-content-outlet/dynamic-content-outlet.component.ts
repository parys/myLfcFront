import {
    Component,
    ComponentRef,
    Input,
    OnChanges,
    OnDestroy,
    ViewChild,
    ViewContainerRef,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    Type
} from '@angular/core';
import { DynamicContentOutletService } from './dynamic-content-outlet.service';

@Component({
    selector: 'app-dynamic-content-outlet',
    template: `
      <ng-container #container></ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicContentOutletComponent implements OnDestroy, OnChanges {
    @ViewChild('container', { read: ViewContainerRef })
    container: ViewContainerRef;

    @Input() componentName: string;

    private component: ComponentRef<{}>;

    constructor(private dynamicContentService: DynamicContentOutletService,
                private cdr: ChangeDetectorRef) { }

    public async ngOnChanges() {
        await this.renderComponent();
    }

    public ngOnDestroy() {
        this.destroyComponent();
    }

    private async renderComponent() {
        this.destroyComponent();

        const cmp = await this.dynamicContentService.GetComponent(
            this.componentName
        ) as Type<any>;
        this.component = this.container.createComponent<any>(cmp);

        this.container.insert(this.component.hostView);
        this.cdr.markForCheck();
    }

    private destroyComponent() {
        if (this.component) {
            this.component.destroy();
            this.component = null;
        }
    }
}
