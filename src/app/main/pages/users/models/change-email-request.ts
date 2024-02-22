export class ChangeEmailRequest {
    user_id: string;
    admin_id: string;
    new_email: string;
    verification_code: string;
}