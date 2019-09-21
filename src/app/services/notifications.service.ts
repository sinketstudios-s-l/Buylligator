import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private fcm: FCM
  ) { }

    getToken(){
      this.fcm.getToken().then(token => {
        localStorage.setItem('token', token)
        console.log(token)
      })
    }


}
