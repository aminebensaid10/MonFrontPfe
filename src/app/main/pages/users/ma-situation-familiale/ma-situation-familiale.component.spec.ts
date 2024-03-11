import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaSituationFamilialeComponent } from './ma-situation-familiale.component';

describe('MaSituationFamilialeComponent', () => {
  let component: MaSituationFamilialeComponent;
  let fixture: ComponentFixture<MaSituationFamilialeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaSituationFamilialeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaSituationFamilialeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
