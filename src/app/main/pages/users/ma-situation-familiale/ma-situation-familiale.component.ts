import { Component, OnInit } from '@angular/core';
import { InvitationsService } from '../invitations/services/membrefamille.service';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationModalComponent } from 'app/shared/modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-ma-situation-familiale',
  templateUrl: './ma-situation-familiale.component.html',
  styleUrls: ['./ma-situation-familiale.component.scss']
})
export class MaSituationFamilialeComponent implements OnInit {
  situationFamiliale: string;
  demandeForm: FormGroup;

  demandeObject: any = {
    nouvelleSituation:  '',
    justificatifSituationFamiliale: null
  };
  isFormInvalid = false;
  contentHeader: ContentHeader = {
    headerTitle: 'Situation Familiale',
    actionButton: false,
    breadcrumb: {
      links: [
        {
          name: 'Ma situation familiale'
        }
      ]
    }
  };

  constructor(private situationfamiliale : InvitationsService ,private formBuilder: FormBuilder,
    private toastr: ToastrService) {
    this.demandeForm = this.formBuilder.group({
      nouvelleSituation: ['', Validators.required],
      
      justificatifSituationFamiliale: ['', Validators.required],

         });
   }
   confirmerDemandeSuppression(): void {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir créer cette demande de suppression ?');

    if (confirmation) {
      // L'utilisateur a cliqué sur "OK"
      this.situationfamiliale.creerDemandeSuppressionSituationFamiliale().subscribe(
        response => {
          // Afficher un toast de succès
          this.toastr.success('Demande de suppression créée avec succès.', 'Succès');
        },
        error => {
          // Afficher un toast d'erreur
          this.toastr.error('Erreur lors de la création de la demande de suppression.', 'Erreur');
        }
      );
    }
  }
  ngOnInit(): void {
    this.situationfamiliale.getSituationFamiliale().subscribe(
      response => {
        console.log('Réponse de l\'API : ', response);
        this.situationFamiliale = response;
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération de la situation familiale : ', error);
      }
    );
  }
  onSubmit() {
    this.situationfamiliale.creerDemandeModificationSituationFamiliale(this.demandeObject)
      .subscribe(
        response => {
          this.toastr.success('Demande de modification de situation familiale créée avec succès', 'Succès');
        },
        error => {
          this.toastr.error('Demande de modification de situation familiale est echoué', 'Erreur');
        }
      );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.demandeObject.justificatifSituationFamiliale = file;
  }
  isSubmitDisabled(): boolean {
    return this.demandeForm.valid;
  }
}
