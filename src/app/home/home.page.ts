import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { snapshotToArray } from 'src/environments/environment';
import { ModalController, MenuController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

// SERVICES
import { UserService } from '../services/user.service';

// MODALS
import { UploadPage } from '../pages/upload/upload.page';
import { LoginModalPage } from '../pages/login-modal/login-modal.page';





@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  example

  products: any[]

  items = []
  userRef = firebase.database().ref('products/')

  prodDesc

  username
  mainuser
  sub

  searchterm

  slideOpts = {
    loop: false,
    initialSlide: 0,
    speed: 300,
    slidesPerView: 4.5,
    spaceBetween: 50,
    centeredSlides: false
  }

  categories = [
    {
      name: "Coches",
      icon: "car",
      id: "cars",
      mode: "ios"
    },
    {
      name: "Coches",
      icon: "car",
      id: "2",
      mode: "ios"
    },
    {
      name: "Coches",
      icon: "car",
      id: "3",
      mode: "ios"
    },
    {
      name: "Coches",
      icon: "car",
      id: "4",
      mode: "ios"
    },
    {
      name: "Coches",
      icon: "car",
      id: "5",
      mode: "ios"
    },
    {
      name: "Coches",
      icon: "car",
      id: "6",
      mode: "ios"
    },
    {
      name: "Coches",
      icon: "car",
      id: "7",
      mode: "ios"
    },
    {
      name: "Coches",
      icon: "car",
      id: "8",
      mode: "ios"
    },
  ]

  constructor(
    private afs: AngularFirestore,
    private modalCtrl: ModalController,
    private menuCtrl: MenuController,
    private userSvc: UserService,
    private router: Router,
    private alertCtrl: AlertController) {

    afs.collection('products').valueChanges().pipe()
      .subscribe(event => {

        this.products = event

      })

    this.userRef.on('value', res => {
      this.items = snapshotToArray(res)
    })
  }

  ngOnInit() {

    this.mainuser = this.afs.doc(`users/${this.userSvc.getUID()}`)
    this.sub = this.mainuser.valueChanges().subscribe(event => {
      this.username = event.username
      
    })

  }

  async openLoginModal() {

    const modal = await this.modalCtrl.create({
      component: LoginModalPage
    })
    return await modal.present()
  }


  openMenu() {
    if (this.menuCtrl.getOpen) {
      this.menuCtrl.close()
    }
    this.menuCtrl.enable(true, 'main')
    this.menuCtrl.open('main')
  }

  async openModal() {
    const ref = Math.random().toString(36).substring(2, 16) + Math.random().toString(36).substring(2, 16).toUpperCase()
    const modal = await this.modalCtrl.create({
      component: UploadPage,
      componentProps: {
        id: ref,
        username: this.username
      }
    })
    return await modal.present()
  }

  async pujaAlert(id: string) {
    let productID = id
    const puja = await this.alertCtrl.create({
      header: id,
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
          role: "cancel"
        },
        {
          text: "Pujar",
          handler: data => {
            console.log(data.cant)
          }
        }
      ]
    })
    if (productID != "") {
      await puja.present()
    }
  }

  pujar(event) {
    if (!this.username) {
      this.router.navigate(['/login'])
    } else {
      this.pujaAlert(event.target.id)
    }
  }

  view(event) {
    let id = event.target.id

    this.router.navigate(['/view/' + id])

    console.log(id)

  }

  delItem(key) {
    firebase.database().ref('users/' + key).remove();
  }



  category(event) {
    console.log(event.target.id)
  }


}


