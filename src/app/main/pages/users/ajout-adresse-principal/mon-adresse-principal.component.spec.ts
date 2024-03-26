import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonAdressePrincipalComponent } from './mon-adresse-principal.component';

describe('MonAdressePrincipalComponent', () => {
  let component: MonAdressePrincipalComponent;
  let fixture: ComponentFixture<MonAdressePrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonAdressePrincipalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonAdressePrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
