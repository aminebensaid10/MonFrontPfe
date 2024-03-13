import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../classes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-demande-situation',
  templateUrl: './detail-demande-situation.component.html',
  styleUrls: ['./detail-demande-situation.component.scss']
})
export class DetailDemandeSituationComponent implements OnInit {
  demandeSituationId: string;
  demande: any;
  constructor(private classService: ClassesService,private route : ActivatedRoute ) { }
  getPdfUrl(fileName: string): string {
    return 'http://localhost:8080/upload/' + fileName;
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.demandeSituationId = params['id'];

      this.classService.getDemandeSituationById(this.demandeSituationId).subscribe(
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
