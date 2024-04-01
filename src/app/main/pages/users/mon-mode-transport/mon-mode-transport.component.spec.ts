import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonModeTransportComponent } from './mon-mode-transport.component';

describe('MonModeTransportComponent', () => {
  let component: MonModeTransportComponent;
  let fixture: ComponentFixture<MonModeTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonModeTransportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonModeTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
