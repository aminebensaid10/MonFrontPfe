import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { UsersService } from '../pages/users/services/users-service.service';
import { Chart } from 'chart.js';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('etatChart') etatChartElement: ElementRef;

  constructor(private dashboardService : UsersService) {}

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
  };  public contentFooter: object;
  public chartData: any[];
  chartDataFamilyMembers: any[];


  public view: any[] = [500, 400];
  public showLegend = true;
  public legendPosition = 'right';
  public explodeSlices = false;
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
   

   

    this.dashboardService.getUsersByFamilySituation().subscribe(data => {
      this.chartData = this.transformData(data);
      
    });
    this.dashboardService.getFamilyMembersStatistics().subscribe(chartDataFamilyMembers => {
      this.chartDataFamilyMembers = this.transformData(chartDataFamilyMembers);
      
    });
   

  }
  onSelect(event: any): void {
    console.log(event);
  }

  transformData(data: any): any[] {
    const result = [];
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
    return result;
  }
  
  

// 


}