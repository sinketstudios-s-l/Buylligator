import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  id
  constructor(private navParams: NavParams) { }

  ngOnInit() {

    this.id = this.navParams.get('id')

  }

}
