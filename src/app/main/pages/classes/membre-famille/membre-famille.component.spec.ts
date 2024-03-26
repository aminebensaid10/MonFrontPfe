import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembreFamilleComponent } from './membre-famille.component';

describe('MembreFamilleComponent', () => {
  let component: MembreFamilleComponent;
  let fixture: ComponentFixture<MembreFamilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembreFamilleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembreFamilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
