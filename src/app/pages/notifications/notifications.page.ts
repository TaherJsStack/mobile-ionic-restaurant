import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  notifications;

  constructor(private clipboard: Clipboard, public toastController: ToastController) { }

  ngOnInit() {
    // console.log("localStorage.getItem('noti') => ", localStorage.getItem('noti'));
    console.log("localStorage.setItem('noti') =>", JSON.parse(localStorage.getItem('noti')));
    this.notifications = JSON.parse(localStorage.getItem('noti'));
  }

  onCodeCopy(code) {
    this.clipboard.copy(code).then(
      code => {
        this.toastController.create({
          message: 'Your order code: ' + code,
          duration: 2000
        }).then(s => s.present());
      });
  }


}
