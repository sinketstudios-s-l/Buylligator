import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-qr-codes',
  templateUrl: './qr-codes.page.html',
  styleUrls: ['./qr-codes.page.scss'],
})
export class QrCodesPage implements OnInit {
  id
  qrData = null
  main
  sub
  subQR
  products: any[]
  userID
  constructor(
    private navParams: NavParams,
    private afs: AngularFirestore,
    private userSvc: UserService,
    private modalCtrl: ModalController) { }

  ngOnInit() {

    this.userID = this.userSvc.getUID()

    this.main = this.afs.collection(`products`)
    this.sub = this.main.valueChanges().subscribe(ev => {
      this.products = ev
    })

    this.id = this.navParams.get('id')
    if (this.id) {
      this.qrData = this.id
    }
  }


  close(){
    this.modalCtrl.dismiss()
  }


  showQr(e){

    const id = e.target.id

    this.subQR = this.main.doc(id).valueChanges().subscribe(ev => {
      this.qrData = ev.qrCodeRef
    })

    console.log()

  }

  closeQR(){
    this.qrData = ""
  }

  downloadQR(){}

}
