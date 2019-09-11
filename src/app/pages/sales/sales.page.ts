import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {
  productID
  prodID
  main
  sub
  sales: any[]

  status

  mainprod
  subprod
  products: any[]

  colorToast
  msgToast

  qrData
  constructor(

    private afs: AngularFirestore,
    private userSvc: UserService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {

    this.mainprod = this.afs.collection(`products`)
    this.subprod = this.mainprod.valueChanges().subscribe(ev => {

      this.products = ev


    })

    this.main = this.afs.doc(`users/${this.userSvc.getUID()}`)
    this.sub = this.main.valueChanges().subscribe(res => {

      this.sales = res.sales

    })

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

  qrCode(event) {
    console.log(event.target.id)

    this.qrData = event.target.id

  }

  closeQR() {
    this.qrData = ""
  }

  downloadQR() {

  }

  go(event) {

    this.prodID = this.sales.find(id => id.productID === event.target.id)

    this.productID = this.prodID.productID

    // this.mainprod = this.afs.doc(`products/${this.productID}`)
    // this.mainprod = this.main.valueChanges().subscribe(res => {

    //   this.status = res.status

    // })

  }

}
