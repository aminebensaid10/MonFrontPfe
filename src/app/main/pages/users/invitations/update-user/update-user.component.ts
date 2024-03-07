import { Component, OnInit } from '@angular/core';
import { InvitationsService } from '../services/membrefamille.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  membreId: any;
  formulaireMembre: any = {};
  contentHeader: ContentHeader = {
    headerTitle: 'Composition Familiale',
    actionButton: false,
    breadcrumb: {
      links: [
        {
          name: 'Modifier Membre de famille'
        }
      ]
    }
  };
  constructor(private invitationService : InvitationsService , private route: ActivatedRoute,private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idParam = params['id'];
  
      if (!isNaN(Number(idParam))) {
        this.membreId = +idParam;
        this.chargerDonneesMembre();
      } else {
        console.error('ID invalide');
      }
    });
  }
  
  chargerDonneesMembre() {
    this.invitationService.getMembreParId(this.membreId)
      .subscribe(
        response => {

          this.formulaireMembre = response; 
        },
        error => {
          console.error('Erreur lors du chargement des données du membre', error);
        }
      );
  }

  onSubmit() {
    this.invitationService
      .modifierMembreEtCreerDemandeModification(this.membreId, this.formulaireMembre)
      .subscribe(
        response => {
          this.toastr.success('Demande de modification créée avec succès', 'Succès');

          console.log('Membre mis à jour avec succès', response);
          this.router.navigate(['/pages/users/users-list']);

         
        },
        error => {
          this.toastr.error('Erreur lors de la mise à jour du membre', 'Erreur');

          console.error('Erreur lors de la mise à jour du membre', error);
        }
      );
  }
  
}
