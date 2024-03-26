import { Component, OnInit } from '@angular/core';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { InvitationsService } from '../invitations/services/membrefamille.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mon-adresse-principale',
  templateUrl: './mon-adresse-principale.component.html',
  styleUrls: ['./mon-adresse-principale.component.scss']
})
export class MonAdressePrincipaleComponent implements OnInit {
  adressprincipal: string;
  contentHeader: ContentHeader = {
    headerTitle: 'Déménagement',
    actionButton: false,
    breadcrumb: {
      links: [
        {
          name: 'Mon adresse principale'
        }
      ]
    }
  };
  demandeForm: FormGroup
  demandeObject: any = {
    nouvelleAdresse: '',
    justificatifAdressePrincipale: null
  };
  isFormInvalid = false;
  constructor(private adressprincipale : InvitationsService, private toastr: ToastrService, private formbuilder : FormBuilder) { 
    this.demandeForm = this.formbuilder.group({
      nouvelleAdresse: ['', Validators.required],
      
      justificatifAdressePrincipale: ['', Validators.required],

         });
  }

  ngOnInit(): void {
    this.adressprincipale.getAddressPrincipal().subscribe(
      response => {
        console.log('Réponse de l\'API : ', response);
        this.adressprincipal = response;
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération de l adresse principale : ', error);
      }
    );
  }
  confirmerDemandeSuppression(): void {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir créer cette demande de suppression ?');

    if (confirmation) {
      this.adressprincipale.creerDemandeSuppressionAdressPrincipal().subscribe(
        response => {
          this.toastr.success('Demande de suppression créée avec succès.', 'Succès');
        },
        error => {
          this.toastr.error('Erreur lors de la création de la demande de suppression.', 'Erreur');
        }
      );
    }
  }
  creerDemandeDemenagement() {
    this.adressprincipale.declarerDemenagement(this.demandeObject).subscribe(
      () => {
        this.toastr.success('Demande de déménagement créée avec succès');
        console.log('Demande de déménagement créée avec succès');
      },
      error => {
        this.toastr.error('Une erreur est survenue lors de la création de la demande de déménagement');
        console.error('Une erreur est survenue lors de la création de la demande de déménagement : ', error);
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
