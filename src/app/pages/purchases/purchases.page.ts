import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user.service';
import { ToastController, AlertController, ModalController } from '@ionic/angular';
import { PaymentService } from 'src/app/services/payment.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { SettingsPage } from '../settings/settings.page';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.page.html',
  styleUrls: ['./purchases.page.scss'],
})
export class PurchasesPage implements OnInit {
  productID
  prodID
  main
  sub
  purchases: any[]

  status

  mainprod
  subprod
  products: any[]

  colorToast
  msgToast

  qrData

  amount
  currency
  desc

  db
  task
  VerfProdTlt
  VerfProdDesc

  scannedCode = null;

  mainuser
  subuser
  mainLocations

  shippingCost
  pay = 0
  constructor(

    private afs: AngularFirestore,
    private userSvc: UserService,
    private toastCtrl: ToastController,
    private paySvc: PaymentService,
    private barcodeScanner: BarcodeScanner,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {

    this.mainprod = this.afs.collection(`products`)
    this.subprod = this.mainprod.valueChanges().subscribe(ev => {
      console.log(ev)
      this.products = ev
    })

    this.main = this.afs.doc(`users/${this.userSvc.getUID()}`)
    this.sub = this.main.valueChanges().subscribe(res => {

      this.purchases = res.purchases
      this.mainLocations = res.locations

      console.log(this.mainLocations)

    })

  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({

      header: header,
      message: message,
      buttons: ['Aceptar']
    })
    await alert.present()
  }

  async noAddress(header: string, message: string) {
    const alert = await this.alertCtrl.create({

      header: header,
      message: message,
      buttons: [
        {
          text: "Añadir Dirección",
          handler: () => {
            this.editProf()
          }
        }
      ]
    })
    await alert.present()
  }

  async editProf() {
    const modal = await this.modalCtrl.create({
      component: SettingsPage,
      componentProps: {
        id: "address"
      }
    })
    await modal.present()
  }

  async statusInfo(status: string) {

    console.log(status)

    if (status === "waiting") {
      this.colorToast = "warning"
      this.msgToast = "El producto se encuentra en proceso de pago"
    } else if (status === "paidout") {
      this.colorToast = "success"
      this.msgToast = "El producto ha sido pagado"
    } else if (status === "cancelled") {
      this.colorToast = "danger"
      this.msgToast = "El producto ha sido cancelado"
    } else if (status === "delivered") {
      this.colorToast = "primary"
      this.msgToast = "El producto ha sido entregado correctamente"
    }

    const toast = await this.toastCtrl.create({
      message: this.msgToast,
      color: this.colorToast,
      duration: 2000
    });
    if (status) {
      await toast.present();
    }
  }

  qrScann(event) {

    const prodID = event.target.id

    this.barcodeScanner.scan().then(barcodeData => {

      this.scannedCode = barcodeData.text

      if (prodID == this.scannedCode) {

        this.afs.doc(`products/${prodID}`).update({
          status: "delivered"
        }).then(() => {
          this.presentAlert('Correcto!', 'La entrega ha sido verificada')
        })

      } else {
        console.log('el producto NO coincide')
      }

    })

  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  cancelPay(){
    this.pay = 0
  }

  select(e) {
    this.prodID = e.target.value

    this.mainprod = this.afs.doc(`products/${this.prodID}`)
    this.subprod = this.mainprod.valueChanges().subscribe(prod => {

      this.amount = prod.PA
      this.shippingCost = prod.shippingCost
      this.desc = prod.title
      this.currency = prod.currency

      this.amount = Number(this.amount) + Number(this.shippingCost)
      this.amount = Number(this.amount).toFixed(2)
      
      console.log(this.desc)
      console.log(this.amount)
    })

  }

  paymentBtn() {
    this.pay = 1
  }

  makePayment() {

    if (this.prodID != "" && this.mainLocations != "") {


      this.amount = String(this.amount)
      this.paySvc.paypalPay(this.amount, this.desc, 'EUR', this.prodID)

    } else if( this.mainLocations == "" ){

      this.noAddress('Error!', 'No existe ninguna dirección de entrega, añade la dirección y vuelve a intentarlo. INFO: Tanto el vendedor como el resto de usuarios, no tendrán accesso a dicha información.')
 
     }

  }

}