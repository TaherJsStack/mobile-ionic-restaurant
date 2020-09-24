import { Component, OnInit } from '@angular/core';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CartService } from 'src/app/providers/cart.service';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import * as openSocket from "socket.io-client";

@Component({
  selector: 'app-check-order-status',
  templateUrl: './check-order-status.page.html',
  styleUrls: ['./check-order-status.page.scss'],
  providers: [{
    provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class CheckOrderStatusPage implements OnInit {

  notifications;
  orderCode;
  isOptional;
  orderStatus;

  constructor(private CartService: CartService, private clipboard: Clipboard) {
    console.log('=================================> CheckOrderStatusPage <==========================================')
  }

  ngOnInit() {

    this.notifications = JSON.parse(localStorage.getItem('noti')).length;

    const socket = openSocket('https://radiant-peak-40358.herokuapp.com')
    socket.on('orderState', data => {
      this.onGetOrderByCode(this.orderCode);
      if (data.action === 'orderAccept') {
        //  console.log(' orderAccept =>', data)
        // this.OrdersService.getStoreOrders(this.dataPerPage, this.currentPageData)
      } else if (data.action === 'orderPrepare') {
        console.log(' orderPrepare =>', data)

      } else if (data.action === 'orderOnDelivery') {
        console.log(' orderOnDelivery =>', data)

      } else if (data.action === 'orderReceived') {
        console.log(' orderReceived =>', data)
      }
    });

  }

  onGetOrderByCode(code) {
    console.log('code =>', code)
    this.orderCode = code;
    this.CartService.getOrderByCode(code)
      .subscribe(
        order => {
          this.orderStatus = order.order.status;
          console.log('this.orderStatus =>', this.orderStatus);
        },
        err => {
          console.log('err =>', err);
        })
  }


}
