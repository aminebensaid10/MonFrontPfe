import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccessRightsComponent } from './edit-access-rights.component';

describe('EditAccessRightsComponent', () => {
  let component: EditAccessRightsComponent;
  let fixture: ComponentFixture<EditAccessRightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAccessRightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccessRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
