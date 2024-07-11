import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroMenuComponent } from './registro-menu.component';

describe('RegistroMenuComponent', () => {
  let component: RegistroMenuComponent;
  let fixture: ComponentFixture<RegistroMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroMenuComponent]
    });
    fixture = TestBed.createComponent(RegistroMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
