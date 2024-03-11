import { Component, OnInit } from '@angular/core';
import { InvitationsService } from '../invitations/services/membrefamille.service';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';

@Component({
  selector: 'app-ma-situation-familiale',
  templateUrl: './ma-situation-familiale.component.html',
  styleUrls: ['./ma-situation-familiale.component.scss']
})
export class MaSituationFamilialeComponent implements OnInit {
  situationFamiliale: string;
  contentHeader: ContentHeader = {
    headerTitle: 'Situation Familiale',
    actionButton: false,
    breadcrumb: {
      links: [
        {
          name: 'Ma situation familiale'
        }
      ]
    }
  };

  constructor(private situationfamiliale : InvitationsService) { }

  ngOnInit(): void {
    this.situationfamiliale.getSituationFamiliale().subscribe(
      response => {
        console.log('Réponse de l\'API : ', response);
        this.situationFamiliale = response;
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération de la situation familiale : ', error);
      }
    );
  }
  
}
