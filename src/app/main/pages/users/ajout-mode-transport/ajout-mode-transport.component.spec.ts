import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutModeTransportComponent } from './ajout-mode-transport.component';

describe('AjoutModeTransportComponent', () => {
  let component: AjoutModeTransportComponent;
  let fixture: ComponentFixture<AjoutModeTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutModeTransportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutModeTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
