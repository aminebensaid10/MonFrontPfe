// user-inscription.model.ts

export class User {
    nom: string;
    prenom: string;
    email: string;
    password: string;
    role: string;
    numeroTelephone :string;
    image : File;
    dateNaissance: Date
    imagePath:string;
    token: string;

   
  
    constructor(data: Partial<User> = {}) {
      Object.assign(this, data);
    }
  }
  