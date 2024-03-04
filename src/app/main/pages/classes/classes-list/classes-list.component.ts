import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../classes.service';
import { ToastrService } from 'ngx-toastr';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.scss']
})
export class ClassesListComponent implements OnInit {
  demandes: any[] = [];
  searchQuery: string = '';
  demandesFiltrees: any[] = [];

  constructor(private classService: ClassesService ,  private toastr: ToastrService
    ) { }
    contentHeader: ContentHeader = {
      headerTitle: 'Composition Familiale',
      actionButton: false,
      breadcrumb: {
        links: [
          {name: 'Demandes de composition familiale'}
        ]
      }
    };
    searchDemandes(): void {
      if (this.searchQuery.trim() === '') {
        this.demandesFiltrees = [...this.demandes]; 
      } else {
        this.demandesFiltrees = this.demandes.filter(demande =>
          demande.collaborateur.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    }
  ngOnInit(): void {
    this.classService.getdemandes().subscribe(
      (data) => {
        this.demandes = data;
        this.demandesFiltrees = [...this.demandes];
      },
      (error) => {
        console.error('Erreur lors de la récupération des demandes:', error);
      }
    );
  }
  refreshDemandes(): void {
    this.classService.getdemandes().subscribe(
      (data) => {
        this.demandes = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des demandes:', error);
      }
    );
  }
  validateRequest(demandeId: number): void {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir valider cette demande ?');
  
    if (confirmation) {
      this.classService.validateRequest(demandeId).subscribe(
        response => {
          console.log('Demande validée avec succès :', response);
          this.toastr.success('Demande validée avec succès', 'Succès');
          this.refreshDemandes();
        },
        error => {
          console.error('Erreur lors de la validation de la demande :', error);
          this.toastr.error('Erreur lors de la validation de la demande', 'Erreur');
        }
      );
    }
  }
  
  rejectRequest(demandeId: number): void {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir rejeter cette demande ?');
    if (confirmation) {
    this.classService.rejectRequest(demandeId).subscribe(
      response => {
        console.log('Demande rejetée avec succès :', response);
        this.toastr.success('Demande rejetée avec succès', 'Succès');
        this.refreshDemandes();
      },
      error => {
        console.error('Erreur lors du rejet de la demande :', error);
        this.toastr.error('Erreur lors du rejet de la demande', 'Erreur');
      }
    );
  }
  }
}
