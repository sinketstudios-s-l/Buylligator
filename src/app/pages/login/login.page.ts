import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController } from '@ionic/angular';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private modalCtrl: ModalController, private menuCtrl: MenuController) { }

  ngOnInit() {
    

    
  }

  openReg(){
    document.getElementById('logForm').style.display = "none"
    document.getElementById('regForm').style.display = "block"
  }

  openLog(){
    document.getElementById('regForm').style.display = "none"
    document.getElementById('logForm').style.display = "block"
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

}
