import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppinPage } from './shoppin.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppinPageRoutingModule {}
