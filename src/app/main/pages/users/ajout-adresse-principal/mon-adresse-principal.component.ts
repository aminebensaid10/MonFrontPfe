import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { InvitationsService } from '../invitations/services/membrefamille.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mon-adresse-principal',
  templateUrl: './mon-adresse-principal.component.html',
  styleUrls: ['./mon-adresse-principal.component.scss']
})
export class MonAdressePrincipalComponent implements OnInit {
  contentHeader: ContentHeader = {
    headerTitle: 'Déménagement',
    actionButton: false,
    breadcrumb: {
      links: [
        {name: 'Ajouter mon adresse principal'}
      ]
    }
  };
  demandeForm: FormGroup;

  demandeObject: any = {
    nouvelleAdresse: '',
    justificatifAdressePrincipale: null,
    rue: '',
    ville: '',
    gouvernorat: ''
};
  isFormInvalid = false;
  constructor(private adressprincipalservice: InvitationsService, private toastr: ToastrService ,private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.demandeForm = this.formBuilder.group({
      rue: ['', Validators.required],
      ville: ['', Validators.required],
      gouvernorat: ['', Validators.required],
      
      justificatifAdressePrincipale: ['', Validators.required],

         });
   }

  ngOnInit(): void {
  }
  onSubmit() {
    if (this.demandeForm.valid) {
      const adressePrincipale = `${this.demandeForm.value.rue}, ${this.demandeForm.value.ville}, ${this.demandeForm.value.gouvernorat}`;
  
      this.demandeObject.nouvelleAdresse = adressePrincipale;
  
      this.adressprincipalservice.creerDemandeAddressPrincipal(this.demandeObject)
        .subscribe(
          response => {
            this.toastr.success('Demande d adresse principale créée avec succès', 'Succès');
            this.router.navigate(['/pages/users/my-requests-moving']);
          },
          error => {
            this.toastr.error('L adresse principale est déjà définie pour le collaborateur.', 'Erreur');
          }
        );
    } else {
      this.isFormInvalid = true;
    }
  }
  

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.demandeObject.justificatifAdressePrincipale = file;
  }
  isSubmitDisabled(): boolean {
    return this.demandeForm.valid;
  }
}
