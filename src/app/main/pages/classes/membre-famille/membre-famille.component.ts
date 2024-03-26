import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../classes.service';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';

@Component({
  selector: 'app-membre-famille',
  templateUrl: './membre-famille.component.html',
  styleUrls: ['./membre-famille.component.scss']
})
export class MembreFamilleComponent implements OnInit {
  membres: any[] = [];
  membresParCollaborateur: any = {};
  searchTerm: string = '';





  constructor(private membresService: ClassesService) { }
  contentHeader: ContentHeader = {
    headerTitle: 'Composition Familiale',
    actionButton: false,
    breadcrumb: {
      links: [
        {name: 'Listes des membres'}
      ]
    }
  };
  // searchDemandes(): void {
  //   if (this.searchQuery.trim() === '') {
  //     this.demandesFiltrees = [...this.demandes]; 
  //   } else {
  //     this.demandesFiltrees = this.demandes.filter(demande =>
  //       demande.collaborateur.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
  //     );
  //   }
  // }

  ngOnInit(): void {
    this.fetchMembres();

  }
  
  fetchMembres(): void {
    this.membresService.getAllMembres().subscribe(
      (data: any[]) => {
        data.forEach(membre => {
          const collaborateurId = membre.collaborateur.id;
          if (!this.membresParCollaborateur[collaborateurId]) {
            this.membresParCollaborateur[collaborateurId] = [];
          }
          this.membresParCollaborateur[collaborateurId].push(membre);
        });
        this.membres = data;
      },
      (error) => {
        console.error('Error fetching membres', error);
      }
    );
  }
  applyFilter() {
    if (!this.searchTerm) {
      return this.membres;
    }
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    return this.membres.filter(membre =>
      (membre.nomMembre && membre.nomMembre.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (membre.prenomMembre && membre.prenomMembre.toLowerCase().includes(lowerCaseSearchTerm)) ||

      (membre.sexe && membre.sexe.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (membre.collaborateur.nom && membre.collaborateur.nom.toLowerCase().includes(lowerCaseSearchTerm)) ||

      (membre.lienParente && membre.lienParente.toLowerCase().includes(lowerCaseSearchTerm)) 
    );
  }
}
