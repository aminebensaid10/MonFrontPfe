import { UserShortData } from "app/main/models/users";

export class UserCard extends UserShortData {

    email: string;
    phone_number: string;
    isActif: boolean;
}