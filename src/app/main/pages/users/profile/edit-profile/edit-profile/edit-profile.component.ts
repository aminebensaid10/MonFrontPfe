import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { UserInscription, CurrentUser } from 'app/main/models/users';
import { AuthenticationService } from 'app/main/pages/authentication/services/authentication.service';
import { UsersService } from '../../../services/users-service.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {




  contentHeader: ContentHeader = {
    headerTitle: 'Utilisateurs',
    actionButton: false,
    breadcrumb: {
      links: [
        {
          name: 'profil',
          isLink: true,
          link: '/pages/users/profile/user-profile/' + this.route.snapshot.params.id,
        },
        {
          name: 'modifier profil'
        }
      ]
    }
  };
  
 
  constructor(private authServices: UsersService,
    private route: ActivatedRoute,) { 
     
  }
  

  ngOnInit(): void {
  }


  getWindowWidth() {
    return screen.width;
  }

}
 