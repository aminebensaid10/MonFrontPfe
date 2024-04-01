import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesDemandesModeTransportComponent } from './mes-demandes-mode-transport.component';

describe('MesDemandesModeTransportComponent', () => {
  let component: MesDemandesModeTransportComponent;
  let fixture: ComponentFixture<MesDemandesModeTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesDemandesModeTransportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesDemandesModeTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
