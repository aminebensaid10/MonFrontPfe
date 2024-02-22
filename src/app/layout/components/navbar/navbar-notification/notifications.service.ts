import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Notification } from './model/notification';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) {
  }

  getNotifications(page, pageSize) {
    return this.http.get<Notification[]>(environment.apiUrl + '/api/notifications/getNotifications?page=' + page + '&pageSize=' + pageSize);
  }

  markAsRed () {
    return this.http.put(environment.apiUrl + '/api/notifications/markAsRead', {});
  }
}
