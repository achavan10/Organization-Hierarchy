import { Employee } from 'src/store/model/employee.model';

// CRUD Operations
export type Action = 'ADD' | 'UPDATE' | 'DELETE' | 'CHANGE_REPORTEE';

// Dialog data model
export interface DialogData {
  node: Employee;
  action: Action;
}

// Menu details model
export interface MenuDetails {
  action: Action;
  icon: string;
  option: string;
}
