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
  locations: any[]
  products: any[]
  add:number = 0
  constructor(
    private navParams: NavParams, 
    private modalCtrl: ModalController,
    private afs: AngularFirestore,
    private userSvc: UserService) { }

  ngOnInit() {

    this.ownID = this.userSvc.getUID()

    this.id = this.navParams.get('id')
    console.log(this.id)

    if(this.id == "locations"){
      this.main = this.afs.doc(`users/${this.ownID}`)
      this.sub = this.main.valueChanges().subscribe(ev => {

        console.log(ev)

        this.locations = ev.locations

      })
    } else if(this.id == "pickUp"){
      this.main = this.afs.collection('products')
      this.sub = this.main.valueChanges().subscribe(ev => {

        console.log(ev)

        this.products = ev

      })
    }

  }

  newLoc(){
    this.add = 1
  }

  select(event){
    console.log(event.target.value)
  }

  addLocation(){

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

  close() {
    this.modalCtrl.dismiss()
  }

}
