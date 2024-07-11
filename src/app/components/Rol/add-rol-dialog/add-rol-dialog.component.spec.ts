import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRolDialogComponent } from './add-rol-dialog.component';

describe('AddRolDialogComponent', () => {
  let component: AddRolDialogComponent;
  let fixture: ComponentFixture<AddRolDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRolDialogComponent]
    });
    fixture = TestBed.createComponent(AddRolDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
