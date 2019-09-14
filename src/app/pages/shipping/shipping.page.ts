import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { ShippingModalPage } from '../shipping-modal/shipping-modal.page';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.page.html',
  styleUrls: ['./shipping.page.scss'],
})
export class ShippingPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {

  }

  async modal(event){
    const id = event.target.id

    const modal = await this.modalCtrl.create({
      component: ShippingModalPage,
      componentProps: {
        id: id
      }
    })

    await modal.present()

  }

}
