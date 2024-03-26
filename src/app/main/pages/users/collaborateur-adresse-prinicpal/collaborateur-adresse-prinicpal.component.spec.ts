import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborateurAdressePrinicpalComponent } from './collaborateur-adresse-prinicpal.component';

describe('CollaborateurAdressePrinicpalComponent', () => {
  let component: CollaborateurAdressePrinicpalComponent;
  let fixture: ComponentFixture<CollaborateurAdressePrinicpalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaborateurAdressePrinicpalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaborateurAdressePrinicpalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
