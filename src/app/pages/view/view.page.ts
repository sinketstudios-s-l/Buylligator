import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase'
import { UserService } from 'src/app/services/user.service';
import { AlertController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  productID
  ownID
  username
  mainuser
  subUser
  familyName
  profilePic

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
  accType
  sales = 0
  purch = 0
  currSymbol
  precioPuja: number
  category
  lastBidder
  lastBidderID
  lastBidderName
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
  favs: boolean = false

  shippingCost
  timeLeft
  timeLeftCount

  constructor(
    private actvRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private userSvc: UserService,
    private alertCtrl: AlertController,
    private route: Router,
    private actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() {

    this.productID = this.actvRoute.snapshot.paramMap.get('id')

    if (this.actvRoute.snapshot.paramMap.get('id') != null) {
      this.mainprod = this.afs.doc(`products/${this.productID}`)
      this.sub = this.mainprod.valueChanges().subscribe(ev => {

        this.PI = ev.PI.toString().replace("\.", ",")
        this.PA = ev.PA.toString().replace("\.", ",")
        this.desc = ev.desc
        this.express = ev.express
        this.expressImg = ev.expressImg
        this.userID = ev.userID
        this.date = ev.date
        this.productTitle = ev.title
        this.open = ev.open
        this.currSymbol = ev.currSymbol
        this.shippingCost = ev.shippingCost
        this.productImg = ev.img
        this.category = ev.category
        this.timeLeft = ev.timeLeft
        this.bidders = ev.bidders
        if (this.bidders) {
          this.lastBidder = this.bidders.length - 1
          this.lastBidderName = this.bidders[this.lastBidder].username
          this.lastBidderID = this.bidders[this.lastBidder].userID
          this.biddersLenght = this.bidders.length
          this.biddersLenghtShow = this.biddersLenght - 2
        }

        let countDownDate = new Date(this.timeLeft.toDate()).getTime()

        if(countDownDate > new Date().getTime()){
          let x = setInterval(function () {
            
            let bidders = this.bidders

            let now = new Date().getTime()
            let distance = countDownDate - now
  
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
           document.getElementById("timeLeft").innerHTML = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s " 
         
            if (distance < 0) {
              clearInterval(x);
              document.getElementById("timeLeft").innerHTML = "FINALIZADA";
            }   
          }, 1000)
        
        } else {
          this.closeSub()
        }
       
         
        

        this.prodUs = this.afs.doc(`users/${this.userID}`)
        this.prodSub = this.prodUs.valueChanges().subscribe(ev => {
          this.userProfName = ev.username
          this.userPropImg = ev.profilePic
          this.accType = ev.accType
          this.sales = ev.sales.length
          this.purch = ev.purchases.length
          this.familyName = ev.familyName
        })

      })

      this.userSvc.isAuthenticated().then(() => {
        this.ownID = this.userSvc.getUID()
        this.mainuser = this.afs.doc(`users/${this.ownID}`)
        this.subUser = this.mainuser.valueChanges().subscribe(ev => {
          this.username = ev.username
          this.saves = ev.favorites
          this.familyName = ev.familyName
          this.profilePic = ev.profilePic
        })
      })

    }

  }


  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      mode: "ios",
      buttons: [
        {
          text: "Eliminar de todos modos",
          role: "destructive",
          handler: () => {
            this.afs.doc(`products/${this.productID}`).delete().then(() => this.route.navigate(['/login']))
          }
        },
        {
          text: "Cancelar",
          role: "cancel"
        }
      ]
    })
    await alert.present()
  }

  async moreProd() {

    const actionSheet = await this.actionSheetCtrl.create({
      header: this.productTitle,
      mode: "ios",
      buttons: [
        {
          text: "Editar",
          handler: () => {

          }
        },
        {
          text: "Eliminar",
          role: "destructive",
          handler: () => {
            if (!this.bidders) {
              this.afs.doc(`products/${this.productID}`).delete().then(() => {
                this.route.navigate(['/home'])
              })
            } else {
              this.presentAlert('¡Cuidado!', 'Hay clientes pujando por este producto, ¿Quieres eliminarlo igualmente?')
            }
          }
        },
        {
          text: "Cerrar",
          role: "cancel"
        }
      ]
    })
    await actionSheet.present()
  }

  saveFav() {



    this.afs.doc(`users/${this.userSvc.getUID()}`).update({
      favorites: firebase.firestore.FieldValue.arrayUnion(
        {
          productID: this.productID,
          date: new Date()
        }
      )
    }).then(() => this.favs = true)

  }

  delFav() {

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
    if(!this.username){
      this.route.navigate(['/login'])
    } else {
      await puja.present()
    }
  }


  pujar(precioPuja: number) {


    this.PA = Number(precioPuja) + Number(this.PA)

    this.afs.doc(`products/${this.productID}`).update({
      PA: this.PA,
      bidders: firebase.firestore.FieldValue.arrayUnion(
        {
          userID: this.userSvc.getUID(),
          username: this.username,
          price: precioPuja,
          date: new Date(),
          familyName: this.familyName,
          profilePic: this.profilePic
        }
      )
    }).then(() => { this.precioPuja = 0.00 })

  }

  closeSub() {

    this.afs.doc(`products/${this.productID}`).update({
      open: false,
      status: "waiting"
    }).then(() => {

      this.afs.doc(`users/${this.lastBidderID}`).update({
        purchases: firebase.firestore.FieldValue.arrayUnion(
          {
            productID: this.productID,
            date: new Date(),
            price: this.PA,
            clientID: this.lastBidderID,
            clientName: this.lastBidderName,
            desc: this.desc,
            title: this.productTitle,
            img: this.productImg
          }
        )
      }).then(() => {
        this.afs.doc(`users/${this.userSvc.getUID()}`).update({
          sales: firebase.firestore.FieldValue.arrayUnion(
            {
              productID: this.productID,
              date: new Date(),
              price: this.PA,
              clientID: this.lastBidderID,
              clientName: this.lastBidderName,
              desc: this.desc,
              title: this.productTitle,
              img: this.productImg
            }
          )
        })
      })
    })
  }
}
