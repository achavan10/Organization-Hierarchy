import { createAction, props } from '@ngrx/store';
import { Employee } from '../model/employee.model';

// Add Employee action
export const addEmployee = createAction(
  '[Employee] Add Employee',
  props<{ employee: Employee }>()
);

// Add Employee success action
export const addEmployeeSuccess = createAction(
  '[Employee] Add Employee Success',
  props<{ message: string }>()
);

// Add Employee failure action
export const addEmployeeFailure = createAction(
  '[Employee] Add Employee Failure',
  props<{ error: string }>()
);

// Update Employee action
export const updateEmployee = createAction(
  '[Employee] Update Employee',
  props<{ employee: Employee }>()
);

// Update Employee success action
export const updateEmployeeSuccess = createAction(
  '[Employee] update Employee Success',
  props<{ message: string }>()
);

// Update Employee failure action
export const updateEmployeeFailure = createAction(
  '[Employee] Update Employee Failure',
  props<{ error: string }>()
);

// Delete Employee action
export const deleteEmployee = createAction(
  '[Employee] Delete Employee',
  props<{ employeeId: number }>()
);

// Delete Employee success action
export const deleteEmployeeSuccess = createAction(
  '[Employee] Delete Employee Success',
  props<{ message: string }>()
);

// Delete Employee failure action
export const deleteEmployeeFailure = createAction(
  '[Employee] Delete Employee Failure',
  props<{ error: string }>()
);

// Update Reporting manager action
export const updateReportingManager = createAction(
  '[Employee] Update Reporting Manager',
  props<{ employeeId: number, rmId: number }>()
);

// Update Reporting manager success action
export const updateReportingManagerSuccess = createAction(
  '[Employee] Update Reporting Manager Success',
  props<{ message: string }>()
);

// Update Reporting manager error action
export const updateReportingManagerFailure = createAction(
  '[Employee] Update Reporting Manager Failure',
  props<{ error: string }>()
);
