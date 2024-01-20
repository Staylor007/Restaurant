import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBarComponent } from './add-edit-bar.component';

describe('AddEditBarComponent', () => {
  let component: AddEditBarComponent;
  let fixture: ComponentFixture<AddEditBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditBarComponent]
    });
    fixture = TestBed.createComponent(AddEditBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
