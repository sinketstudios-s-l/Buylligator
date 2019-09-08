import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase'
import { UserService } from 'src/app/services/user.service';
import { snapshotToArray } from 'src/environments/environment';
@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  productID

  username
  mainuser
  subUser

  mainprod
  sub

  productImg: any[]
  PI: number
  PA: number
  PE
  date: Date
  desc
  express: boolean
  expressImg
  title

  userID

  precioPuja: number

  sliderOpts = {
    initialSlide: 1,
    slidesPerView: 1,
    slidesPerColumn: 1,
  }


  constructor(
    private actvRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private userSvc: UserService
  ) { }

  ngOnInit() {

    this.productID = this.actvRoute.snapshot.paramMap.get('id')

    if (this.actvRoute.snapshot.paramMap.get('id') != null) {
      this.mainprod = this.afs.doc(`products/${this.productID}`)
      this.sub = this.mainprod.valueChanges().subscribe(ev => {

        this.PI = ev.PI
        this.PA = ev.PA
        this.desc = ev.desc
        this.express = ev.express
        this.expressImg = ev.expressImg
        this.userID = ev.userID
        this.date = ev.date
        this.title = ev.title

        this.productImg = ev.img

      })

      let uid = localStorage.getItem('uid')

      this.mainuser = this.afs.doc(`users/${uid}`)
      this.subUser = this.mainuser.valueChanges().subscribe(ev => {

        this.username = ev.username

      })
    }

  }


  pujar() {

    const RTB_DB = firebase.database().ref(`products/${this.productID}`)

    this.PA = this.PA + this.precioPuja
    /*
        RTB_DB.set( snapshotToArray([{
          username: this.username,
          price: (this.PA + this.precioPuja),
          date: new Date()
    
        }])).then(() => {this.precioPuja = ""})
    */

    this.afs.doc(`products/${this.productID}`).update({
      PA: this.PA
    }).then(() => { this.precioPuja = 0.00 })

  }

}
