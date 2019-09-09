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
import { map } from 'rxjs/operators';





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
  category

  mainprod
  subprod
  bidders: any[]
  lastBidder

  PA:number

  slideOpts = {
    loop: false,
    initialSlide: 0,
    speed: 300,
    slidesPerView: 4.5,
    spaceBetween: 5,
    centeredSlides: false
  }

  categories = [
    {
      name: "Todas las Categorias",
      icon: "infinite",
      id: "Todas las Categorias",
      mode: "ios",
      color: "primary"
    },
    {
      name: "Coches",
      icon: "car",
      id: "Coches",
      mode: "ios"
    },
    {
      name: "Motos, Bicicletas & Patinetes",
      icon: "bicycle",
      id: "Motos, Bicicletas & Patinetes",
      mode: "ios"
    },
    {
      name: "Consolas & Videojuegos",
      icon: "logo-game-controller-a",
      id: "Consolas & Videojuegos",
      mode: "ios"
    },
    {
      name: "Coleccionismo & Arte",
      icon: "easel",
      id: "Coleccionismo & Arte",
      mode: "ios"
    },
    {
      name: "Joyas",
      icon: "watch",
      id: "Joyas",
      mode: "md"
    },
    {
      name: "Moda & Accesorios",
      icon: "shirt",
      id: "Moda & Accesorios",
      mode: "md"
    },
    {
      name: "Inmobiliaria",
      icon: "home",
      id: "Inmobiliaria",
      mode: "md"
    },
    {
      name: "Libros & Música",
      icon: "bookmarks",
      id: "Libros & Música",
      mode: "md"
    },
    {
      name: "Viajes",
      icon: "airplane",
      id: "Viajes",
      mode: "ios"
    },
    {
      name: "Electrónica",
      icon: "desktop",
      id: "Electrónica",
      mode: "md"
    },
    {
      name: "Otros",
      icon: "globe",
      id: "Otros",
      mode: "ios"
    },
    {
      name: "+ 18",
      icon: "flame",
      id: "+ 18",
      mode: "md",
      color: "danger"
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
    this.userSvc.isAuthenticated().then(() => {
      this.mainuser = this.afs.doc(`users/${this.userSvc.getUID()}`)
      this.sub = this.mainuser.valueChanges().subscribe(ev => {
        this.username = ev.username
      })
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

  reload() {

  }

  async pujaAlert(id: string) {
    let productID = id
    const puja = await this.alertCtrl.create({
      header: id,
      mode: "ios",
      inputs: [
        {
          name: 'cant',
          type: "number",
          placeholder: 'Ej. 10€'
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
             const cant = Number(data.cant)
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

  closeSub(event) {

    const productID = event.target.id

    this.mainprod = this.afs.doc(`products/${productID}`)
    this.subprod = this.mainprod.valueChanges().subscribe(ev => {

      this.bidders = ev.bidders
      this.lastBidder = this.bidders.length -1

      console.log(this.bidders[this.lastBidder].price)

    })

    this.afs.doc(`products/${productID}`).update({
      open: false
    }).then(() => {
      console.log("Subasta cerrada")
      document.getElementById(productID).style.opacity = ".5";
    })
  }

  view(event) {
    let id = event.target.id

    this.router.navigate(['/view/' + id])

    console.log(id)

  }

  delItem(key) {
    firebase.database().ref('users/' + key).remove();
  }

  delCategory() {
    this.category = ""
  }

  selCategory(event) {
    this.category = event.target.id

    console.log(this.category)
  }


}


