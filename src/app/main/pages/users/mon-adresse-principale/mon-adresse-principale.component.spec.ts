import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonAdressePrincipaleComponent } from './mon-adresse-principale.component';

describe('MonAdressePrincipaleComponent', () => {
  let component: MonAdressePrincipaleComponent;
  let fixture: ComponentFixture<MonAdressePrincipaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonAdressePrincipaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonAdressePrincipaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
