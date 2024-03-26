import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users-service.service';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';

@Component({
  selector: 'app-mes-demandes-situation-familiale',
  templateUrl: './mes-demandes-situation-familiale.component.html',
  styleUrls: ['./mes-demandes-situation-familiale.component.scss']
})
export class MesDemandesSituationFamilialeComponent implements OnInit {

  demandes: any[] = [];
  private userProfile: any;
  searchTerm: string = '';

  contentHeader: ContentHeader = {
    headerTitle: 'Situation Familiale',
    actionButton: false,
    breadcrumb: {
      links: [
        {
          name: 'Mes Demandes'
        }
      ]
    }
  };
  constructor(private usersService : UsersService) { }

  ngOnInit(): void {
    this.loadDemandes();

  }
  loadDemandes(): void {
    this.usersService.getDemandesSituation().subscribe(
      (data: any[]) => {
        this.demandes = data;
  
      },
      error => {
        console.error('erreur:', error);
      }
    );
  }
  applyFilter() {
    if (!this.searchTerm) {
      return this.demandes;
    }
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    return this.demandes.filter(demande =>
      (demande.collaborateur.nom && demande.collaborateur.nom.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (demande.collaborateur.prenom && demande.collaborateur.prenom.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (demande.typeDemande && demande.typeDemande.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (demande.nouvelleSituation && demande.nouvelleSituation.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (demande.etat && demande.etat.toLowerCase().includes(lowerCaseSearchTerm))
    );
  }
}
