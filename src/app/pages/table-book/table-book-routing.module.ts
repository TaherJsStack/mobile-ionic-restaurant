import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableBookPage } from './table-book.page';

const routes: Routes = [
  {
    path: '',
    component: TableBookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableBookPageRoutingModule {}
