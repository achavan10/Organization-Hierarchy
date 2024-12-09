import {
  Component,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { DialogData } from '../../model/dialogData';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-employee-form',
  templateUrl: './delete-employee-form.component.html',
  styleUrls: ['./delete-employee-form.component.scss'],
})
export class DeleteEmployeeFormComponent implements OnChanges {
  @Input() inputData!: DialogData;
  @Output() deleteEmployee: EventEmitter<number> = new EventEmitter();
  dialogTitle!: string;
  dialogContent!: string;

  constructor(private translate: TranslateService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.configureDialog();
  }

  /**
   * Configure dialog box with necessary details
   */
  configureDialog() {
    this.dialogTitle = this.translate.instant('DELETE_EMPLOYEE');
    this.dialogContent = this.translate.instant('DELETE_EMPLOYEE_CONTENT', {
      value: this.inputData?.node.name,
    });
  }

  /**
   * Emit the data perform delete employee operation
   */
  delete() {
    this.deleteEmployee.emit(this.inputData.node.id);
  }
}
