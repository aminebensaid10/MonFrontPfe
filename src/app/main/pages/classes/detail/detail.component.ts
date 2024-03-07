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
  getPdfUrl(fileName: string): string {
    return 'http://localhost:8080/upload/' + fileName;
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.demandeId = params['id'];

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
