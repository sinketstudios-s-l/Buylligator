import { Component, OnInit } from '@angular/core';

import { Platform, MenuController, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { LoginPage } from './pages/login/login.page';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  
  img = "https://www.akamai.com/es/es/multimedia/images/intro/image-manager-intro.png?imwidth=1366"
  
  username:string=""
  mainuser
  sub
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afs: AngularFirestore,
    private userSvc: UserService,
    private route: Router,
    private menuCtrl: MenuController,
    private modalCtrl: ModalController
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

    if(this.userSvc.isAuthenticated){

      this.mainuser = this.afs.doc(`users/${this.userSvc.getUID()}`)
      this.sub = this.mainuser.valueChanges().subscribe(event => {
          this.username = event.username
         
          //console.log(this.username)
        
      })

    } else {
      this.username = ""
    }

    


  }

  async login(){
    this.menuCtrl.close()
    const modal = await this.modalCtrl.create({
        component: LoginPage,
        cssClass: "loginPageModal",
    })
    return await modal.present()
  }

}
