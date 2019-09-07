import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.page.html',
  styleUrls: ['./login-modal.page.scss'],
})
export class LoginModalPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private route: Router) { }

  ngOnInit() {

  }

  closeLogin(){
    this.modalCtrl.dismiss()
  }

  
}
