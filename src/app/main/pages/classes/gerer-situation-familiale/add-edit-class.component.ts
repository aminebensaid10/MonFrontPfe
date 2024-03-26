import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../classes.service';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-class',
  templateUrl: './add-edit-class.component.html',
  styleUrls: ['./add-edit-class.component.scss']
})
export class AddEditClassComponent implements OnInit {
  demandesSituationFamiliale: any[] = [];
  searchTerm: string = '';

  
  contentHeader: ContentHeader = {
    headerTitle: 'Situation Familiale',
    actionButton: false,
    breadcrumb: {
      links: [
        {name: 'Demandes de situation familiale'}
      ]
    }
  };
  
  constructor(private classesService: ClassesService,  private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchDemandesSituationFamiliale();
  }
  validateRequest(demandesituationfamiliale_id: number): void {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir valider cette demande ?');
  
    if (confirmation) {
      this.classesService.validateRequestSituation(demandesituationfamiliale_id).subscribe(
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
  fetchDemandesSituationFamiliale() {
    this.classesService.getDemandesSituationFamiliale().subscribe(
      (data: any[]) => {
        this.demandesSituationFamiliale = data;
      },
      (error) => {
        console.error('Error fetching demandes situation familiale', error);
      }
    );
  }
  refreshDemandes(): void {
    this.classesService.getDemandesSituationFamiliale().subscribe(
      (data) => {
        this.demandesSituationFamiliale = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des demandes:', error);
      }
    );
  }
  rejectRequest(demandesituationfamiliale_id: number): void {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir rejeter cette demande ?');
    if (confirmation) {
    this.classesService.rejectRequestsituation(demandesituationfamiliale_id).subscribe(
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
      return this.demandesSituationFamiliale;
    }
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    return this.demandesSituationFamiliale.filter(demande =>
      (demande.collaborateur.nom && demande.collaborateur.nom.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (demande.collaborateur.prenom && demande.collaborateur.prenom.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (demande.nouvelleSituation && demande.nouvelleSituation.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (demande.typeDemande && demande.typeDemande.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (demande.etat && demande.etat.toLowerCase().includes(lowerCaseSearchTerm))
    );
  }
}
