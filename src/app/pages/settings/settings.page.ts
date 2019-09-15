import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  id
  constructor(private navParams: NavParams, private userSvc: UserService) { }

  ngOnInit() {

    this.id = this.navParams.get('id')

  }

  logout(){
    this.userSvc.logout()
  }

}
