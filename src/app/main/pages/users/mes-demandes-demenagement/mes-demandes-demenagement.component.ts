import { Component, OnInit } from '@angular/core';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { UsersService } from '../services/users-service.service';

@Component({
  selector: 'app-mes-demandes-demenagement',
  templateUrl: './mes-demandes-demenagement.component.html',
  styleUrls: ['./mes-demandes-demenagement.component.scss']
})
export class MesDemandesDemenagementComponent implements OnInit {
  
  searchTerm: string = '';


  demandes: any[] = [];
  private userProfile: any;
  searchQuery: string = '';

  contentHeader: ContentHeader = {
    headerTitle: 'Déménagement',
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
    this.usersService.getDemandesDemenagement().subscribe(
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
      (demande.nouvelleAdresse && demande.nouvelleAdresse.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (demande.etat && demande.etat.toLowerCase().includes(lowerCaseSearchTerm))
    );
  }
}
