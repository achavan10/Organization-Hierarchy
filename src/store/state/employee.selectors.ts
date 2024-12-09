import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrganizationState } from './employee.reducer';
import { Employee } from '../model/employee.model';
import { TreeNode } from 'primeng/api';

export const organizationKey = 'organization';
export const selectOrganizationState =
  createFeatureSelector<OrganizationState>(organizationKey);

/**
 * State selector to get the flat data
 */
export const selectFlatNodes = createSelector(
  selectOrganizationState,
  (state) => state.nodes
);

/**
 * State selector to get the Hierarchical data
 */
export const selectHierarchicalNodes = createSelector(
  selectFlatNodes,
  (nodes) => {
    const map = new Map<number | null, Employee[]>();

    nodes.forEach((node: Employee) => {
      const parentId = node.rm_id || null;
      if (!map.has(parentId)) {
        map.set(parentId, []);
      }
      map.get(parentId)?.push(node);
    });

    // Build Hierarchical data recursively
    const buildTree = (parentId: number | null): TreeNode[] => {
      const children = map.get(parentId || null) || [];
      return children.map((child) => ({
        type: 'person',
        expanded: true,
        data: child,
        children: buildTree(child.id),
      }));
    };

    return buildTree(null);
  }
);

/**
 * State selector to get the error
 */
export const selectError = createSelector(
  selectOrganizationState,
  (state) => state.error
);

/**
 * State selector to get the success
 */
export const selectSuccess = createSelector(
  selectOrganizationState,
  (state) => state.success
);
