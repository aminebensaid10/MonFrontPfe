import { Component, OnInit } from '@angular/core';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { UsersService } from '../services/users-service.service';

@Component({
  selector: 'app-collaborateur-mode-transport',
  templateUrl: './collaborateur-mode-transport.component.html',
  styleUrls: ['./collaborateur-mode-transport.component.scss']
})
export class CollaborateurModeTransportComponent implements OnInit {
  collaborateurs: any[];
  searchTerm: string = '';

  contentHeader: ContentHeader = {
    headerTitle: 'Mode du transport',
    actionButton: false,
    breadcrumb: {
      links: [
        {name: 'Liste des collaborateur avec leur mode du transport'}
      ]
    }
  };
  constructor(private gestionnairePaieService: UsersService) { }

  ngOnInit(): void {
    this.loadModeTransport();
  }
  loadModeTransport() {
    this.gestionnairePaieService.getcollaborateur().subscribe(
      data => {
        this.collaborateurs = data;
      },
      error => {
        console.log('Une erreur est survenue lors du chargement des modes du transport : ', error);
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
      (collaborateur.modeDeTransport && collaborateur.modeDeTransport.toLowerCase().includes(lowerCaseSearchTerm)) 
    );
  }
}
