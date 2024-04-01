import { Component, OnInit } from '@angular/core';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { UsersService } from '../services/users-service.service';

@Component({
  selector: 'app-mes-demandes-mode-transport',
  templateUrl: './mes-demandes-mode-transport.component.html',
  styleUrls: ['./mes-demandes-mode-transport.component.scss']
})
export class MesDemandesModeTransportComponent implements OnInit {
  searchTerm: string = '';


  demandes: any[] = [];
  searchQuery: string = '';

  contentHeader: ContentHeader = {
    headerTitle: 'Mode du transport',
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
    this.usersService.getDemandesModeTransport().subscribe(
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
      (demande.typeTransport && demande.typeTransport.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (demande.etat && demande.etat.toLowerCase().includes(lowerCaseSearchTerm))
    );
  }
}
