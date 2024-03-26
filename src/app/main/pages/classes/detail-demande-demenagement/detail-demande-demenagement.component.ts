import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../classes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-demande-demenagement',
  templateUrl: './detail-demande-demenagement.component.html',
  styleUrls: ['./detail-demande-demenagement.component.scss']
})
export class DetailDemandeDemenagementComponent implements OnInit {
  demandeDemenagementId: string;
  demande: any;
  constructor(private classService: ClassesService,private route : ActivatedRoute) { }
  
  getPdfUrl(fileName: string): string {
    return 'http://localhost:8080/upload/' + fileName;
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.demandeDemenagementId = params['id'];

      this.classService.getDemandeDemenagementById(this.demandeDemenagementId).subscribe(
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
