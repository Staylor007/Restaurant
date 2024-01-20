import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMenuComponent } from './add-edit-menu.component';

describe('AddEditMenuComponent', () => {
  let component: AddEditMenuComponent;
  let fixture: ComponentFixture<AddEditMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditMenuComponent]
    });
    fixture = TestBed.createComponent(AddEditMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
