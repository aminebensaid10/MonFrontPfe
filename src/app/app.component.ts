import { Component } from '@angular/core';
import { CoreLoadingScreenService } from '@core/services/loading-screen.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(    
    private _coreLoadingScreenService: CoreLoadingScreenService,
    ) {}
}