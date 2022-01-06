import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Sort } from '@angular/material/sort';

import { PersonStatistics } from '@seasons/models/person-statistics.model';
import { SeasonStatistics } from '@seasons/models/season-statistics.model';
import { Season } from '@seasons/models/season.model';

import { SeasonService } from '@seasons/season.service';

@Component({
    selector: '<season-statistics>',
    templateUrl: './season-statistics.component.html',
    styleUrls: ['./season-statistics.component.scss']
})
export class SeasonStatisticsComponent implements OnInit {
    public statistics: PersonStatistics[] = [];
    public seasons: Season[];
    displayedColumns = ['personName', 
                        'goals-epl', 'goals-ec', 'goals-lc', 'goals-el', 'goals-cl', 'goals',
                        'assists-epl', 'assists-ec', 'assists-lc', 'assists-el', 'assists-cl', 'assists',
                        'yellows-epl', 'yellows-ec', 'yellows-lc', 'yellows-el', 'yellows-cl', 'yellows',
                        'reds-epl', 'reds-ec', 'reds-lc', 'reds-el', 'reds-cl', 'reds',
                         ];

    @ViewChild('seasonSelect', { static: true }) seasonSelect: MatSelect;

    constructor(private seasonService: SeasonService) {

    }

    public ngOnInit(): void {
        this.seasonSelect.selectionChange.subscribe((data: MatSelectChange) => {
            this.update(data.value, false);
        });

        this.seasonService.getAllWithoutFilter()
            .subscribe(data => this.seasons = data.results);

        this.update(0, true);
    }

    public sortData(sort: Sort): void {
        debugger;
        if (!sort.active || sort.direction === '') {
        //    this.sortedData = data;
            return;
          }
     // this.statistics[sort.name]
    // this.sortedData = data.sort((a, b) => {
    //     const isAsc = sort.direction === 'asc';
    //     switch (sort.active) {
    //       case 'name':
    //         return compare(a.name, b.name, isAsc);
    //       case 'calories':
    //         return compare(a.calories, b.calories, isAsc);
    //       case 'fat':
    //         return compare(a.fat, b.fat, isAsc);
    //       case 'carbs':
    //         return compare(a.carbs, b.carbs, isAsc);
    //       case 'protein':
    //         return compare(a.protein, b.protein, isAsc);
    //       default:
    //         return 0;
    //     }
    //   });
    }

    private compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

    private update(id: number, selectUpdate: boolean): void {
        this.seasonService.getStatistics(id)
            .subscribe((data: SeasonStatistics) => {
                this.statistics = data.persons;
                if (selectUpdate) {
                    this.seasonSelect.value = data.id;
                }
            });
    }
}
