import {
    Injectable,
    Injector,
    createNgModuleRef,
} from '@angular/core';
import { ILazyModule } from '@layout/ilazy-module.interface';
import { DynamicContentOutletRegistry } from './dynamic-content-outlet.registry';

@Injectable()
export class DynamicContentOutletService {
    constructor(
        private injector: Injector
    ) { }

    async GetComponent(componentName: string): Promise<any> {

        try {
            return await this.createComponent(componentName);
        } catch (error) {
            return await this.createComponent('DynamicContentOutletErrorComponent');
        }
    }

    private getModuleImport(componentName: string) {
        const registryItem = DynamicContentOutletRegistry.find(
            i => i.componentName === componentName
        );

        if (registryItem) {
            return registryItem.module;
        }
    }

    private async createComponent(name: string) {
        const lazyModule = await this.getModuleImport(name);
        const moduleRef = createNgModuleRef(lazyModule, this.injector);
        return (moduleRef.instance as ILazyModule).getComponent();
    }
}
