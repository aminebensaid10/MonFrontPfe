import { Component, OnInit } from '@angular/core';
import { InvitationsService } from '../invitations/services/membrefamille.service';
import { ToastrService } from 'ngx-toastr';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajout-situation-familiale',
  templateUrl: './ajout-situation-familiale.component.html',
  styleUrls: ['./ajout-situation-familiale.component.scss']
})
export class AjoutSituationFamilialeComponent implements OnInit {
  contentHeader: ContentHeader = {
    headerTitle: 'Situation Familiale',
    actionButton: false,
    breadcrumb: {
      links: [
        {name: 'Ajouter ma situation familiale'}
      ]
    }
  };
  demandeForm: FormGroup;

  demandeObject: any = {
    nouvelleSituation: '',
    justificatifSituationFamiliale: null
  };
  isFormInvalid = false;

  constructor(private situationfamilialeservice: InvitationsService, private toastr: ToastrService ,private formBuilder: FormBuilder, private router : Router) {
    this.demandeForm = this.formBuilder.group({
      nouvelleSituation: ['', Validators.required],
      
      justificatifSituationFamiliale: ['', Validators.required],

         });

  }

  ngOnInit(): void {
    
  }
  onSubmit() {
    this.situationfamilialeservice.creerDemandeSituationFamiliale(this.demandeObject)
      .subscribe(
        response => {
          this.toastr.success('Demande de situation familiale créée avec succès', 'Succès');
          this.router.navigate(['/pages/users/my-requests']);

        },
        error => {
          this.toastr.error('La situation familiale est déjà définie pour le collaborateur.', 'Erreur');
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
