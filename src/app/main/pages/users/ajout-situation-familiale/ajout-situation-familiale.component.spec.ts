import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutSituationFamilialeComponent } from './ajout-situation-familiale.component';

describe('AjoutSituationFamilialeComponent', () => {
  let component: AjoutSituationFamilialeComponent;
  let fixture: ComponentFixture<AjoutSituationFamilialeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutSituationFamilialeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutSituationFamilialeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
