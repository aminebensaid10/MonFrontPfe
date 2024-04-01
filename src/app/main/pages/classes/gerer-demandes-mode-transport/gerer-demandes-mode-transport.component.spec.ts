import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererDemandesModeTransportComponent } from './gerer-demandes-mode-transport.component';

describe('GererDemandesModeTransportComponent', () => {
  let component: GererDemandesModeTransportComponent;
  let fixture: ComponentFixture<GererDemandesModeTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GererDemandesModeTransportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererDemandesModeTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
