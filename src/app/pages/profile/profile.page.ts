import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  username
  mainuser
  sub
  profilePic
  email

  myProducts
  constructor(
    private userSvc: UserService,
    private afs: AngularFirestore ) { }

  ngOnInit() {

      

      this.mainuser = this.afs.doc(`users/${this.userSvc.getUID()}`)
      this.sub = this.mainuser.valueChanges().subscribe(event => {
          this.username = event.username
          this.profilePic = event.profilePic
          this.email = event.email
          this.myProducts = event.myProducts
  
      })
    
    
      

  }

}
