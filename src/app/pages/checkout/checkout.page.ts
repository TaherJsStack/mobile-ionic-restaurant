import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../providers/cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
// import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import * as openSocket from "socket.io-client";
const shopId = environment.shopId;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  regions = [
    { area: 'السیدة زینب', cost: 10 },
    { area: 'جاردن سیتي', cost: 10 },
    { area: 'وسط البلد', cost: 10 },
    { area: 'رمسیس', cost: 15 },
    { area: 'غمرة', cost: 15 },
    { area: 'العباسیة', cost: 20 },
    { area: 'مصر القدیمة', cost: 15 },
    { area: 'الفسطاط', cost: 15 },
    { area: 'دار السلام', cost: 15 },
    { area: 'كورنیش المعادي', cost: 20 },
    { area: 'المقطم', cost: 20 },
    { area: 'الدراسة', cost: 15 },
    { area: 'العتبة', cost: 15 },
    { area: 'الازھر', cost: 15 },
    { area: 'المنیل', cost: 15 },
    { area: 'الروضة', cost: 15 },
    { area: 'الملك الصالح', cost: 10 },
    { area: 'فیصل', cost: 10 },
    { area: 'الھرم', cost: 10 },
    { area: 'صفت', cost: 15 },
    { area: 'العمرانیة', cost: 15 },
    { area: 'الجیزة', cost: 15 },
    { area: 'المنیب', cost: 15 },
    { area: 'الدقي', cost: 20 },
    { area: 'المھندسین', cost: 20 },
    { area: 'بین السرایات', cost: 20 },
    { area: 'بولاق', cost: 20 },
    { area: 'حدائق الاھرام بوابة 1', cost: 8 },
    { area: 'حدائق الاھرام بوابة 2', cost: 8 },
    { area: 'حدائق الاھرام بوابة 3', cost: 10 },
    { area: 'حدائق الاھرام بوابة 4', cost: 10 },
    { area: 'مساكن الظباط', cost: 10 },
    { area: 'الاستثماري', cost: 10 },
    { area: 'الفردوس', cost: 25 },
    { area: 'حي الاشجار', cost: 25 },
    { area: 'دریم', cost: 25 },
    { area: 'الحي المتمیز', cost: 40 },
    { area: 'حدائق أكتوبر', cost: 40 },
    { area: 'أبو رواش', cost: 40 },
    { area: 'نیو جیزة', cost: 40 },
    { area: 'الخمائل', cost: 40 },
  ];
  Subscription: Subscription;
  cartItems;
  cartTotal;
  delivery = 0;
  isCardInput = true;
  orderForm: FormGroup;

  notifications = [];
  obj = {};

  constructor(
    private CartService: CartService,
    public alertController: AlertController,
    private Router: Router,
    private translate: TranslateService,
    // private localNotifications: LocalNotifications
  ) {
    console.log('=================================> CheckoutPage <==========================================')

  }

  ngOnInit() {

    this.translate.use('en');

    this.cartItems = this.CartService.getCartItems()

    this.cartTotal = this.CartService.getTotal()
    this.Subscription = this.CartService.getTotalUpdatedListener()
      .subscribe(total => {
        this.cartTotal = total;
      });
    this.orderForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      area: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      floorNo: new FormControl(null, Validators.required),
      streetNo: new FormControl(null, Validators.required),
      buildingNo: new FormControl(null, Validators.required),
      apartmentNo: new FormControl(null, Validators.required),
    });
  }

  radioChangeState(e) {
    this.isCardInput = e.detail.value == "deliveryCash" ? false : true;
  }

  selectArea(e) {
    const regionFound = this.regions.find(a => a.area == e.detail.value);
    this.delivery = regionFound.cost
  }

  onSubmitOrder() {
    document.getElementById('submitOrderButton').click();
  }

  onSendOrder() {
    if (this.orderForm.invalid) {
      return;
    }

    if (this.cartItems.lenght == 0) {
      return;
    } else {
      const orderData = {
        shopId: shopId,
        cartItems: this.cartItems,
        SubTotal: this.cartTotal,
        delivery: this.delivery,
        total: this.delivery + this.cartTotal,
        payInfo: "on delivery",
        name: this.orderForm.value.name,
        area: this.orderForm.value.area,
        phone: this.orderForm.value.phone,
        floorNo: this.orderForm.value.floorNo,
        streetNo: this.orderForm.value.streetNo,
        buildingNo: this.orderForm.value.buildingNo,
        apartmentNo: this.orderForm.value.apartmentNo,
      }
      this.CartService.sendOrder(orderData)
        .subscribe(
          isSendOrder => {
            
            openSocket('https://radiant-peak-40358.herokuapp.com')
            this.notifications = JSON.parse(localStorage.getItem('noti'));

            console.log('this.notifications =>', this.notifications)
            if (this.notifications == null) {
              this.notifications = [];              
            }
            this.notifications.push(isSendOrder.orderCode);

            localStorage.setItem('noti', JSON.stringify( this.notifications));
            console.log("1 JSON.parse(localStorage.getItem('noti')) =>", JSON.parse(localStorage.getItem('noti')))
            
            // this.notifications = JSON.parse(localStorage.getItem('noti'));
            // console.log("2 JSON.parse(localStorage.getItem('noti')) =>", JSON.parse(localStorage.getItem('noti')))
            
            this.alertController.create({
              message: `<span class="material-icons"> done_all </span>`,
              subHeader: ' order has been sent ',
              buttons: [
                {
                  text: 'Ok',
                  cssClass: 'secondary',
                  handler: () => {
                    this.CartService.cartItems = [];
                    this.CartService.clearCart();
                    this.CartService.cartUpdated.next([]);
                    
                    this.Router.navigate(['/']);

                    // Schedule a single notification
                    // this.localNotifications.schedule({
                    //   id: 1,
                    //   text: 'Single ILocalNotification' + isSendOrder.orderCode,
                    //   // sound: isAndroid ? 'file://sound.mp3' : 'file://beep.caf',
                    //   // data: { secret: key }
                    // });
                  }
                }
              ]
            }).then(order => {
              order.present();
            })
          },
          err => {
            console.log('isSendOrder err =>', err)
          }
        );
    }
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }


}
