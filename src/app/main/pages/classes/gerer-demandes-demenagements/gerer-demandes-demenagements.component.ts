import { Component, OnInit } from '@angular/core';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { ClassesService } from '../classes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gerer-demandes-demenagements',
  templateUrl: './gerer-demandes-demenagements.component.html',
  styleUrls: ['./gerer-demandes-demenagements.component.scss']
})
export class GererDemandesDemenagementsComponent implements OnInit {
  demandesDemenagement: any[] = [];
  searchTerm: string = '';

  contentHeader: ContentHeader = {
    headerTitle: 'Déménagement',
    actionButton: false,
    breadcrumb: {
      links: [
        {name: 'Demandes de déménagement'}
      ]
    }
  };

  constructor(private classesService: ClassesService,  private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchDemandesSituationFamiliale();

  }
  fetchDemandesSituationFamiliale() {
    this.classesService.getDemandesDemenagement().subscribe(
      (data: any[]) => {
        this.demandesDemenagement = data;
      },
      (error) => {
        console.error('Error fetching demandes demenagement', error);
      }
    );
  }
  validateRequest(demandeDemenagementId: number): void {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir valider cette demande ?');
  
    if (confirmation) {
      this.classesService.validateRequestDemenagement(demandeDemenagementId).subscribe(
        response => {
          console.log('Demande validée avec succès :', response);
          this.toastr.success('Demande validée avec succès', 'Succès');
          this.refreshDemandes();
          window.location.reload();

        },
        error => {
          console.error('Erreur lors de la validation de la demande :', error);
          this.toastr.error('Erreur lors de la validation de la demande', 'Erreur');
        }
      );
    }
  }
  refreshDemandes(): void {
    this.classesService.getDemandesDemenagement().subscribe(
      (data) => {
        this.demandesDemenagement = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des demandes:', error);

      }
    );
  }
  rejectRequest(demandeDemenagementId: number): void {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir rejeter cette demande ?');
    if (confirmation) {
    this.classesService.rejectRequestdemenagement(demandeDemenagementId).subscribe(
      response => {
        console.log('Demande rejetée avec succès :', response);
        this.toastr.success('Demande rejetée avec succès', 'Succès');
        this.refreshDemandes();
        window.location.reload();

      },
      error => {
        console.error('Erreur lors du rejet de la demande :', error);
        this.toastr.error('Erreur lors du rejet de la demande', 'Erreur');
      }
    );
  }
  }
  applyFilter() {
    if (!this.searchTerm) {
      return this.demandesDemenagement;
    }
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    return this.demandesDemenagement.filter(demande =>
      (demande.collaborateur.nom && demande.collaborateur.nom.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (demande.collaborateur.prenom && demande.collaborateur.prenom.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (demande.typeDemande && demande.typeDemande.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (demande.nouvelleAdresse && demande.nouvelleAdresse.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (demande.etat && demande.etat.toLowerCase().includes(lowerCaseSearchTerm))
    );
  }
}
