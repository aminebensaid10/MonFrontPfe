import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDemandeSituationComponent } from './detail-demande-situation.component';

describe('DetailDemandeSituationComponent', () => {
  let component: DetailDemandeSituationComponent;
  let fixture: ComponentFixture<DetailDemandeSituationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDemandeSituationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailDemandeSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
