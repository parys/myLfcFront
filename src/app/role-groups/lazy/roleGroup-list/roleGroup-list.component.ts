import { Component, OnInit } from '@angular/core';
import { RoleGroup } from '@role-groups/models/role-group.model';
import { RoleGroupService } from '@role-groups/core/roleGroup.service';

@Component({
    selector: 'roleGroup-list',
    templateUrl: './roleGroup-list.component.html'
})
export class RoleGroupListComponent implements OnInit {
    public items: RoleGroup[];

    constructor(private service: RoleGroupService) {
    }

    public ngOnInit(): void {
        this.update();
    }

    private update(): void {
        this.service
            .getAllWithRoles()
            .subscribe(data => this.items = data);
    }
}
