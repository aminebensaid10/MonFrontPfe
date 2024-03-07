import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Notification } from './model/notification';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) {
  }
  getNotifications() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });
    return this.http.get<Notification[]>('http://localhost:8080/api/v1/gestionnaireRH/unreadnotification',{ headers });
  }

  // getNotifications(page, pageSize) {
  //   return this.http.get<Notification[]>(environment.apiUrl + '/api/notifications/getNotifications?page=' + page + '&pageSize=' + pageSize);
  // }

  // markAsRed () {
  //   return this.http.put(environment.apiUrl + '/api/notifications/markAsRead', {});
  // }
}
