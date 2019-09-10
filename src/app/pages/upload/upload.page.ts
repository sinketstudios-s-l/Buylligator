import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ActionSheetController } from '@ionic/angular';
import { CategoriesPage } from '../categories/categories.page';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { firestore } from 'firebase'


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

  title:string
  desc:string

  express: boolean
  PI: number

  noImg = ""
  urlImg1
  urlImg2: Observable<any>;
  urlImg3: Observable<any>;
  urlImg4: Observable<any>;
  urlImg5: Observable<any>;

  constructor(
    private modalCtrl: ModalController,
    private afs: AngularFirestore,
    private navParams: NavParams,
    private actionShtCtrl: ActionSheetController,
    private storage: AngularFireStorage) { }

  ngOnInit() {
    this.username = this.navParams.get('username')

    console.log(this.productID)

    if (this.navParams.get('id')) {
      this.openCat()
      this.afs.doc(`products/${this.productID}`).set({

        productID: this.productID,
        category: null,
        PA: 0,
        PI: 0,
        img: [],
        desc: null,
        express: false,
        username: this.username,
        verificated: false,
        open: true,
        date: new Date(),

      })


      this.main = this.afs.doc(`products/${this.productID}`)
      this.sub = this.main.valueChanges().subscribe(ev => {
        this.category = ev.category
      })

    }

  }

  closeModal() {
    this.afs.collection('products').doc(this.productID).delete().then(() => {
      this.modalCtrl.dismiss()
    })
  }

  focusInp(id: string) {
    if (id == 'f1') {
      document.getElementById('f1').click()
    } else if (id == 'f2') {
      document.getElementById('f2').click()
    } else if (id == 'f3') {
      document.getElementById('f3').click()
    } else if (id == 'f4') {
      document.getElementById('f4').click()
    } else if (id == 'f5') {
      document.getElementById('f5').click()
    }

    
  }

  async uploadImg(event) {

    const id = Math.random().toString(36).substring(2)
    const file = event.target.files[0]
    const filePath = `products/${id}`
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file)

    if (this.urlImg1 == null) {
      task.snapshotChanges().pipe(finalize(() => this.urlImg1 = ref.getDownloadURL())).subscribe()

      
    } else if (this.urlImg2 == null) {
      task.snapshotChanges().pipe(finalize(() => this.urlImg2 = ref.getDownloadURL())).subscribe()
    } else if (this.urlImg3 == null) {
      task.snapshotChanges().pipe(finalize(() => this.urlImg3 = ref.getDownloadURL())).subscribe()
    } else if (this.urlImg4 == null) {
      task.snapshotChanges().pipe(finalize(() => this.urlImg4 = ref.getDownloadURL())).subscribe()
    } else if (this.urlImg5 == null) {
      task.snapshotChanges().pipe(finalize(() => this.urlImg5 = ref.getDownloadURL())).subscribe()
    }

  }

  upload() {

    const { PI, desc, productID, title } = this

    this.afs.doc(`products/${productID}`).update({
      PI: PI,
      PA: PI,
      desc: desc,
      title: title,
      express: false,
      expressImg: "../../../assets/flash.png",
      verificated: true
    }).then(() => { this.modalCtrl.dismiss() } )
  }

  divisa(event) {
    console.log(event.target.value)
  }


  async cancelUpl() {

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

  async openCat() {

    const modal = await this.modalCtrl.create({
      component: CategoriesPage,
      cssClass: 'categoriesModal',
      showBackdrop: true,
      componentProps: {
        id: this.navParams.get('id')
      }
    })
    return await modal.present();

  }

}
