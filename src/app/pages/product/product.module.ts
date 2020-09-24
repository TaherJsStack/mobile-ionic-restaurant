import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {MatInputModule} from '@angular/material/input';

import { ProductPageRoutingModule } from './product-routing.module';
import {MatExpansionModule} from '@angular/material/expansion';

import { TranslateModule } from '@ngx-translate/core';


import { ProductPage } from './product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatInputModule,
    MatExpansionModule,
    ProductPageRoutingModule,
    TranslateModule,
    TranslateModule.forChild(),
  ],
  declarations: [ProductPage]
})
export class ProductPageModule {}
