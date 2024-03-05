import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SocketService } from 'app/shared/services/socket.service';

import { environment } from 'environments/environment';
import { Subscription } from 'rxjs';
import { Notification } from './model/notification';
import { NotificationsService } from './notifications.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';


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
  @ViewChild('myDrop') myDrop: any; 
  constructor(private socketService: SocketService, private notificationsService: NotificationsService,config: NgbDropdownConfig) {
    config.autoClose = 'outside';

  }

  ngOnInit(): void {
    // const storedUnreadCount = localStorage.getItem('unreadNotifsCount');
    // this.unreadNotifsCount = storedUnreadCount ? +storedUnreadCount : 0;
    this.getNotifications();
    // let sub = this.socketService.onNotificationReceived().subscribe(notif => {
    //   this.unreadNotifsCount++;
    //   this.notifications.unshift(notif);
    // });
    // this.subscriptions.add(sub);
  }
  getNotifications() {
    this.notificationsService.getNotifications().subscribe(data => {
      this.notifications = data;
      this.unreadNotifsCount = this.notifications.filter(x => !x.seen).length;
      // localStorage.setItem('unreadNotifsCount', this.unreadNotifsCount.toString());

    });
  }
  
  
  

  // getNotifications() {
  //   this.loadingNotifs = true;
  //   this.notificationsService.getNotifications(this.page, this.pageSize).subscribe(data => {
  //     this.notifications.push(...data);
  //     this.loadingNotifs = false;
  //     if (data.length < this.pageSize) {
  //       this.canShowMore = false;
  //     }
  //     this.unreadNotifsCount = this.notifications.filter(x => x.seen == false).length
  //   });
  // }

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

  // showMoreNotifications() {
  //   this.page++;
  //   this.getNotifications();
  // }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }
}
