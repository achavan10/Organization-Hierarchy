import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailsFormComponent } from './employee-details-form.component';

describe('EmployeeDetailsFormComponent', () => {
  let component: EmployeeDetailsFormComponent;
  let fixture: ComponentFixture<EmployeeDetailsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeDetailsFormComponent]
    });
    fixture = TestBed.createComponent(EmployeeDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
