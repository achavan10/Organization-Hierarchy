import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeReporteeFormComponent } from './change-reportee-form.component';

describe('ChangeReporteeFormComponent', () => {
  let component: ChangeReporteeFormComponent;
  let fixture: ComponentFixture<ChangeReporteeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeReporteeFormComponent]
    });
    fixture = TestBed.createComponent(ChangeReporteeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
