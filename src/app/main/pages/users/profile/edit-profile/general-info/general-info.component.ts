import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserData, CurrentUser, UserInscription } from 'app/main/models/users';
import { AuthenticationService } from 'app/main/pages/authentication/services/authentication.service';
import { environment } from 'environments/environment';
import French from 'flatpickr/dist/l10n/fr.js';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../services/users-service.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit {
  @ViewChild('datePicker') datePicker;
  @ViewChild('file') imageRef: ElementRef;

  user = new UserData();
  currentUser = new CurrentUser();
  selectedImage = null;
  imageSrc = null;
  users : User ;


  dateOptions: FlatpickrOptions = {
    altInput: true,
    altFormat: "F j, Y",
    altInputClass: 'form-control flat-picker flatpickr-input invoice-edit-input',
    enableTime: false,
    hourIncrement: 8,
    locale: French.fr,
    dateFormat: "F j, Y",
  };

  editUserForm: FormGroup;
  submitted = false;
  emailExist = false;
  loading = false;
  birth_date = {
    year: null,
    month: null,
    day: null
  };
  profileData = {
    nom: '',
    prenom: '',
    numeroTelephone: '',
    dateNaissance: null
  };
  
  imagePrefix = environment.apiUrl + '/avatars/'
  
  constructor(private formBuilder: FormBuilder, private usersService: UsersService,
    private authService: AuthenticationService, private toastr: ToastrService, private route: ActivatedRoute) { 
      this.user._id = route.snapshot.params.id;
      this.currentUser = this.authService.currentUserValue;
  }

  get f() {
    return this.editUserForm.controls;
  }

  updateProfile(): void {
    this.usersService.updateProfile(this.profileData).subscribe(
      response => {
        console.log('Profil mis à jour avec succès : ', response);
        this.toastr.success('Profil mis à jour avec succès');

      },
      error => {
        console.error('Une erreur est survenue lors de la mise à jour du profil : ', error);
        this.toastr.error('Demande de déménagement créée avec succès');
      }
    );
  }
  ngOnInit(): void {
    this.editUserForm = this.formBuilder.group({
      email: new FormControl({value: '', disabled: true}, [Validators.required, Validators.email]),
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      numeroTelephone:['', Validators.required],
      dateNaissance: ['', Validators.minLength(8)],
    });
    this.getuserprofile();
    
  }
  getuserprofile(): void {
    const token = this.authService.getToken();
  
    if (token) {
      this.usersService.getUserProfile(token).subscribe(
        (user: User) => {
          this.profileData.nom = user.nom; 
          this.profileData.prenom = user.prenom; 
          this.profileData.numeroTelephone = user.numeroTelephone;
          this.profileData.dateNaissance = user.dateNaissance; 
          console.log('Profil mis à jour récupéré avec succès :', this.profileData);
          
        },
        (error) => {
          console.error('Erreur lors de la récupération du profil utilisateur :', error);
        }
      );
    } else {
      console.error('Token d\'authentification non disponible.');
    }
  }
  

  // getUserData() {
  //   this.usersService.getUserData(this.user._id).subscribe(data => {
  //     this.user = data;
  //     this.initForm();
  //   });
  // }

  // initForm() {
  //   this.editUserForm.get("firstname").setValue(this.user.firstname);
  //   this.editUserForm.get("lastname").setValue(this.user.lastname);
  //   this.editUserForm.get("email").setValue(this.user.email);
  //   this.datePicker.flatpickr.setDate(new Date(this.user.birth_date));
  //   const date = new Date(this.user.birth_date);
  //   this.birth_date = {
  //     day: date.getDate() - 1,
  //     month: date.getMonth() + 1,
  //     year: date.getFullYear()
  //   }
  //   this.editUserForm.get("birth_date").setValue(this.birth_date);
  //   this.imageSrc = this.imagePrefix + this.user.photo;
  //   this.editUserForm.get("phone_number").setValue(this.user.phone_number);
  // }


  // birthDateSelected(value) {
  //   this.user.birth_date = new Date(
  //     value.year,
  //     value.month - 1,
  //     value.day + 1
  //   );
  // }

  // onFileSelected($event) {
  //   if ($event.target.files && $event.target.files[0]) {
  //     const imageType = ['image/png', 'image/jpeg', 'image/jpg'];
  //     const file = $event.target.files[0];
  //     if (!imageType.includes(file.type)) {
  //       this.resetImage();
  //     } else {
  //       this.selectedImage = file;
  //       const reader = new FileReader();
  //       reader.onload = e => this.imageSrc = reader.result;
  
  //       reader.readAsDataURL(file);
  //     }
  // }
  // }

  capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}

  // onSubmit(){
  //   this.submitted = true;
  //   if (this.editUserForm.invalid){
  //     return;
  //   }
  //   this.user.birth_date = this.datePicker.flatpickrElement.nativeElement._flatpickr.latestSelectedDateObj.setHours(12);
  //   this.user.firstname = this.capitalizeFirstLetter(this.editUserForm.get("firstname").value);
  //   this.user.lastname = this.capitalizeFirstLetter(this.editUserForm.get("lastname").value);
  //   if (this.selectedImage != null) {
  //     this.user.photo = this.user._id + '.' + this.selectedImage.name.split('.').at(-1);
  //   } else if (this.user.photo == null) {
  //     this.user.photo = 'user.png';
  //   }
  //   this.user.email = this.editUserForm.get("email").value;
  //   this.user.phone_number = this.editUserForm.get("phone_number").value;
  //   this.updateUserData();
  // }

  // resetImage() {
  //   this.selectedImage = null;
  //   this.imageSrc = null;
  //   this.user.photo = null;
  //   this.imageRef.nativeElement.value = "";
  // }

  // updateUserData() {
  //   this.usersService.updateUserData(this.user).subscribe(data => {
  //     if (data) {
  //       this.toastr.success('Modifications enregistrées', 'Succès');
  //       if (this.selectedImage != null) {
  //         this.authService.uploadImage(this.selectedImage, this.user._id).subscribe(data => {
  //           this.loading = false;
  //         },
  //         (error) => {
  //           this.loading = false;
  //           this.toastr.error('Photo de profile n\'a pas été enregistrée', 'Échec', {
  //             positionClass: 'toast-bottom-right',
  //             toastClass: 'toast ngx-toastr',
  //             closeButton: true
  //           });
  //         },
  //         () => {
  //           if (this.currentUser.id == this.user._id)
  //           this.updateCurrentUser();
  //         });
  //       } else {
  //         if (this.currentUser.id == this.user._id)
  //         this.updateCurrentUser();
  //       }
        
  //     }
  //   },
  //   (error) => {
  //     this.toastr.error('Opération échouée', 'Échec');
  //   });
  // }

  // updateCurrentUser() {
  //   const newUserData = this.authService.currentUserValue;
  //   newUserData.avatar = this.user.photo + '?id=' + Math.floor(Math.random() * 1000);
  //   newUserData.firstname = this.user.firstname;
  //   newUserData.lastname = this.user.lastname;
  //   this.authService.currentUserSubject.next(newUserData);
  //   localStorage.setItem('currentUser', JSON.stringify(newUserData));
  // }

}
