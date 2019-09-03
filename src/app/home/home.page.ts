import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { snapshotToArray } from 'src/environments/environment';
import { ModalController, MenuController } from '@ionic/angular';
import { UploadPage } from '../pages/upload/upload.page';
import { LoginPage } from '../pages/login/login.page';


interface product {
  img: string,
  price: string,
  desc: string,
  express: boolean 
  expressImg: string
}

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

  constructor(private afs: AngularFirestore, private modalCtrl: ModalController, private menuCtrl: MenuController) {

    afs.collection('products').valueChanges().pipe()
    .subscribe( event => {

      this.products = event
      
    })

    this.userRef.on('value', res => {
      this.items = snapshotToArray(res)
    })
  }

  ngOnInit(){

    if(localStorage.getItem('times') != '1'){
      this.openLoginModal()
      localStorage.setItem('times', '1')
    } 
    
  }

  async openLoginModal() {

      const modal = await this.modalCtrl.create({
          component: LoginPage
      })
      return await modal.present()
    }
  

  openMenu(){
    if(this.menuCtrl.getOpen){
      this.menuCtrl.close()
    }
    this.menuCtrl.enable(true, 'main')
    this.menuCtrl.open('main')
  }

  upload(){

    const ref = Math.random().toString(16) + Math.random().toString(16).toUpperCase()

    this.afs.collection('products').doc(ref).set({
      img: "https://www.akamai.com/es/es/multimedia/images/intro/image-manager-intro.png?imwidth=1366",
      price: "12124",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae fugit quibusdam tempora praesentium quo. Et ipsum ad ullam ut! Modi voluptatem commodi odit sapiente, cum officiis fugiat totam tempora id?",
      express: false,
      expressImg: "../../../assets/flash.png"
      
    })


    this.userRef.push().set({
      img: "https://www.akamai.com/es/es/multimedia/images/intro/image-manager-intro.png?imwidth=1366",
      price: "12124",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae fugit quibusdam tempora praesentium quo. Et ipsum ad ullam ut! Modi voluptatem commodi odit sapiente, cum officiis fugiat totam tempora id?",
      express: false,
      expressImg: "../../../assets/flash.png"
    })

  }

  async openModal(){
    const modal = await this.modalCtrl.create({
        component: UploadPage
    })
    return await modal.present()
  }

  delItem(key){
    firebase.database().ref('users/'+key).remove();
  }


}
