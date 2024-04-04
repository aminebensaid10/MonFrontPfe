import { Component, OnInit } from '@angular/core'
import { UsersService } from '../pages/users/services/users-service.service';
import { Chart } from 'chart.js';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
  public view: any[] = [700, 400];
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
  }
  onSelect(event: any): void {
    console.log(event);
  }

  transformData(data: any): any[] {
    const result = [];
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        result.push({ name: key, value: data[key] });
      }
    }
    return result;
  }
  renderSituationFamilialeChart(data: any): void {
    const labels = Object.keys(data);
    const values = Object.values(data);

    new Chart('situationFamilialeChart', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
