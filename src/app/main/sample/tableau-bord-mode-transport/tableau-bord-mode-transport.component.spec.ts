import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauBordModeTransportComponent } from './tableau-bord-mode-transport.component';

describe('TableauBordModeTransportComponent', () => {
  let component: TableauBordModeTransportComponent;
  let fixture: ComponentFixture<TableauBordModeTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableauBordModeTransportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauBordModeTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
