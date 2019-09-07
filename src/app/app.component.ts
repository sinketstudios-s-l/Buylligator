import { Component, OnInit } from '@angular/core';

import { Platform, MenuController, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

//MODALS
import { LoginModalPage } from './pages/login-modal/login-modal.page';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  
  img = "https://www.akamai.com/es/es/multimedia/images/intro/image-manager-intro.png?imwidth=1366"
  
  username
  mainuser
  sub
  profilePic

  menuOpts: menuOpts[] = [
    {
      title: "Ayuda",
      redirectTo: "/help"
    }
  ]
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuCtrl: MenuController,
    private modalCtrl: ModalController,
    private route: Router,
    private afs: AngularFirestore,
    private userSvc: UserService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit(){


   // let uid = localStorage.getItem('uid')

   /* this.mainuser = this.afs.doc(`users/${uid}`)
    this.sub = this.mainuser.valueChanges().subscribe(event => {
        this.username = event.username
        this.profilePic = event.profilePic
  
    }) 

    this.mainuser = this.afs.doc(`users/${this.userSvc.getUID()}`)
    this.sub = this.mainuser.valueChanges().subscribe(event => {
        this.username = event.username
    })  
*/
  }

  profile(){
    this.menuCtrl.close()
    this.route.navigate(['/profile'])
  }

  login(){
    this.route.navigate(['/login'])
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

interface menuOpts {
  title: string
  redirectTo: string
}