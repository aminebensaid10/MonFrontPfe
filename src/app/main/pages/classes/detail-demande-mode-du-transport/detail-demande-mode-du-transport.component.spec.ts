import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDemandeModeDuTransportComponent } from './detail-demande-mode-du-transport.component';

describe('DetailDemandeModeDuTransportComponent', () => {
  let component: DetailDemandeModeDuTransportComponent;
  let fixture: ComponentFixture<DetailDemandeModeDuTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDemandeModeDuTransportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailDemandeModeDuTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
