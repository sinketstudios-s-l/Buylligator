import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user.service';
import * as firebase from 'firebase';
import { QrCodesPage } from '../qr-codes/qr-codes.page';

@Component({
  selector: 'app-shipping-modal',
  templateUrl: './shipping-modal.page.html',
  styleUrls: ['./shipping-modal.page.scss'],
})
export class ShippingModalPage implements OnInit {
  id
  street
  street2
  strtNum
  postCode
  city
  province
  name

  ownID
  mainLoc
  subLoc
  main
  sub
  mainWD
  subWD
  locations: any[]
  products: any[]
  withdrawAcc: any[]

  withdrawAccRef
  add: number = 0

  block
  floorDoor
  icon

  funds = 0
  bankAcc
  paypalAcc
  mainAcc
  subAcc
  fundsLimit
  wdValue = 0.00
  fundsAfter
  prodID

  mainFunds
  subFunds

  qrCodeRef
  mainQr
  subQr
  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private afs: AngularFirestore,
    private userSvc: UserService) { }

  ngOnInit() {

    this.ownID = this.userSvc.getUID()

    this.id = this.navParams.get('id')
    // console.log(this.id)

    if (this.id == "locations") {
      this.main = this.afs.doc(`users/${this.ownID}`)
      this.sub = this.main.valueChanges().subscribe(ev => {

        // console.log(ev)

        this.locations = ev.locations

      })

    } else if (this.id == "pickUp") {
      this.main = this.afs.collection('products')
      this.sub = this.main.valueChanges().subscribe(ev => {

        // console.log(ev)

        this.products = ev

      })
      this.mainLoc = this.afs.doc(`users/${this.ownID}`)
      this.subLoc = this.mainLoc.valueChanges().subscribe(ev => {

        //console.log(ev)

        this.locations = ev.locations

      })


    } else if (this.id == "funds") {
      this.main = this.afs.doc(`users/${this.ownID}`)
      this.sub = this.main.valueChanges().subscribe(ev => {
        this.withdrawAccRef = ev.withdrawAccRef
      })

      this.mainFunds = this.afs.doc(`wallet/${this.withdrawAccRef}`)
      this.subFunds = this.mainFunds.valueChanges().subscribe(ev => {

        this.funds = ev.funds


      })


    } else if (this.id == "withdraw") {
      this.main = this.afs.doc(`users/${this.ownID}`)
      this.sub = this.main.valueChanges().subscribe(ev => {

        this.withdrawAccRef = ev.withdrawAccRef

      })

      this.mainFunds = this.afs.doc(`wallet/${this.withdrawAccRef}`)
      this.subFunds = this.mainFunds.valueChanges().subscribe(ev => {

        this.funds = ev.funds
        this.fundsLimit = Number(this.funds) + 0.01



        this.fundsAfter = this.funds
      })
    }

  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }



  newLoc() {
    this.add = 1
  }

  select(event) {

    this.prodID = event.target.value

  }

  addLocation() {

    this.street2 = "Bloque: " + this.block + ', ' + this.floorDoor

    this.afs.doc(`users/${this.userSvc.getUID()}`).update({
      locations: firebase.firestore.FieldValue.arrayUnion({
        city: this.city,
        street: this.street,
        street2: this.street2,
        strtNum: this.strtNum,
        province: this.province,
        postCode: this.postCode,
        name: this.name,
        default: true
      })
    }).then(() => this.add = 0)

  }

  addWdAcc() {

    this.afs.doc(`paymentAcc/${this.withdrawAccRef}`).update({
      withdrawAcc: firebase.firestore.FieldValue.arrayUnion({
        accType: "paypal",
        accPropName: "Daniel Puig",
        accEmail: "sinketstudios@gmail.com",
        accIBAN: "",
        accBankName: ""
      })
    })

  }


  pickUpReq() {

    this.mainQr = this.afs.doc(`products/${this.prodID}`)
    this.subQr = this.mainQr.valueChanges().subscribe(ev => {

      this.qrCodeRef = ev.qrCodeRef
    })

    const ref = Math.random().toString(36).substring(2, 16) + Math.random().toString(36).substring(2, 16).toUpperCase()

    this.afs.doc(`pickUpReq/${ref}`).set({
      productID: this.prodID,
      userID: this.userSvc.getUID(),
      userAddress: this.locations[0]
    }).then(() => {
      this.afs.doc(`QrCodes/${this.qrCodeRef}`).update({
        sellerID: this.userSvc.getUID(),
        sellerLoc: this.locations[0],
        productID: this.prodID
      })
      this.afs.doc(`products/${this.prodID}`).update({
        status: "request"
      }).then(() => {
        this.modalCtrl.dismiss().then(() => {
          this.qrCodes(this.qrCodeRef)
        })
      })
    })
  }

  async qrCodes(prodID) {
    const modal = await this.modalCtrl.create({
      component: QrCodesPage,
      componentProps: {
        id: prodID
      }
    })
    await modal.present()

  }

  withdrawFunds() {
  }

  iconL(event) {

    console.log(event.target.value)

  }

  quantity(ev) {
    this.wdValue = ev.target.value

    this.fundsAfter = Number(this.funds) - this.wdValue
    this.fundsAfter = Number(this.fundsAfter).toFixed(2)
  }

  delLoc() {

    this.afs.doc(`users/${this.userSvc.getUID()}`).update({
      locations: null
    })

  }

  close() {
    this.modalCtrl.dismiss()
  }

}
