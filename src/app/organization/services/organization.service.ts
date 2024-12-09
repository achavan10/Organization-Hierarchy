import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrganizationState } from '../../../store/state/employee.reducer';
import {
  selectHierarchicalNodes,
  selectFlatNodes,
  selectError,
  selectSuccess,
} from '../../../store/state/employee.selectors';
import {
  addEmployee,
  deleteEmployee,
  updateEmployee,
  updateReportingManager,
  addEmployeeFailure,
  updateEmployeeFailure,
  deleteEmployeeFailure,
  updateReportingManagerFailure,
  addEmployeeSuccess,
  updateEmployeeSuccess,
  deleteEmployeeSuccess,
  updateReportingManagerSuccess,
} from '../../../store/state/employee.actions';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  constructor(private store: Store<{ orgnization: OrganizationState }>) {}

  // Get all flat nodes
  getNodes(): Observable<any[]> {
    return this.store.select(selectFlatNodes);
  }

  // Get Hierchical Nodes
  getHierchicalNodes(): Observable<any[]> {
    return this.store.select(selectHierarchicalNodes);
  }

  // Get success messages
  getSuccessMessage(): Observable<string | null> {
    return this.store.select(selectSuccess);
  }

  // Get error messages
  getErrorMessage(): Observable<string | null> {
    return this.store.select(selectError);
  }

  // Add an employee
  addEmployee(employeeNode: any) {
    this.store.dispatch(addEmployee({ employee: employeeNode }));
    this.store.dispatch(
      addEmployeeSuccess({ message: 'Employee added successfully' })
    );
  }

  // Failure in adding employee
  addEmployeeFailure() {
    this.store.dispatch(
      addEmployeeFailure({ error: 'Failed to add employee' })
    );
  }

  // Update employee details
  updateEmployee(employeeNode: any) {
    this.store.dispatch(updateEmployee({ employee: employeeNode }));
    this.store.dispatch(
      updateEmployeeSuccess({
        message: 'Employee details updated successfully',
      })
    );
  }

  // Failure in updating employee
  updateEmployeeFailure() {
    this.store.dispatch(
      updateEmployeeFailure({ error: 'Failed to update employee' })
    );
  }

  // Delete an employee
  deleteEmployee(employeeId: number) {
    this.store.dispatch(deleteEmployee({ employeeId }));
    this.store.dispatch(
      deleteEmployeeSuccess({ message: 'Employee deleted successfully' })
    );
  }

  // Failure in deleting employee
  deleteEmployeeFailure() {
    this.store.dispatch(
      deleteEmployeeFailure({ error: 'Failed to delete employee' })
    );
  }

  // Update reporting manager of an employee
  updateReportingManager(data: { employeeId: number; rmId: number }) {
    this.store.dispatch(updateReportingManager(data));
    this.store.dispatch(
      updateReportingManagerSuccess({
        message: 'Reporting manager updated successfully',
      })
    );
  }

  // Failure in updating reporting manager of an employee
  updateReportingManagerFailure() {
    this.store.dispatch(
      updateReportingManagerFailure({
        error: 'Failed to change reporting manager of an employee',
      })
    );
  }
}
