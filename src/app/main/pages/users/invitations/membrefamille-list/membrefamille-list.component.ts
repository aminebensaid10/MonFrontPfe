import { Component, OnInit } from '@angular/core';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { SharedModalsService } from 'app/shared/services/shared-modals.service';
import { ToastrService } from 'ngx-toastr';
import { InvitationCard } from '../../models/invitations-list-model';
import { InvitationsService } from '../services/membrefamille.service';

@Component({
  selector: 'app-invitations-list',
  templateUrl: './membrefamille-list.component.html',
  styleUrls: ['./membrefamille-list.component.scss']
})
export class InvitationsListComponent implements OnInit {

  
  membres: any[];

  searchTerm: string = ''
  contentHeader: ContentHeader = {
    headerTitle: 'Composition Familiale',
    actionButton: false,
    breadcrumb: {
      links: [
        {
          name: 'Ma composition familiale'
        }
      ]
    }
  };
  constructor(private invitationsService: InvitationsService, private toastr: ToastrService, private modalsSerivce: SharedModalsService) { }

  ngOnInit(): void {
    this.invitationsService.getMembres().subscribe(
      (response) => {
        this.membres = response; 
      },
      (error) => {
        console.error('Erreur lors de la récupération des membres :', error);
      }
    );
  }
  creerDemandeSuppression(membreId: number) {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir créer une demande de suppression ?");
  
    if (confirmation) {
      this.invitationsService.creerDemandeSuppression(membreId).subscribe(
        (response) => {
          this.toastr.success('La demande de suppression a été créée avec succès', 'Succès');
        },
        (error) => {
          this.toastr.error('Erreur lors de la création de la demande de suppression', 'Erreur');
        }
      );
    }
  }
 
  
  

 
  applyFilter() {
    if (!this.searchTerm) {
      return this.membres;
    }
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    return this.membres.filter(membre =>
      (membre.nomMembre && membre.nomMembre.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (membre.prenomMembre && membre.prenomMembre.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (membre.lienParente && membre.lienParente.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (membre.sexe && membre.sexe.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (membre.dateNaissance && membre.dateNaissance.toLowerCase().includes(lowerCaseSearchTerm))
    );
  }

}
