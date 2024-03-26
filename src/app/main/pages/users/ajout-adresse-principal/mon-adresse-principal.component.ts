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
    justificatifAdressePrincipale: null
  };
  isFormInvalid = false;
  constructor(private adressprincipalservice: InvitationsService, private toastr: ToastrService ,private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.demandeForm = this.formBuilder.group({
      nouvelleAdresse: ['', Validators.required],
      
      justificatifAdressePrincipale: ['', Validators.required],

         });
   }

  ngOnInit(): void {
  }
  onSubmit() {
    this.adressprincipalservice.creerDemandeAddressPrincipal(this.demandeObject)
      .subscribe(
        response => {
          this.toastr.success('Demande de adresse principale créée avec succès', 'Succès');
          this.router.navigate(['/pages/users/my-requests-moving']);

        },
        error => {
          this.toastr.error('L adresse principale est déjà définie pour le collaborateur.', 'Erreur');
        }
      );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.demandeObject.justificatifAdressePrincipale = file;
  }
  isSubmitDisabled(): boolean {
    return this.demandeForm.valid;
  }
}
