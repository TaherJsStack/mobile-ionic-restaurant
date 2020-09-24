import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckOrderStatusPage } from './check-order-status.page';

const routes: Routes = [
  {
    path: '',
    component: CheckOrderStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckOrderStatusPageRoutingModule {}
