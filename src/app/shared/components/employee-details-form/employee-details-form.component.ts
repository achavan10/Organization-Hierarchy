import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogData } from '../../model/dialogData';
import { Employee } from 'src/store/model/employee.model';
import { Subscription } from 'rxjs';
import { OrganizationService } from 'src/app/organization/services/organization.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-employee-details-form',
  templateUrl: './employee-details-form.component.html',
  styleUrls: ['./employee-details-form.component.scss'],
})
export class EmployeeDetailsFormComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() inputData!: DialogData;
  @Output() updateEmployee: EventEmitter<any> = new EventEmitter();
  form!: FormGroup;
  designations: string[] = [
    'Chief Executive Officer',
    'Developer',
    'Designer',
    'Manager',
    'QA',
    'Chief Financial Officer',
    'Finance Lead',
    'Chief Technology Officer',
    'Technical Manager',
    'QA Manager',
  ];
  dialogTitle!: string;
  dialogContent!: string;
  isUpdateForm!: boolean;
  btnValue!: string;
  totalEmployees!: Employee[];
  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizationService,
    private translate: TranslateService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.configureDialog();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.organizationService
        .getNodes()
        .subscribe((res) => (this.totalEmployees = res))
    );
    this.initializeForm();
  }

  /**
   * Configure dialog box with necessary details
   */
  configureDialog() {
    switch (this.inputData.action) {
      case 'ADD':
        this.isUpdateForm = false;
        this.dialogTitle = this.translate.instant('ADD_NEW_REPORTEE');
        this.btnValue = this.translate.instant('ADD');
        this.dialogContent = this.translate.instant('ADD_EMPLOYEE_CONTENT');
        break;
      case 'UPDATE':
        this.isUpdateForm = true;
        this.dialogTitle = this.translate.instant('UPDATE_EMPLOYEE');
        this.btnValue = this.translate.instant('UPDATE');
        this.dialogContent = this.translate.instant('UPDATE_EMPLOYEE_CONTENT');
        break;
    }
  }

  /**
   * Initialize form with default values and validators
   */
  initializeForm() {
    this.form = this.fb.group({
      name: [
        this.isUpdateForm ? this.inputData.node.name : '',
        [Validators.required, Validators.minLength(3)],
      ],
      email: [
        this.isUpdateForm ? this.inputData.node.email : '',
        [Validators.required, Validators.email],
      ],
      phone: [
        this.isUpdateForm ? this.inputData.node.phone : '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      designation: [
        this.isUpdateForm ? this.inputData.node.designation : '',
        [Validators.required],
      ],
    });
  }

  /**
   * Get Reporting manager name for an employee
   * @param employee
   * @returns
   */
  getReportingManager(employee: Employee) {
    let rm_name: string;
    if (this.isUpdateForm) {
      const rm = this.totalEmployees.find((emp) => emp.id === employee.rm_id);
      rm_name = !rm ? '' : rm.name;
    } else {
      rm_name = employee.name;
    }
    return rm_name;
  }

  /**
   * Emit the data perform Add / Update operation
   */
  saveForm() {
    if (this.form.valid) {
      const employee: Employee = this.isUpdateForm
        ? { ...this.inputData.node, ...this.form.value }
        : {
            ...this.form.value,
            id: this.totalEmployees.length + 1,
            isRootNode: false,
            rm_id: this.inputData.node.id,
            rm_name: this.inputData.node.name,
          };
      this.updateEmployee.emit({
        ...employee,
        action: this.isUpdateForm ? 'UPDATE' : 'ADD',
      });
    }
  }

  /**
   * Reset the form
   */
  cancelForm() {
    this.form.reset();
  }

  /**
   * Unsubscribe from observables and other cleanup operations
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
