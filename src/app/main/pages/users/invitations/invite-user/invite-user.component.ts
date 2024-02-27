import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { UserInscription } from 'app/main/models/users';
import { ToastrService } from 'ngx-toastr';
import French from 'flatpickr/dist/l10n/fr.js';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { InvitationsService } from '../services/invitations.service';
import { UsersService } from '../../services/users-service.service';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss']
})
export class InviteUserComponent {
  demandeForm: FormGroup;

  demandeDTO = {
    nomMembre: '',
    prenomMembre: '',
    sexe: '',
    dateNaissance: '',
    lienParente: '',
    justificatif: '',
    commentaire: ''
  };
  isFormInvalid = false;

  @ViewChild('datePicker') datePicker;

  contentHeader: ContentHeader = {
    headerTitle: 'Composition Familiale',
    actionButton: false,
    breadcrumb: {
      links: [
        {name: 'Ajouter un nouveau membre'}
      ]
    }
  };
  
  
  dateOptions: FlatpickrOptions = {
    altInput: true,
    altFormat: "F j, Y",
    altInputClass: 'form-control flat-picker flatpickr-input invoice-edit-input',
    enableTime: false,
    hourIncrement: 8,
    locale: French.fr,
    dateFormat: "F j, Y",
  };
  
  
  constructor(private formBuilder: FormBuilder, private invitationsService: InvitationsService,
    private toastr: ToastrService, private usersService: UsersService) { 
      this.demandeForm = this.formBuilder.group({
        nomMembre: ['', Validators.required],
        prenomMembre: ['', Validators.required],
        sexe: ['', Validators.required],
        dateNaissance: ['', Validators.required],
        lienParente: ['', Validators.required],
        justificatif: ['', Validators.required],
        // commentaire: ['', Validators.required],
      });
  }






  capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }


  onSubmit() {
    this.invitationsService.creerDemandeCompositionFamiliale(this.demandeDTO).subscribe(
      (response: any) => {
        console.log('Réponse de l\'API:', response);
  
        if (response && response.status === 200) {
          this.toastr.success('Demande de composition familiale créée avec succès', 'Succès', {
            positionClass: 'toast-bottom-right',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          this.resetForm();
        } else {
          console.error("La réponse de l'API n'a pas le statut 200 ou est vide");
          this.toastr.error("Une erreur s'est produite", 'Erreur', {
            positionClass: 'toast-bottom-right',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
        }
      },
      (error) => {
        console.error("Erreur lors de la soumission du formulaire :", error);
        this.toastr.error("Une erreur s'est produite", 'Erreur', {
          positionClass: 'toast-bottom-right',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
        this.resetForm();
      }
    );
  }
  
  
  
  
  
  
  
  
  



resetForm() {
  this.demandeDTO = {
    nomMembre: '',
    prenomMembre: '',
    sexe: '',
    dateNaissance: '',
    lienParente: '',
    justificatif: '',
    commentaire: ''
  };
}

}
