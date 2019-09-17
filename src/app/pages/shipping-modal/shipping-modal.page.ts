import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user.service';
import * as firebase from 'firebase';

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

  funds
  bankAcc
  paypalAcc
  fundsLimit
  wdValue = 0.00
  fundsAfter
  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private afs: AngularFirestore,
    private userSvc: UserService) { }

  ngOnInit() {


    console.log(this.icon)

    this.ownID = this.userSvc.getUID()

    this.id = this.navParams.get('id')
    console.log(this.id)

    if (this.id == "locations") {
      this.main = this.afs.doc(`users/${this.ownID}`)
      this.sub = this.main.valueChanges().subscribe(ev => {

        console.log(ev)

        this.locations = ev.locations

      })

    } else if (this.id == "pickUp") {
      this.main = this.afs.collection('products')
      this.sub = this.main.valueChanges().subscribe(ev => {

        console.log(ev)

        this.products = ev

      })

    } else if (this.id == "funds") {
      this.main = this.afs.doc(`users/${this.ownID}`)
      this.sub = this.main.valueChanges().subscribe(ev => {

        this.funds = ev.funds

        this.funds = this.funds.toString().replace("\.", ",")

      })
    } else if (this.id == "withdraw") {
      this.main = this.afs.doc(`users/${this.ownID}`)
      this.sub = this.main.valueChanges().subscribe(ev => {

        this.withdrawAccRef = ev.withdrawAccRef

        this.funds = ev.funds
        this.fundsLimit = Number(this.funds) + 0.01

        this.funds = this.funds.toString().replace("\.", ",")

        this.fundsAfter = this.funds

        this.main = this.afs.doc(`paymentAcc/${this.withdrawAccRef}`)
        this.sub = this.main.valueChanges().subscribe(ev => {

          this.withdrawAcc = ev.withdrawAcc

        })

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
    console.log(event.target.value)
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

  withdrawFunds() {



  }

  iconL(event) {

    console.log(event.target.value)

  }

  quantity(ev) {
    this.wdValue = ev.target.value

    this.funds = this.funds.toString().replace("\,", ".")

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
