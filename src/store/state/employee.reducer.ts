import { createReducer, on } from '@ngrx/store';
import {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  updateReportingManager,
  addEmployeeSuccess,
  updateEmployeeSuccess,
  deleteEmployeeSuccess,
  updateReportingManagerSuccess,
  addEmployeeFailure,
  updateEmployeeFailure,
  deleteEmployeeFailure,
  updateReportingManagerFailure,
} from './employee.actions';
import { Employee } from '../model/employee.model';
import { LocalStorageUtils } from '../../app/localStorage.utils';

// Organization state model
export interface OrganizationState {
  nodes: Employee[];
  success: string | null;
  error: string | null;
}

export const LOCAL_STORAGE_KEY = 'organizationState';

// initial organization state
const initialState: OrganizationState = {
  nodes: LocalStorageUtils.getFromLocalStorage(LOCAL_STORAGE_KEY) || [
    {
      name: 'John Doe',
      designation: 'Chief Executive Officer',
      id: 1,
      email: 'john.doe@org.com',
      phone: 9178224567,
      isRootNode: true,
      rm_id: null,
    },
    {
      name: 'Jane Smith',
      designation: 'Chief Financial Officer',
      id: 2,
      email: 'jane.smith@org.com',
      phone: 9478247589,
      rm_id: 1,
    },
    {
      name: 'Jack Black',
      designation: 'Finance Lead',
      id: 3,
      email: 'jack.black@org.com',
      phone: 8178247589,
      rm_id: 2,
    },
    {
      name: 'James Brown',
      designation: 'Chief Technology Officer',
      id: 4,
      email: 'james.brown@org.com',
      phone: 9978247511,
      rm_id: 1,
    },
    {
      name: 'Karen Noah',
      designation: 'Technical Manager',
      id: 5,
      email: 'karen.noah@org.com',
      phone: 8773447556,
      rm_id: 4,
    },
    {
      name: 'Nate Mills',
      designation: 'QA Manager',
      id: 6,
      email: 'nate.mills@org.com',
      phone: 9673447512,
      rm_id: 4,
    },
  ],
  success: null,
  error: null,
};

/**
 * Employee reducer function to carry out CRUD operations
 */
export const employeeReducer = createReducer(
  initialState,
  // add employee operations
  on(addEmployee, (state, { employee }) => {
    const updatedNodes = [...state.nodes, employee];
    LocalStorageUtils.saveToLocalStorage(LOCAL_STORAGE_KEY, updatedNodes);

    return {
      ...state,
      nodes: updatedNodes,
      error: null,
    };
  }),
  on(addEmployeeSuccess, (state, { message }) => ({
    ...state,
    success: message,
  })),
  on(addEmployeeFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // update employee operations
  on(updateEmployee, (state, { employee }) => {
    const updatedNodes = state.nodes.map((n) =>
      n.id === employee.id ? { ...n, ...employee } : n
    );
    LocalStorageUtils.saveToLocalStorage(LOCAL_STORAGE_KEY, updatedNodes);

    return {
      ...state,
      nodes: updatedNodes,
      error: null,
    };
  }),
  on(updateEmployeeSuccess, (state, { message }) => ({
    ...state,
    success: message,
  })),
  on(updateEmployeeFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // delete employee operations
  on(deleteEmployee, (state, { employeeId }) => {
    const deletedNode = state.nodes.find((n) => n.id === employeeId);
    if (!deletedNode) return state;
    const updatedNodes = state.nodes
      .map((n) =>
        n.rm_id === employeeId ? { ...n, rm_id: deletedNode.rm_id } : n
      )
      .filter((n) => n.id !== employeeId);
    LocalStorageUtils.saveToLocalStorage(LOCAL_STORAGE_KEY, updatedNodes);

    return {
      ...state,
      nodes: updatedNodes,
      error: null,
    };
  }),
  on(deleteEmployeeSuccess, (state, { message }) => ({
    ...state,
    success: message,
  })),
  on(deleteEmployeeFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // update reporting manager operations
  on(updateReportingManager, (state, { employeeId, rmId }) => {
    const updatedNodes = state.nodes.map((n) =>
      n.id === employeeId ? { ...n, rm_id: rmId } : n
    );
    LocalStorageUtils.saveToLocalStorage(LOCAL_STORAGE_KEY, updatedNodes);

    return {
      ...state,
      nodes: state.nodes.map((n) =>
        n.id === employeeId ? { ...n, rm_id: rmId } : n
      ),
      error: null,
    };
  }),
  on(updateReportingManagerSuccess, (state, { message }) => ({
    ...state,
    success: message,
  })),
  on(updateReportingManagerFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
