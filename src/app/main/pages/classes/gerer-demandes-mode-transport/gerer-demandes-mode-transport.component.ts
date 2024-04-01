import { Component, OnInit } from '@angular/core';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { ClassesService } from '../classes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gerer-demandes-mode-transport',
  templateUrl: './gerer-demandes-mode-transport.component.html',
  styleUrls: ['./gerer-demandes-mode-transport.component.scss']
})
export class GererDemandesModeTransportComponent implements OnInit {
  demandesModeTransport: any[] = [];
  searchTerm: string = '';

  contentHeader: ContentHeader = {
    headerTitle: 'Mode du transport',
    actionButton: false,
    breadcrumb: {
      links: [
        {name: 'Demandes du mode de transport '}
      ]
    }
  };
  constructor(private classesService: ClassesService,  private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchDemandesTransportMode();
  }
  fetchDemandesTransportMode() {
    this.classesService.getDemandesModeTransport().subscribe(
      (data: any[]) => {
        this.demandesModeTransport = data;
      },
      (error) => {
        console.error('Error fetching demandes transport Mode', error);
      }
    );
  }
  applyFilter() {
    if (!this.searchTerm) {
      return this.demandesModeTransport;
    }
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    return this.demandesModeTransport.filter(demande =>
      (demande.collaborateur.nom && demande.collaborateur.nom.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (demande.collaborateur.prenom && demande.collaborateur.prenom.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (demande.typeDemande && demande.typeDemande.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (demande.typeTransport && demande.typeTransport.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (demande.etat && demande.etat.toLowerCase().includes(lowerCaseSearchTerm))
    );
  }
  validateRequest(demandeModeTransportId: number): void {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir valider cette demande ?');
  
    if (confirmation) {
      this.classesService.validateRequestModeTransport(demandeModeTransportId).subscribe(
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
    this.classesService.getDemandesModeTransport().subscribe(
      (data) => {
        this.demandesModeTransport = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des demandes:', error);

      }
    );
  }
  rejectRequest(demandeModeTransportId: number): void {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir rejeter cette demande ?');
    if (confirmation) {
    this.classesService.rejectRequestModeTransport(demandeModeTransportId).subscribe(
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
}
