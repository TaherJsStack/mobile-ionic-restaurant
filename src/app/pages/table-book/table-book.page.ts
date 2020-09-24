import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { TablesService } from 'src/app/providers/tables.service';

@Component({
  selector: 'app-table-book',
  templateUrl: './table-book.page.html',
  styleUrls: ['./table-book.page.scss'],
})

export class TableBookPage implements OnInit {

  bookingDate: string;
  bookingTime: string;

  Subscription: Subscription;
  cartTotal;
  delivery = 0;
  bookingForm: FormGroup;

  constructor(
    private TablesService: TablesService,
    private datePicker: DatePicker,
    public alertController: AlertController,
    private Router: Router,
    private translate: TranslateService,
  ) { 
    console.log('=================================> TableBookPage <==========================================')

  }

  ngOnInit() {

    this.translate.use('en');

    this.bookingForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      chairCounts: new FormControl(null, Validators.required),
      bookingNote: new FormControl(null),


    });
  }


  showDatepicker() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      okText: "Save Date",
      todayText: "Set Today"
    }).then(
      date => {
        this.bookingDate = date.getDate() + "/" + date.toLocaleString('default', { month: 'long' }) + "/" + date.getFullYear();
        console.log('this.bookingDate =>', this.bookingDate)
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  showTimepicker() {
    this.datePicker.show({
      date: new Date(),
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT,
      okText: "Save Time",
      // nowText:"Set Now"
    }).then(
      time => {
        this.bookingTime = time.getHours() + ":" + time.getMinutes();
      },
      err => console.log('Error occurred while getting time: ', err)
    );
  }

  onSubmitBook() {
    document.getElementById('submitBook').click();
  }

  onSendOrder() {
    if (this.bookingForm.invalid) {
      return;
    }

    const bookingData = {
      bookingDate: this.bookingDate,
      bookingTime: this.bookingTime,
      name: this.bookingForm.value.name,
      phone: this.bookingForm.value.phone,
      chairCounts: this.bookingForm.value.chairCounts,
      bookingNote: this.bookingForm.value.bookingNote,
    }
    this.TablesService.createingBook(bookingData)
      .subscribe(
        isSendABook => {
          this.alertController.create({
            message: `<span class="material-icons"> done_all </span>`,
            subHeader: ' Book has been sent ',
            // message: 'Book has been sent successfully',
            buttons: [
              {
                text: 'Ok',
                cssClass: 'secondary',
                handler: () => {

                  // this.CartService.clearCart();
                  // this.CartService.cartUpdated.next([]);
                  this.Router.navigate(['/']);
                }
              }
            ]
          }).then(order => {
            order.present();
          })
        },
        err => {
          console.log('isSendBook err =>', err)
        }
      );
  }

  ngOnDestroy() {
    // this.Subscription.unsubscribe();
  }

}
