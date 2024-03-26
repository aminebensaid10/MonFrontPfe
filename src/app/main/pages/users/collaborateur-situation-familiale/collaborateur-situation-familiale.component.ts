import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users-service.service';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';

@Component({
  selector: 'app-collaborateur-situation-familiale',
  templateUrl: './collaborateur-situation-familiale.component.html',
  styleUrls: ['./collaborateur-situation-familiale.component.scss']
})
export class CollaborateurSituationFamilialeComponent implements OnInit {
  collaborateurs: any[];
  searchTerm: string = '';

  contentHeader: ContentHeader = {
    headerTitle: 'Situation Familiale',
    actionButton: false,
    breadcrumb: {
      links: [
        {name: 'Liste des collaborateurs avec leurs situation familiale'}
      ]
    }
  };
  
  constructor(private situationFamilialeService: UsersService) { }

  ngOnInit(): void {
    this.loadSituationFamiliale();

  }
  loadSituationFamiliale() {
    this.situationFamilialeService.getcollaborateur().subscribe(
      data => {
        this.collaborateurs = data;
      },
      error => {
        console.log('Une erreur est survenue lors du chargement des situations familiales : ', error);
      }
    );
  }
  applyFilter() {
    if (!this.searchTerm) {
      return this.collaborateurs;
    }
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    return this.collaborateurs.filter(collaborateur =>
      (collaborateur.nom && collaborateur.nom.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (collaborateur.prenom && collaborateur.prenom.toLowerCase().includes(lowerCaseSearchTerm)) ||

      (collaborateur.email && collaborateur.email.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (collaborateur.situationFamiliale && collaborateur.situationFamiliale.toLowerCase().includes(lowerCaseSearchTerm)) 
    );
  }
}
