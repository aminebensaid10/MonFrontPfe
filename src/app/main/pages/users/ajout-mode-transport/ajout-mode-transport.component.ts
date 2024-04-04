import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { InvitationsService } from '../invitations/services/membrefamille.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ajout-mode-transport',
  templateUrl: './ajout-mode-transport.component.html',
  styleUrls: ['./ajout-mode-transport.component.scss']
})
export class AjoutModeTransportComponent implements OnInit {
  contentHeader: ContentHeader = {
    headerTitle: 'Mode Transport',
    actionButton: false,
    breadcrumb: {
      links: [
        {name: 'Ajouter mon mode du transport'}
      ]
    }
  };
  demandeForm: FormGroup;

  demandeObject: any = {
    typeTransport : '',
    justificatifModeTransport: null
  };
  isFormInvalid = false;
  constructor(private modetransport: InvitationsService, private toastr: ToastrService ,private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { 
    this.demandeForm = this.formBuilder.group({
      typeTransport: ['', Validators.required],
      
      justificatifModeTransport: ['', Validators.required],

         });
  }

  ngOnInit(): void {
  }
  onSubmit() {
    this.modetransport.creerDemandeModeTransport(this.demandeObject)
      .subscribe(
        response => {
          this.toastr.success('Demande du mode de transport créée avec succès', 'Succès');
          this.router.navigate(['/pages/users/my-requests-transport-mode']);

        },
        error => {
          this.toastr.error('Le mode du transport est déjà définie pour le collaborateur.', 'Erreur');
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
