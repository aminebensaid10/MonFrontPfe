import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDemandeDemenagementComponent } from './detail-demande-demenagement.component';

describe('DetailDemandeDemenagementComponent', () => {
  let component: DetailDemandeDemenagementComponent;
  let fixture: ComponentFixture<DetailDemandeDemenagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDemandeDemenagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailDemandeDemenagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
