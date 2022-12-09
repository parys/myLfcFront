import { NgModule } from '@angular/core';
import { MatLegacyPaginatorModule as MatPaginatorModule, MatLegacyPaginatorIntl as MatPaginatorIntl } from '@angular/material/legacy-paginator';

import { getRussianPaginatorIntl } from './russian-paginator-intl';

@NgModule({
    imports: [
      MatPaginatorModule
    ],
    exports: [
        MatPaginatorModule
    ],
    providers: [
        { provide: MatPaginatorIntl, useValue: getRussianPaginatorIntl() },
    ]
})
export class PaginationModule { }
