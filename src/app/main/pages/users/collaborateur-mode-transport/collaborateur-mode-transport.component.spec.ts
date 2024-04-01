import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborateurModeTransportComponent } from './collaborateur-mode-transport.component';

describe('CollaborateurModeTransportComponent', () => {
  let component: CollaborateurModeTransportComponent;
  let fixture: ComponentFixture<CollaborateurModeTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaborateurModeTransportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaborateurModeTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
