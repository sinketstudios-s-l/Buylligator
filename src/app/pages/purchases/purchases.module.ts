import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PurchasesPage } from './purchases.page';
import { PayPal } from '@ionic-native/paypal/ngx';

const routes: Routes = [
  {
    path: '',
    component: PurchasesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    PayPal
  ],
  declarations: [PurchasesPage]
})
export class PurchasesPageModule {}
