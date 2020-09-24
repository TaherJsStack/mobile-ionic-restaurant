import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TableBookPageRoutingModule } from './table-book-routing.module';

import { TableBookPage } from './table-book.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TableBookPageRoutingModule,
    TranslateModule,
    TranslateModule.forChild(),
  ],
  declarations: [TableBookPage]
})
export class TableBookPageModule {}
