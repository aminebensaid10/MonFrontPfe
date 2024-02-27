import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../classes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  demandeId: string;
  demande: any;
  constructor(private classService: ClassesService, private route : ActivatedRoute) { }

  ngOnInit() {
    // Récupérer les paramètres de l'URL, notamment l'ID de la demande
    this.route.params.subscribe(params => {
      this.demandeId = params['id'];

      // Utiliser l'ID pour récupérer la demande spécifique
      this.classService.getDemandeById(this.demandeId).subscribe(
        (data) => {
          this.demande = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération de la demande:', error);
        }
      );
    });
  }
}
