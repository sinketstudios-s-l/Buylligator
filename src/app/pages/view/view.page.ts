import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase'
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';

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
  productTitle
  open: boolean

  userID
  prodUs
  prodSub
  userProfName
  userPropImg

  precioPuja: number

  bidders: any[]
  biddersLenght: number;
  biddersLenghtShow: number;

  sliderOpts = {
    initialSlide: 1,
    slidesPerView: 1,
    slidesPerColumn: 1,
  }

  savemain
  savesub
  saves: any[]
  favs:boolean = false

  constructor(
    private actvRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private userSvc: UserService,
    private alertCtrl: AlertController,
    private route: Router
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
        this.productTitle = ev.title
        this.open = ev.open

        this.productImg = ev.img

        this.bidders = ev.bidders
        if (this.bidders) {
          this.biddersLenght = this.bidders.length
          this.biddersLenghtShow = this.biddersLenght - 2
        }

        this.prodUs = this.afs.doc(`users/${this.userID}`)
        this.prodSub = this.prodUs.valueChanges().subscribe(ev => {
          this.userProfName = ev.username
          this.userPropImg = ev.profilePic
        })

      })

      this.userSvc.isAuthenticated().then(() => {
        this.mainuser = this.afs.doc(`users/${this.userSvc.getUID()}`)
        this.subUser = this.mainuser.valueChanges().subscribe(ev => {
          this.username = ev.username
          this.saves = ev.favorites
        })
      })

    }

  }

  saveFav() {

    

    this.afs.doc(`users/${this.userSvc.getUID()}`).update({
      favorites: firebase.firestore.FieldValue.arrayUnion(
        {
          productID: this.productID,
          date: new Date()  
        }
      )
    }).then( () => this.favs = true)

  }

  delFav(){
    
  }

  profile() {
    this.route.navigate(['/profile/' + this.userID])
  }

  async pujaAlert() {

    const puja = await this.alertCtrl.create({
      header: "Precio Actual: " + this.PA + "€",
      mode: "ios",
      inputs: [
        {
          name: 'cant',
          placeholder: 'Ej. 10€',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "destructive"
        },
        {
          text: "Pujar",
          handler: data => {
            const cant = Number(data.cant)
            this.pujar(cant)
          }
        }
      ]
    })
    await puja.present()
  }


  pujar(precioPuja: number) {

    this.PA = precioPuja + this.PA

    this.afs.doc(`products/${this.productID}`).update({
      PA: this.PA,
      bidders: firebase.firestore.FieldValue.arrayUnion(
        {
          userID: this.userSvc.getUID(),
          username: this.username,
          price: precioPuja,
          date: new Date()
        }
      )
    }).then(() => { this.precioPuja = 0.00 })

  }

}
