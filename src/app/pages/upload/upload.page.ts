import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ActionSheetController } from '@ionic/angular';
import { CategoriesPage } from '../categories/categories.page';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map } from 'rxjs/operators';
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
  userID
  productID = this.navParams.get('id')

  title: string
  desc: string
  currency: string

  express: boolean
  PI: number

  fileUrl
  noImg = ""
  urlImg1
  urlImg2
  urlImg3
  urlImg4
  urlImg5

  uploadProgress
  uploading = false
  constructor(
    private modalCtrl: ModalController,
    private afs: AngularFirestore,
    private navParams: NavParams,
    private actionShtCtrl: ActionSheetController,
    private storage: AngularFireStorage) { }

  ngOnInit() {
    this.username = this.navParams.get('username')
    this.userID = this.navParams.get('userID')

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
        title: null,
        express: false,
        username: this.username,
        verificated: false,
        open: true,
        date: new Date(),
        status: "selling",
        currency: null,
        userID: this.userID
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

  uploadImg(event) {

    const id = Math.random().toString(36).substring(2)
    const file = event.target.files[0]
    const filePath = `products/${id}`


    if (this.urlImg1 == null) {
      this.storage.ref(filePath).put(file).then(upl => {
        this.uploading = true
        this.uploadProgress = (upl.bytesTransferred / upl.totalBytes) * 100

        this.storage.ref(filePath).getDownloadURL().subscribe(url => {
          this.urlImg1 = url
          this.afs.doc(`products/${this.productID}`).update({
            img: firestore.FieldValue.arrayUnion(this.urlImg1)
          }).then(() => this.uploading = false)
        })
      })
    } else if (this.urlImg2 == null) {
      this.storage.ref(filePath).put(file).then(upl => {
        this.uploading = true
        this.uploadProgress = (upl.bytesTransferred / upl.totalBytes) * 100
        this.storage.ref(filePath).getDownloadURL().subscribe(url => {
          this.urlImg2 = url
          this.afs.doc(`products/${this.productID}`).update({
            img: firestore.FieldValue.arrayUnion(this.urlImg2)
          }).then(() => this.uploading = false)
        })
      })
    } else if (this.urlImg3 == null) {
      this.storage.ref(filePath).put(file).then(upl => {
        this.uploading = true
        this.uploadProgress = (upl.bytesTransferred / upl.totalBytes) * 100
        this.storage.ref(filePath).getDownloadURL().subscribe(url => {
          this.urlImg3 = url
          this.afs.doc(`products/${this.productID}`).update({
            img: firestore.FieldValue.arrayUnion(this.urlImg3)
          }).then(() => this.uploading = false)
        })
      })
    } else if (this.urlImg4 == null) {
      this.storage.ref(filePath).put(file).then(upl => {
        this.uploading = true
        this.uploadProgress = (upl.bytesTransferred / upl.totalBytes) * 100
        this.storage.ref(filePath).getDownloadURL().subscribe(url => {
          this.urlImg4 = url
          this.afs.doc(`products/${this.productID}`).update({
            img: firestore.FieldValue.arrayUnion(this.urlImg4)
          }).then(() => this.uploading = false)
        })
      })
    } else if (this.urlImg5 == null) {
      this.storage.ref(filePath).put(file).then(upl => {
        this.uploading = true
        this.uploadProgress = (upl.bytesTransferred / upl.totalBytes) * 100
        this.storage.ref(filePath).getDownloadURL().subscribe(url => {
          this.urlImg5 = url
          this.afs.doc(`products/${this.productID}`).update({
            img: firestore.FieldValue.arrayUnion(this.urlImg5)
          }).then(() => this.uploading = false)
        })
      })
    }
  }

  upload() {

    
    const { PI, desc, productID, title } = this
    if(this.currency == ""){
      this.currency = "EUR"
    }
    
    this.afs.doc(`products/${productID}`).update({
      PI: PI,
      PA: PI,
      desc: desc,
      title: title,
      express: false,
      verificated: true,
      currency: this.currency

    }).then(() => { this.modalCtrl.dismiss() })
  }

  divisa(event) {
    this.currency = event.target.value
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
