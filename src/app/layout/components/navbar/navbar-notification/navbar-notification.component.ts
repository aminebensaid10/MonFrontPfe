import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from 'app/shared/services/socket.service';

import { environment } from 'environments/environment';
import { Subscription } from 'rxjs';
import { Notification } from './model/notification';
import { NotificationsService } from './notifications.service';


@Component({
  selector: 'app-navbar-notification',
  templateUrl: './navbar-notification.component.html',
  styleUrls: ['./navbar-notification.component.scss'],
})
export class NavbarNotificationComponent implements OnInit, OnDestroy {
  
  notifications: any[] = [];
  showAll = false;
  page = 0;
  pageSize = 10;
  unreadNotifsCount = 0;
  canShowMore = true;

  subscriptions = new Subscription();
  loadingNotifs = false;
  imgPrefix = environment.apiUrl + '/avatars/';
  constructor(private socketService: SocketService, private notificationsService: NotificationsService) {}

  ngOnInit(): void {
    this.getNotifications();
    let sub = this.socketService.onNotificationReceived().subscribe(notif => {
      this.unreadNotifsCount++;
      this.notifications.unshift(notif);
    });
    this.subscriptions.add(sub);
  }

  getNotifications() {
    this.loadingNotifs = true;
    this.notificationsService.getNotifications(this.page, this.pageSize).subscribe(data => {
      this.notifications.push(...data);
      this.loadingNotifs = false;
      if (data.length < this.pageSize) {
        this.canShowMore = false;
      }
      this.unreadNotifsCount = this.notifications.filter(x => x.seen == false).length
    });
  }

  markAsRead() {
      this.notificationsService.markAsRed().subscribe(data => {
      });
  }

  onNgbDropdownToggle($event) {
    if ($event == false) {
      if (this.unreadNotifsCount > 0) {
        this.markAsRead();
        this.unreadNotifsCount = 0;
        this.notifications.map(x => {
          x.seen = true;
          return x;
        });
      }
    }
  }

  toggleNotification() {
    this.showAll = !this.showAll;
  }

  showMoreNotifications() {
    this.page++;
    this.getNotifications();
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }
}
