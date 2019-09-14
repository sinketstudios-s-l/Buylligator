import { Component, OnInit } from '@angular/core';

import { Platform, MenuController, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

//MODALS
import { LoginModalPage } from './pages/login-modal/login-modal.page';
import { UserService } from './services/user.service';

import * as firebase from 'firebase'
import { FCM } from '@ionic-native/fcm/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  img = "http://khaoyaiconcrete.co.th/images/no-img.jpg"

  username
  mainuser
  sub
  profilePic

  currentUser
  userProf
  currentUserID

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuCtrl: MenuController,
    private modalCtrl: ModalController,
    private route: Router,
    private afs: AngularFirestore,
    private userSvc: UserService,
    private fcm: FCM

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.fcm.getToken()
    .then((token:string)=>{
     localStorage.setItem('fcm_token', token)
    })
    .catch(error=>{
      console.error(error);
    });
  }

  ngOnInit() {

    

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user
        this.currentUserID = user.uid
        this.userProf = firebase.firestore().doc(`users/${user.uid}`)

        this.mainuser = this.afs.doc(`users/${user.uid}`)
        this.sub = this.mainuser.valueChanges().subscribe(event => {
          this.username = event.username
          this.profilePic = event.profilePic
        })
      } else {
        this.username = ""
      }
    })

  }

  redirectTo(event){
    const id = event.target.id

    console.log(id)

    if(id == "shipping"){
      this.route.navigate(['/shipping'])
      this.menuCtrl.close()
    }else if(id == "help"){
      this.route.navigate(['/help'])
      this.menuCtrl.close()
    }else if(id == "sales"){
      this.route.navigate(['/sales'])
      this.menuCtrl.close()
    }else if(id == "purchases"){
      this.route.navigate(['/purchases'])
      this.menuCtrl.close()
    }

  }

  profile() {
    this.menuCtrl.close()
    this.route.navigate(['/profile/'+this.currentUserID])
  }

  login() {
    this.route.navigate(['/login'])
  }

  logout() {
    this.userSvc.logout()
    firebase.auth().signOut()
  }
  /* async login(){
     this.menuCtrl.close()
     const modal = await this.modalCtrl.create({
         component: LoginModalPage,
         cssClass: "loginPageModal",
     })
     return await modal.present()
   }
  */

}

