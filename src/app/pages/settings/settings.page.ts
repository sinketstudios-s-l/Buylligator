import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  id
  mainuser
  sub
  username
  profilePic
  email

  uploading: boolean
  uploadProgress
  constructor(
    private navParams: NavParams, 
    private userSvc: UserService,
    private modalCtrl: ModalController,
    private afs: AngularFirestore,
    private storage: AngularFireStorage) { }

  ngOnInit() {

    this.id = this.navParams.get('id')

    if(this.id == "edit"){

      this.mainuser = this.afs.doc(`users/${this.userSvc.getUID()}`)
      this.sub = this.mainuser.valueChanges().subscribe(event => {

        this.username = event.username
        this.profilePic = event.profilePic
        this.email = event.email


      })
    }
  }

  updateProf(){

    this.userSvc.updateEmail(this.username)

  }

  uploadImg(event){

    const file = event.target.files[0]
    const filePath = `users/${this.userSvc.getUID()}`

    this.storage.ref(filePath).put(file).then(upl => {
      this.uploading = true
      this.uploadProgress = (upl.bytesTransferred / upl.totalBytes) * 100

      this.storage.ref(filePath).getDownloadURL().subscribe(url => {
        this.profilePic = url
        this.afs.doc(`users/${this.userSvc.getUID()}`).update({
          profilePic: this.profilePic
        }).then(() => this.uploading = false)
      })
    })

    console.log(event)

  }

  focusImg(){
    document.getElementById('fileInp').click()
  }

  close(){
    this.modalCtrl.dismiss()
  }

  logout(){
    this.userSvc.logout()
  }

}
