import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererDemandesDemenagementsComponent } from './gerer-demandes-demenagements.component';

describe('GererDemandesDemenagementsComponent', () => {
  let component: GererDemandesDemenagementsComponent;
  let fixture: ComponentFixture<GererDemandesDemenagementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GererDemandesDemenagementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererDemandesDemenagementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
