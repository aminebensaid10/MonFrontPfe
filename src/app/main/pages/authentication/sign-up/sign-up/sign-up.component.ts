import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import French from 'flatpickr/dist/l10n/fr.js';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { UserInscription } from 'app/main/models/users';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from 'app/main/pages/users/models/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignUpComponent implements OnInit {
  @ViewChild('datePicker') datePicker;

  userToAdd = new UserInscription();
  submitted = false;

  dateOptions: FlatpickrOptions = {
    altInput: true,
    altFormat: "F j, Y",
    altInputClass: 'form-control flat-picker flatpickr-input invoice-edit-input',
    enableTime: false,
    hourIncrement: 8,
    locale: French.fr,
    dateFormat: "F j, Y",
  };
  
  

  // submitting data
  loading = false;

  confirmPassword = '';

  // bool if passwords are not valid
  invalidPwd = false;

  // loading pre inscription data
  gettingPreInscription = true;

  // bool if the url is no more valid to finish inscription
  invalidLink = false;

  // the whole image object to be sent in the api
  selectedImage = null;

  // image src to use in html to show preview
  imageSrc = null;

  // birth date ngModel
  birth_date = {
    year: null,
    month: null,
    day: null,
  };

  // error component inputs
  header = "Ce lien n'est plus valide";
  // message = "Cette pre-inscription a été annulée par un administrateur ou bien finalisée par l'utilisateur";
  link = "/auth/login";
  btnText = "Connexion";
  // user: User = new User();
  user = {
    image: '',
    nom: '',
    prenom: '',
    email: '',
    password: '',
    role: '',
    numeroTelephone :'',
    dateNaissance :''
  };

  constructor(private router: Router, private authServices: AuthenticationService,
    private route: ActivatedRoute, private toastr: ToastrService) {

   }

  ngOnInit(): void {
    this.userToAdd.password = null;
  }

  // getPreInscription() {
  //   this.authServices.getPreInscription(this.route.snapshot.params.id).subscribe((data) => {
  //     if (data) {
  //       this.userToAdd = data;
  //     } else {
        
  //     }
  //     this.gettingPreInscription = false;
  //   },
  //   (error) => {
      
  //     this.gettingPreInscription = false;
  //   });
  // }

  // resetImage() {
  //   this.selectedImage = null;
  //   this.imageSrc = null;
  // }

  // onPwdChange() {
  //   if (this.userToAdd.password.length < 6 || this.confirmPassword != this.userToAdd.password || this.userToAdd.password == '') {
  //     this.invalidPwd = true;
  //   } else {
  //     this.invalidPwd = false;
  //   }
  // }

  capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}

signup() {
  const formData = new FormData();
  formData.append('nom', this.user.nom);
  formData.append('prenom', this.user.prenom);
  formData.append('email', this.user.email);
  formData.append('password', this.user.password);
  formData.append('numeroTelephone', this.user.numeroTelephone);
  formData.append('dateNaissance', this.user.dateNaissance);

  formData.append('role', this.user.role);
  formData.append('image', this.user.image);

  this.authServices.signUp(formData).subscribe(
    (result) => {
      if (result) {
        this.toastr.success('Inscription réussie !', 'Succès');
        this.router.navigate(['/auth/login']);
      } else {
        this.toastr.error('Échec de l\'inscription.', 'Erreur');
      }
    },
    (error) => {
      this.toastr.error('Échec de l\'inscription', 'Erreur');
      console.error('Échec de l\'inscription :', error);
    }
  );
}


onFileSelected(event: any) {
  const fileInput = event.target;
  
  if (fileInput.files && fileInput.files[0]) {
    const file = fileInput.files[0];
    this.user.image = file;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageSrc = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}


}
