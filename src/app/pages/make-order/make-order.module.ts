import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakeOrderPageRoutingModule } from './make-order-routing.module';

import { MakeOrderPage } from './make-order.page';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MakeOrderPageRoutingModule,
    TranslateModule,
    TranslateModule.forChild(),
  ],
  declarations: [MakeOrderPage]
})
export class MakeOrderPageModule {}
