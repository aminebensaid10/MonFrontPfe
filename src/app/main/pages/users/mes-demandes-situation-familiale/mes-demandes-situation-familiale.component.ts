import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users-service.service';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';

@Component({
  selector: 'app-mes-demandes-situation-familiale',
  templateUrl: './mes-demandes-situation-familiale.component.html',
  styleUrls: ['./mes-demandes-situation-familiale.component.scss']
})
export class MesDemandesSituationFamilialeComponent implements OnInit {
  filteredDemandes: any[] = [];
  demandesInitiales: any[] = [];

  demandes: any[] = [];
  private userProfile: any;
  searchQuery: string = '';

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
  filter($event: string): void {
  
    if ($event !== '') {
      this.demandes = this.demandes.filter(demande =>
        (demande.membreFamille.nomMembre + ' ' + demande.membreFamille.prenomMembre + ' ' + demande.typeDemande + ' ' + demande.etat)
          .toLowerCase().includes($event.toLowerCase())
      );
    }
  }
}
