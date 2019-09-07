import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './user.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  username
  passwd
  email
  profilePic
  verificated

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private userSvc: UserService,
    private modalCtrl: ModalController,
    private router: Router
  ) { }


  async registro(username: string, passwd:string, email:string){

   const { profilePic, verificated } = this

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

		} catch(error) {
			console.dir(error)
		}

  }


  async login(username: string, passwd: string){

		
		try {

			const res = await this.afAuth.auth.signInWithEmailAndPassword(username + '@buylligator.com', passwd)
			
			if(res.user) {
				this.userSvc.setUser({
					username,
					uid: res.user.uid
        })
        
        this.router.navigate(['/home'])

			}
		
		} catch(err) {
      console.dir(err)
      
		}

  }


}
