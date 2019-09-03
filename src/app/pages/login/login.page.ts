import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController, AlertController } from '@ionic/angular';
import { delay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user.service';
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
  constructor(private modalCtrl: ModalController, 
              private menuCtrl: MenuController, 
              private alertCtrl: AlertController,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private userSvc: UserService,
              private router: Router) { }

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
            this.registro()
          }
        }
      ]
    });
    await alert.present()

    }

  }
  
  
  async registro(){

    const { username, passwd, email, profilePic, verificated } = this

    try {
			const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + '@buylligator.com', passwd)


			this.afs.doc(`users/${res.user.uid}`).set({
				profilePic,
				username,
				email,
        role: 0,
        verificated: verificated

			})

			this.userSvc.setUser({
				username,
				uid: res.user.uid
			})

      this.router.navigate(['/home'])
      this.closeModal()

		} catch(error) {
			console.dir(error)
		}

  }

  async login(){

    const { username, passwd } = this
		
		try {

			const res = await this.afAuth.auth.signInWithEmailAndPassword(username + '@buylligator.com', passwd)
			
			if(res.user) {
				this.userSvc.setUser({
					username,
					uid: res.user.uid
				})
        
        this.router.navigate(['/home'])
        this.closeModal()

			}
		
		} catch(err) {
      console.dir(err)
      
		}

  }


  closeModal(){
    this.modalCtrl.dismiss();
  }

}
