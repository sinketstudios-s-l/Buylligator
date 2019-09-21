import { Component, OnInit } from '@angular/core';

import { ModalController, AlertController } from '@ionic/angular';
import { ShippingModalPage } from '../shipping-modal/shipping-modal.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { QrCodesPage } from '../qr-codes/qr-codes.page';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.page.html',
  styleUrls: ['./shipping.page.scss'],
})
export class ShippingPage implements OnInit {

  qrData = null
  qrMain
  qrSub
  buyerID
  ownID
  prodID
  constructor(
    private modalCtrl: ModalController,
    private afs: AngularFirestore,
    private userSvc: UserService,
    private Barcode: BarcodeScanner,
    private alertCtrl: AlertController) { }

  ngOnInit() {
      this.ownID = this.userSvc.getUID()

      console.log('UID: '+ this.ownID)
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

  async qrModal(){
    const modal = await this.modalCtrl.create({
      component: QrCodesPage,
    })
    await modal.present()
  }

  async presentAlert(header: string, message: string){

    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      mode: "ios",
      buttons: ['Cerrar']
    })
    await alert.present()
  }


  barCode(){
    this.Barcode.scan().then( d => {
      this.qrData = d.text
      
      this.qrMain = this.afs.doc(`QrCodes/${this.qrData}`)
      this.qrSub = this.qrMain.valueChanges().subscribe(ev => {
  
        this.buyerID = ev.buyerID
        this.prodID = ev.productID
        this.buyerID = this.buyerID.toString()
        console.log(this.buyerID)
      })

      if(this.buyerID == this.ownID){
        this.afs.doc(`products/${this.prodID}`).update({
          status: "delivered",
          verificated: false
        })
        this.presentAlert('¡Listo!','Hemos verificado el producto correctamente.')
      } else {
        this.presentAlert('¡Oops!','El Código no es correcto o el producto no te pertenece. Intentalo de nuevo con un código válido de un producto de tu lista de compras.')
      }
      // console.log(d.text)
    })


  }

}
