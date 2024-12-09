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
import { Employee } from '../../../../store/model/employee.model';
import { Subscription } from 'rxjs';
import { OrganizationService } from 'src/app/organization/services/organization.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-reportee-form',
  templateUrl: './change-reportee-form.component.html',
  styleUrls: ['./change-reportee-form.component.scss'],
})
export class ChangeReporteeFormComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() inputData!: DialogData;
  @Output() changeReportingManager: EventEmitter<{
    employeeId: number;
    rmId: number;
  }> = new EventEmitter();
  form!: FormGroup;
  dialogTitle!: string;
  dialogContent!: string;
  employees!: Employee[];
  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizationService,
    private translate: TranslateService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.configureDialog();
  }

  /**
   * Configure dialog box with necessary details
   */
  configureDialog() {
    this.dialogTitle = this.translate.instant('CHANGE_REPORTING_TITLE');
    this.dialogContent = this.translate.instant('CHANGE_REPORTING_CONTENT');
  }

  ngOnInit(): void {
    // Get the data in flat format to render the grid
    this.subscriptions.push(
      this.organizationService
        .getNodes()
        .subscribe(
          (res) =>
            (this.employees = res.filter(
              (d) =>
                d.id !== this.inputData.node.id &&
                d.id !== this.inputData.node.rm_id
            ))
        )
    );
    this.initializeForm();
  }

  /**
   * Initialize form with default values and validators
   */
  initializeForm() {
    this.form = this.fb.group({
      rmId: ['-1', [Validators.required]],
    });
  }

  /**
   * Emit the data perform change reporting manager operation
   */
  saveForm() {
    if (this.form.valid) {
      this.changeReportingManager.emit({
        employeeId: this.inputData.node.id,
        rmId: parseInt(this.form.value['rmId']),
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
