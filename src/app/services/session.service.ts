import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  username
  passwd
  email
  profilePic:string = "http://khaoyaiconcrete.co.th/images/no-img.jpg"

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private userSvc: UserService,
    private modalCtrl: ModalController,
    private router: Router,
    private alertCtrl: AlertController
  ) { }



  async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['Cerrar']
    })
    await alert.present()
  }

  async registro(username: string, passwd: string, email: string) {

    const { profilePic } = this

    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + '@buylligator.com', passwd)

      const ref = Math.random().toString(36).substring(2, 16) + Math.random().toString(36).substring(2, 16).toUpperCase()

      this.afs.doc(`users/${res.user.uid}`).set({
        profilePic,
        username,
        email,
        role: 0,
        verificated: false,
        date: new Date(),
        accType: "particular",
        familyName: null,
        age: null,
        withdrawAccRef: ref
      }).then(() => {
        this.router.navigate(['/home']).finally(() => window.location.reload())
      })

      this.userSvc.setUser({
        username,
        uid: res.user.uid
      })

      this.afs.doc(`wallet/${ref}`).set({
        userID: res.user.uid,
        funds: 0,
      })


    } catch (error) {

      this.presentAlert('¡Vaya, algo ha salido mal!', error)

      console.dir(error)
    } 

  }


  async login(username: string, passwd: string) {


    try {

      const res = await this.afAuth.auth.signInWithEmailAndPassword(username + '@buylligator.com', passwd)

      if (res.user) {
        this.userSvc.setUser({
          username,
          uid: res.user.uid
        })

        this.router.navigate(['/home']).then(() => window.location.reload())

      }

    } catch (err) {

      this.presentAlert('¡Vaya, algo ha salido mal!', err)
      console.dir(err)

    }

  }


}
