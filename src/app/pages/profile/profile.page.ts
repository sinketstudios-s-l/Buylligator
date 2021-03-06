import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SettingsPage } from '../settings/settings.page';
import { UploadPage } from '../upload/upload.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  ownID
  profileID

  username
  mainuser
  sub
  profilePic
  email
  sales = 0
  purchases = 0

  myProducts: any[]

  expressImg: string = "https://firebasestorage.googleapis.com/v0/b/buylligator.appspot.com/o/flash.png?alt=media&token=a3d886d8-63e8-47d0-9bcf-968026d1ef11"
  save

  constructor(
    private userSvc: UserService,
    private afs: AngularFirestore,
    private actRoute: ActivatedRoute,
    private route: Router,
    private modalCtrl: ModalController) { }

  ngOnInit() {

    this.profileID = this.actRoute.snapshot.paramMap.get('id')
    this.ownID = this.userSvc.getUID()

    if (this.profileID == this.ownID) {

      this.mainuser = this.afs.doc(`users/${this.ownID}`)
      this.sub = this.mainuser.valueChanges().subscribe(event => {

        this.username = event.username
        this.profilePic = event.profilePic
        this.email = event.email
        this.purchases = event.purchases.length
        this.sales = event.sales.length

      })

      this.afs.collection('products').valueChanges().pipe()
        .subscribe(event => {
          this.myProducts = event
        })

    } else if (this.profileID != this.userSvc.getUID()) {

      this.mainuser = this.afs.doc(`users/${this.profileID}`)
      this.sub = this.mainuser.valueChanges().subscribe(event => {

        this.username = event.username
        this.profilePic = event.profilePic
        this.email = event.email
        this.purchases = event.purchases.length
        this.sales = event.sales.length

      })

    }
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }


  async settings(event){
    const modal = await this.modalCtrl.create({
      component: SettingsPage,
      componentProps: {
        id: event.target.id
      }
    })
    await modal.present()
    console.log(event.target.id)
  }


  view(event) {
    let id = event.target.id

    this.route.navigate(['/view/' + id])

    console.log(id)

  }

  async openModal(){
    const ref = Math.random().toString(36).substring(2, 16) + Math.random().toString(36).substring(2, 16).toUpperCase()
    const modal = await this.modalCtrl.create({
      component: UploadPage,
      componentProps: {
        userID: this.userSvc.getUID(),
        id: ref,
        username: this.username
      }
    })
    await modal.present()
  }


}
