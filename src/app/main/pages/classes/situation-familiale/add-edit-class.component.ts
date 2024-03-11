import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../classes.service';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';

@Component({
  selector: 'app-add-edit-class',
  templateUrl: './add-edit-class.component.html',
  styleUrls: ['./add-edit-class.component.scss']
})
export class AddEditClassComponent implements OnInit {
  demandesSituationFamiliale: any[] = [];
  contentHeader: ContentHeader = {
    headerTitle: 'Situation Familiale',
    actionButton: false,
    breadcrumb: {
      links: [
        {name: 'Demandes de situation familiale'}
      ]
    }
  };
  
  constructor(private classesService: ClassesService) { }

  ngOnInit(): void {
    this.fetchDemandesSituationFamiliale();
  }

  fetchDemandesSituationFamiliale() {
    this.classesService.getDemandesSituationFamiliale().subscribe(
      (data: any[]) => {
        this.demandesSituationFamiliale = data;
      },
      (error) => {
        console.error('Error fetching demandes situation familiale', error);
      }
    );
  }

}
