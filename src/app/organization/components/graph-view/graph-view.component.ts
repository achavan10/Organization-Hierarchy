import { Component, OnDestroy, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { OrganizationService } from '../../services/organization.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.scss'],
})
export class GraphViewComponent implements OnInit, OnDestroy {
  selectedNode: TreeNode | undefined;
  menuIcon: string = 'settings';
  employeeData!: TreeNode[];
  subscriptions: Subscription[] = [];

  constructor(private organizationService: OrganizationService) {}

  ngOnInit(): void {
    // Get the data in hierchical format to render the graph
    this.subscriptions.push(
      this.organizationService
        .getHierchicalNodes()
        .subscribe((res) => (this.employeeData = res))
    );
  }

  /**
   * Unsubscribe from observables and other cleanup operations
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
