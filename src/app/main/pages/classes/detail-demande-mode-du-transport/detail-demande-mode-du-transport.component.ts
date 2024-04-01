import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../classes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-demande-mode-du-transport',
  templateUrl: './detail-demande-mode-du-transport.component.html',
  styleUrls: ['./detail-demande-mode-du-transport.component.scss']
})
export class DetailDemandeModeDuTransportComponent implements OnInit {
  demandeModeTransportId: string;
  demande: any;
  constructor(private classService: ClassesService,private route : ActivatedRoute) { }
  
  getPdfUrl(fileName: string): string {
    return 'http://localhost:8080/upload/' + fileName;
  }

  ngOnInit(): void { this.route.params.subscribe(params => {
    this.demandeModeTransportId = params['id'];

    this.classService.getDemandeModeTransportById(this.demandeModeTransportId).subscribe(
      (data) => {
        this.demande = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération de la demande:', error);
      }
    );
  });
  
}}