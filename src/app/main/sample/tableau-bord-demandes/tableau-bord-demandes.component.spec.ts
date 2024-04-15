import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauBordDemandesComponent } from './tableau-bord-demandes.component';

describe('TableauBordDemandesComponent', () => {
  let component: TableauBordDemandesComponent;
  let fixture: ComponentFixture<TableauBordDemandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableauBordDemandesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauBordDemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
