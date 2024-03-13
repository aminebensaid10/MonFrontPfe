import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesDemandesSituationFamilialeComponent } from './mes-demandes-situation-familiale.component';

describe('MesDemandesSituationFamilialeComponent', () => {
  let component: MesDemandesSituationFamilialeComponent;
  let fixture: ComponentFixture<MesDemandesSituationFamilialeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesDemandesSituationFamilialeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesDemandesSituationFamilialeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
