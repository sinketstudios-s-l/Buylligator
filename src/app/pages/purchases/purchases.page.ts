import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user.service';
import { ToastController, AlertController } from '@ionic/angular';
import { PaymentService } from 'src/app/services/payment.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

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
  desc

  db
  task
  VerfProdTlt
  VerfProdDesc

  scannedCode = null;
  constructor(

    private afs: AngularFirestore,
    private userSvc: UserService,
    private toastCtrl: ToastController,
    private paySvc: PaymentService,
    private barcodeScanner: BarcodeScanner,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {

    this.mainprod = this.afs.collection(`products`)
    this.subprod = this.mainprod.valueChanges().subscribe(ev => {
      this.products = ev
    })

    this.main = this.afs.doc(`users/${this.userSvc.getUID()}`)
    this.sub = this.main.valueChanges().subscribe(res => {

      this.purchases = res.purchases

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

  makePayment(event) {

    this.prodID = event.target.id

    this.mainprod = this.afs.doc(`products/${this.prodID}`)
    this.subprod = this.mainprod.valueChanges().subscribe(res => {

      this.desc = res.desc
      this.amount = res.PA

    })

    this.amount = String(this.amount)
    console.log(this.amount)
    console.log(this.desc)

    // let number = '4242424242424242'
    // let expMonth:number = 12
    // let expYear:number = 23
    // let cvc = '123'

    // this.paySvc.payment(number, expMonth, expYear, cvc)




    this.paySvc.paypalPay(this.amount, this.desc, this.prodID)

  }

}