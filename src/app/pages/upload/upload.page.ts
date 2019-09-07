import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ActionSheetController } from '@ionic/angular';
import { CategoriesPage } from '../categories/categories.page';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {
  category
  main
  sub
  username
  productID = this.navParams.get('id')

  desc
  img = []
  express: boolean
  price: number

  noImg = ""

  constructor(
    private modalCtrl: ModalController, 
    private afs: AngularFirestore, 
    private navParams: NavParams,
    private actionShtCtrl: ActionSheetController) { }
  
  ngOnInit() {
    this.username = this.navParams.get('username')

    if(this.navParams.get('id')){
      this.openCat()
      this.afs.doc(`products/${this.productID}`).set({

        productID: this.productID,
        category: null,
        PA: 0,
        PI: 0,
        desc: null,
        express: false,
        username: this.username,
        img: null,
        verificated: false,
        date: new Date(),

      })


      this.main = this.afs.doc(`products/${this.productID}`)
      this.sub = this.main.valueChanges().subscribe( ev => {
          this.category = ev.category
      })

    }

  }

  closeModal(){
    this.afs.collection('products').doc(this.productID).delete().then( () => {
      this.modalCtrl.dismiss()
    })
  }
  

  upload(){
    this.afs.doc(`products/${this.productID}`).update({
      PI: this.price,
      PA: this.price,
      desc: this.desc,
      express: this.express,
      expressImg: "../../../assets/flash.png",
    })
  }


  async cancelUpl(){

    const actionSheet = await this.actionShtCtrl.create({
      buttons: [
        {
          text: "Seguir editando",
          handler: () => { this.actionShtCtrl.dismiss() }
        },
        {
          role: "destructive",
          text: "Cancelar producto",
          handler: () => {
            this.closeModal()
          }
        }
      ]
    })
    await actionSheet.present()

  }

  async openCat(){

    const modal = await this.modalCtrl.create({
      component: CategoriesPage,
      cssClass: 'categoriesModal',
      showBackdrop: true,
      componentProps:{
        id: this.navParams.get('id')
      }
    })
    return await modal.present();

  }

}
