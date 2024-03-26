import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesDemandesDemenagementComponent } from './mes-demandes-demenagement.component';

describe('MesDemandesDemenagementComponent', () => {
  let component: MesDemandesDemenagementComponent;
  let fixture: ComponentFixture<MesDemandesDemenagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesDemandesDemenagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesDemandesDemenagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
