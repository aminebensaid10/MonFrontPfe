import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { InvitationsService } from '../invitations/services/membrefamille.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mon-mode-transport',
  templateUrl: './mon-mode-transport.component.html',
  styleUrls: ['./mon-mode-transport.component.scss']
})
export class MonModeTransportComponent implements OnInit {
  typeTransport: string;
  contentHeader: ContentHeader = {
    headerTitle: 'Mode du transport',
    actionButton: false,
    breadcrumb: {
      links: [
        {
          name: 'Mon mode du transport'
        }
      ]
    }
  };
  demandeForm: FormGroup
  demandeObject: any = {
    typeTransport: '',
    justificatifModeTransport: null
  };
  isFormInvalid = false;
  constructor(private modetransport : InvitationsService, private toastr: ToastrService, private formbuilder : FormBuilder) {
    this.demandeForm = this.formbuilder.group({
      typeTransport: ['', Validators.required],
      
      justificatifModeTransport: ['', Validators.required],

         });
   }

  ngOnInit(): void {
    this.modetransport.getModeTransport().subscribe(
      response => {
        console.log('Réponse de l\'API : ', response);
        this.typeTransport = response;
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération du mode de transport : ', error);
      }
    );
  }
  confirmerDemandeSuppression(): void {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir créer cette demande de suppression ?');

    if (confirmation) {
      this.modetransport.creerDemandeSuppressionModeTransport().subscribe(
        response => {
          this.toastr.success('Demande de suppression créée avec succès.', 'Succès');
        },
        error => {
          this.toastr.error('Erreur lors de la création de la demande de suppression.', 'Erreur');
        }
      );
    }
  }
  creerDemandeModifciationModeTransport() {
    this.modetransport.creerDemandeModificationTransport(this.demandeObject).subscribe(
      () => {
        this.toastr.success('Demande de modification du mode de transport créée avec succès');
        console.log('Demande du modification du mode de transport créée avec succès');
      },
      error => {
        this.toastr.error('Une erreur est survenue lors de la création de la demande de modification du mode de transport');
        console.error('Une erreur est survenue lors de la création de la demande de modification du mode de transport : ', error);
      }
    );
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.demandeObject.justificatifModeTransport = file;
  }
  isSubmitDisabled(): boolean {
    return this.demandeForm.valid;
  }
}
