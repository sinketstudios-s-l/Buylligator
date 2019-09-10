import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  ownID

  username
  mainuser
  sub
  profilePic
  email

  myProducts

  profileID
  constructor(
    private userSvc: UserService,
    private afs: AngularFirestore,
    private actRoute: ActivatedRoute) { }

  ngOnInit() {

    this.profileID = this.actRoute.snapshot.paramMap.get('id')
    this.ownID = this.userSvc.getUID()

    if (this.profileID == this.ownID) {

      this.mainuser = this.afs.doc(`users/${this.ownID}`)
      this.sub = this.mainuser.valueChanges().subscribe(event => {

        this.username = event.username
        this.profilePic = event.profilePic
        this.email = event.email


      })
    } else if (this.profileID != this.userSvc.getUID()) {

      this.mainuser = this.afs.doc(`users/${this.profileID}`)
      this.sub = this.mainuser.valueChanges().subscribe(event => {

        this.username = event.username
        this.profilePic = event.profilePic
        this.email = event.email


      })

    }
  }





}
