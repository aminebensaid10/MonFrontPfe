import { Injectable } from '@angular/core';
import { AuthenticationService } from 'app/main/pages/authentication/services/authentication.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class SocketService {
  private socket: Socket;

  constructor(private authService: AuthenticationService) {
    this.socket = io(environment.apiUrl, {
      auth: {
        token: this.authService.currentUserValue.token
      }
    });
  }

  onNotificationReceived() {
    return new Observable<Notification>(observer => {
      this.socket.on('order-notifications', notif => {
        observer.next(notif);
      });
    });
  }

  onAccountBlock() {
    return new Observable(observer => {
      this.socket.on('account-block', data => {
        observer.next();
      });
    });
  }
}