import { Component, OnDestroy, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { OrganizationService } from '../../services/organization.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private organizationService: OrganizationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the data in hierchical format to render the graph
    this.route.params.subscribe((params) => {
      const id = parseInt(params['id']);
      this.fetchNodeHierarchy(id);
    });
  }

  /**
   * Fetch node hierarchy to render the graph
   * @param id
   */
  fetchNodeHierarchy(id: number | null = null) {
    this.subscriptions.push(
      this.organizationService
        .getHierchicalNodes(id)
        .subscribe((res) => (this.employeeData = res))
    );
  }

  /**
   * Callback event for selecting node in chart
   * @param event
   */
  nodeSelect(event: any) {
    this.router.navigate(['organization/graph-view', event.node.data.id]);
  }

  /**
   * Unsubscribe from observables and other cleanup operations
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
