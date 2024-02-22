import { UserShortData } from "app/main/models/users";

export class Notification {
    _id: string;
    sender: UserShortData;
    message: string;
    creation_date: Date;
    seen: boolean;
}