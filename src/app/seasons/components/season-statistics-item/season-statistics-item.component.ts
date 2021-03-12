import { Component, Input } from '@angular/core';
import { Statistics } from '@seasons/models/statistics.model';

@Component({
    selector: 'season-statistics-item',
    templateUrl: './season-statistics-item.component.html'
})
export class SeasonStatisticsItemComponent  {
    @Input() personStat: Statistics;
}
