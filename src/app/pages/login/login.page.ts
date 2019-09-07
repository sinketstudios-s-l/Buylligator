import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  username:string
  email:string
  passwd:string
  profilePic:string = "../../../assets/default-user.jpg"
  verificated: boolean = false
  constructor(private route: Router, 
              private menuCtrl: MenuController, 
              private alertCtrl: AlertController,
              private session: SessionService) { }

  ngOnInit() {
    this.menuCtrl.enable(false, 'main')
  }

  openReg(){
    document.getElementById('logForm').style.display = "none"
    document.getElementById('regForm').style.display = "block"
  }

  openLog(){
    document.getElementById('regForm').style.display = "none"
    document.getElementById('logForm').style.display = "block"
  }
  

  async confTerms(){

    if(this.username && this.email && this.passwd){
    
    let alert = await this.alertCtrl.create({
      header: 'terms',
      message: 'asdas',
      buttons: [
        {
          text: 'Rechazar',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.session.registro(this.username, this.passwd, this.email)
          }
        }
      ]
    });
    await alert.present()

    }

  }
  
  login(){
    this.session.login(this.username, this.passwd)
  }
  


  closeModal(){
    this.route.navigate(['./'])
  }

}
