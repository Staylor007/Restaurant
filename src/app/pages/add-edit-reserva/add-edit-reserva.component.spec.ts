import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditReservaComponent } from './add-edit-reserva.component';

describe('AddEditReservaComponent', () => {
  let component: AddEditReservaComponent;
  let fixture: ComponentFixture<AddEditReservaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditReservaComponent]
    });
    fixture = TestBed.createComponent(AddEditReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
