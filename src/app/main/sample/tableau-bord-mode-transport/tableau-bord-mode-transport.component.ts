import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { UsersService } from 'app/main/pages/users/services/users-service.service';

@Component({
  selector: 'app-tableau-bord-mode-transport',
  templateUrl: './tableau-bord-mode-transport.component.html',
  styleUrls: ['./tableau-bord-mode-transport.component.scss']
})
export class TableauBordModeTransportComponent implements OnInit {
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
  chartDataTransportMode: any[];
  percentageData: { [key: string]: number };

  public view: any[] = [800, 400];
  public showLegend = true;
  public legendPosition = 'right';
  public explodeSlices = false;
  ngOnInit(): void {
    this.dashboardService.getUsersByModeTransport().subscribe(data => {
      this.chartDataTransportMode = this.transformData(data);
      
    });
    this.dashboardService.gePecrentageModeTransport().subscribe(percentageData => {
      this.percentageData = percentageData;
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
            color = 'rgba(0, 255, 0, 0.7)'; 
            break;
          case 'invalide':
            color = 'rgba(255, 0, 0, 0.7)'; 
            break;
          case 'en cours':
            color = 'rgba(255, 255, 0, 0.7)'; 
            break;
          default:
            color = 'rgba(0, 0, 0, 0.7)'; 
            break;
        }
        result.push({ name: key, value: data[key], color: color });
      }
    }
    return result;
  }
  getPercentageDataKeys(): string[] {
    if (this.percentageData) {
      return Object.keys(this.percentageData);
    } else {
      return [];
    }
  }  

}
