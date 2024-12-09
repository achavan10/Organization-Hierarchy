import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../model/dialogData';
import { OrganizationService } from 'src/app/organization/services/organization.service'; 

@Component({
  selector: 'app-dialog-wrapper',
  templateUrl: './dialog-wrapper.component.html',
  styleUrls: ['./dialog-wrapper.component.scss'],
})
export class DialogWrapperComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<DialogWrapperComponent>,
    private organizationService: OrganizationService
  ) {}

  ngOnInit(): void {}

  /**
   * Add / Update organization data from store
   * @param newData
   */
  updateOrganizationData(newData: any) {
    const { action, ...employeeNode } = newData;
    switch (action) {
      case 'ADD':
        try {
          this.organizationService.addEmployee(employeeNode);
        } catch (error) {
          this.organizationService.addEmployeeFailure();
        }
        break;
      case 'UPDATE':
        try {
          this.organizationService.updateEmployee(employeeNode);
        } catch (error) {
          this.organizationService.updateEmployeeFailure();
        }
        break;
    }
  }

  /**
   * Delete organization data from store
   * @param employeeId
   */
  deleteFromOrganizationData(employeeId: number) {
    try {
      this.organizationService.deleteEmployee(employeeId);
    } catch (error) {
      this.organizationService.deleteEmployeeFailure();
    }
  }

  /**
   * Update reporting manager data for an employee from store
   * @param employeeId
   */
  updateReportingManagerData(data: { employeeId: number; rmId: number }) {
    try {
      this.organizationService.updateReportingManager(data);
    } catch (error) {
      this.organizationService.updateReportingManagerFailure();
    }
  }
}
