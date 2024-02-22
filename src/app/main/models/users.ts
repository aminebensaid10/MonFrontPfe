
export class UserShortData {
    firstname: string;
    lastname: string;
    photo: string;
    _id: string;
}

export class UserData extends UserShortData {
    email: string;
    password: string;
    birth_date: Date;
    creation_date: Date;
    isActif: boolean;
    phone_number: number;
}

export class UserInscription extends UserData {
    access_rights: any;
}

export class CurrentUser {
    firstname: string;
    lastname: string;
    avatar: string;
    id: string;
    token: string;
    access_rights: any;
}
