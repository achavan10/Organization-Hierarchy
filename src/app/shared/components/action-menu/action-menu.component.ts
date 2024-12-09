import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogWrapperComponent } from '../dialog-wrapper/dialog-wrapper.component';
import { MenuDetails } from '../../model/dialogData';
import { Employee } from 'src/store/model/employee.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss'],
})
export class ActionMenuComponent implements OnInit {
  @Input() icon!: string;
  @Input() data!: Employee;
  menuItems!: MenuDetails[];

  constructor(public dialog: MatDialog, private translate: TranslateService) {}

  ngOnInit() {
    this.initializeMenuItems();
  }

  /**
   * Open Dialog box with required data to carry out different CRUD operations
   * @param node 
   * @param action 
   */
  openDialog(node: Employee, action: string): void {
    const dialogRef = this.dialog.open(DialogWrapperComponent, {
      data: { node, action },
      disableClose: true
    });
  }

  /**
   * Populate action menu items
   */
  initializeMenuItems() {
    this.menuItems = [
      { action: 'ADD', icon: 'person_add', option: this.translate.instant('ADD_REPORTEE') },
      { action: 'UPDATE', icon: 'edit', option: this.translate.instant('EDIT_DETAILS') },
      { action: 'DELETE', icon: 'block', option: this.translate.instant('DELETE_EMPLOYEE') },
      {
        action: 'CHANGE_REPORTEE',
        icon: 'account_tree',
        option: this.translate.instant('CHANGE_REPORTING_LINE'),
      },
    ];
  }

  /**
   * Wrapper function to open dialog box
   * @param node 
   * @param action 
   */
  modifyOrg(node: Employee, action: string) {
    this.openDialog(node, action);
  }
}
