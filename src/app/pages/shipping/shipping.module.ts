import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShippingPage } from './shipping.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

const routes: Routes = [
  {
    path: '',
    component: ShippingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxQRCodeModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    BarcodeScanner
  ],
  declarations: [ShippingPage]
})
export class ShippingPageModule {}
