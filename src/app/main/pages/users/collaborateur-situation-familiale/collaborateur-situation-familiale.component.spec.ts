import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborateurSituationFamilialeComponent } from './collaborateur-situation-familiale.component';

describe('CollaborateurSituationFamilialeComponent', () => {
  let component: CollaborateurSituationFamilialeComponent;
  let fixture: ComponentFixture<CollaborateurSituationFamilialeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaborateurSituationFamilialeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaborateurSituationFamilialeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
