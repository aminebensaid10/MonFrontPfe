import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { UsersService } from 'app/main/pages/users/services/users-service.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-tableau-bord-demandes',
  templateUrl: './tableau-bord-demandes.component.html',
  styleUrls: ['./tableau-bord-demandes.component.scss']
})
export class TableauBordDemandesComponent implements OnInit {
  @ViewChild('etatChart') etatChartElement: ElementRef;

  contentHeader: ContentHeader = {
    headerTitle: 'Dashboard',
    actionButton: false,
    breadcrumb: {
      links: [
        {
          name: 'Tableau de Bord'
        }
      ]
    }
  }; 
  constructor(private dashboardService : UsersService) {}
  public chartDataEtat: any[];
  public chartSituationEtat: any[];
  public chartDemenagementEtat: any[];

  public view: any[] = [500, 400];
  public showLegend = true;
  public legendPosition = 'below';
  public explodeSlices = false;
  public colorScheme: string[] = [];

  ngOnInit(): void {
    this.dashboardService.getRequestsFamily().subscribe(data => {
      this.chartDataEtat = this.transformData(data);
      this.colorScheme = this.chartDataEtat.map(item => item.color);

      this.renderEtatChart(); 
    });
    this.dashboardService.getRequestsSituation().subscribe(data => {
      this.chartSituationEtat = this.transformData(data);
      this.colorScheme = this.chartSituationEtat.map(item => item.color);

      // this.renderEtatChart(); 
    });
    this.dashboardService.getRequestsDemenagement().subscribe(data => {
      this.chartDemenagementEtat = this.transformData(data);
      this.colorScheme = this.chartDemenagementEtat.map(item => item.color);

      // this.renderEtatChart(); 
    });
    
    
  }
  onSelect(event: any): void {
    console.log(event);
  }
  transformData(data: any): any[] {
    const result = [];
    console.log('Données brutes :', data); // Vérifiez les données d'entrée
  
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        let color;
        switch (key.toLowerCase()) {
          case 'valide':
            color = 'rgba(0, 255, 0, 0.7)'; // Vert pour Valide
            break;
          case 'invalide':
            color = 'rgba(255, 0, 0, 0.7)'; // Rouge pour Invalide
            break;
          case 'en cours':
            color = 'rgba(255, 255, 0, 0.7)'; // Jaune pour En cours
            break;
          default:
            color = 'rgba(0, 0, 0, 0.7)'; // Couleur par défaut
            break;
        }
        result.push({ name: key, value: data[key], color: color });
      }
    }
  
    console.log('Données transformées :', result); // Vérifiez les données transformées
    return result;
  }
renderEtatChart(): void {
    if (!this.chartDataEtat || !this.etatChartElement) {
      return;
    }
  
    const labels = this.chartDataEtat.map(item => item.name);
    const values = this.chartDataEtat.map(item => item.value);
    const colors = this.chartDataEtat.map(item => item.color);
  
    const ctx = this.etatChartElement.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: colors
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
  
}
