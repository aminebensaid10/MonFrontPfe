import { Component, OnInit } from '@angular/core';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { UsersService } from '../services/users-service.service';

@Component({
  selector: 'app-collaborateur-adresse-prinicpal',
  templateUrl: './collaborateur-adresse-prinicpal.component.html',
  styleUrls: ['./collaborateur-adresse-prinicpal.component.scss']
})
export class CollaborateurAdressePrinicpalComponent implements OnInit {
  collaborateurs: any[];
  searchTerm: string = '';

  contentHeader: ContentHeader = {
    headerTitle: 'Déménagement',
    actionButton: false,
    breadcrumb: {
      links: [
        {name: 'Liste des collaborateur avec leur adresse principale'}
      ]
    }
  };

  constructor(private situationFamilialeService: UsersService) { }

  ngOnInit(): void {
    this.loadAdressePrincipale();
  }
  loadAdressePrincipale() {
    this.situationFamilialeService.getcollaborateur().subscribe(
      data => {
        this.collaborateurs = data;
      },
      error => {
        console.log('Une erreur est survenue lors du chargement des adresses principal : ', error);
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
      (collaborateur.adressePrincipale && collaborateur.adressePrincipale.toLowerCase().includes(lowerCaseSearchTerm)) 
    );
  }
}
