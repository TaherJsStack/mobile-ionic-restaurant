import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckOrderStatusPageRoutingModule } from './check-order-status-routing.module';
import { MatStepperModule } from '@angular/material/stepper';

import { CheckOrderStatusPage } from './check-order-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatStepperModule,
    CheckOrderStatusPageRoutingModule
  ],
  declarations: [CheckOrderStatusPage]
})
export class CheckOrderStatusPageModule {}
