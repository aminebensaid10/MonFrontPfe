import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class ForgotPasswordService {

  constructor(private http: HttpClient) { }

  sendForgotPasswordLink(email) {
    return this.http.put<boolean>(environment.apiUrl + '/api/auth/sendForgotPasswordLink', {email: email});
  }

  resetPasswordValidation(token) {
    return this.http.get<boolean>(environment.apiUrl + '/api/auth/resetPasswordValidation?link=' + token);
  }

  resetPassword(token, new_password) {
    return this.http.put<boolean>(environment.apiUrl + '/api/auth/resetPassword', {token, new_password});
  }
}
