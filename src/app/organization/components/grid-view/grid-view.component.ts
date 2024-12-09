import {
  Component,
  ViewChild,
  AfterViewInit,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Employee } from 'src/store/model/employee.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss'],
})
export class GridViewComponent implements OnInit, AfterViewInit, OnDestroy {
  employeeData!: Employee[];
  dataSource = new MatTableDataSource<any>([]);
  menuIcon: string = 'more_vert';
  subscriptions: Subscription[] = [];
  columns: string[] = [
    'menu',
    'name',
    'id',
    'designation',
    'email',
    'phone',
    'manager',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private organizationService: OrganizationService) {}

  ngOnInit(): void {
    // Get the data in flat format to render the grid
    this.subscriptions.push(
      this.organizationService.getNodes().subscribe((res) => {
        this.employeeData = res;
        this.dataSource.data = res;
      })
    );
  }

  ngAfterViewInit() {
    // Attach paginator to table component
    this.dataSource.paginator = this.paginator;
    const paginatorIntl = this.paginator._intl;
    paginatorIntl.nextPageLabel = '';
    paginatorIntl.previousPageLabel = '';
  }

  /**
   * Get reporting manager name for an employee
   * @param data
   * @returns
   */
  getManager(data: Employee) {
    const manager: Employee[] | null = this.employeeData.filter(
      (emp: Employee) => emp.id === data?.rm_id
    );
    return manager && manager.length ? manager[0].name : '--';
  }

  /**
   * Unsubscribe from observables and other cleanup operations
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
