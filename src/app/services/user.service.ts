import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { first } from 'rxjs/operators'

interface user {
      username: string
      uid: string
  }

@Injectable({
  providedIn: 'root'
})


export class UserService {

  private user: user

  constructor(private afAuth: AngularFireAuth) { }

  setUser(user:user){
    
    this.user = user

  }

  getUsername(): string {
		return this.user.username
	}

	reAuth(username: string, passwd: string) {
		return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(username + '@buylligator.com', passwd))
	}

	updatePassword(newpassword: string) {
		return this.afAuth.auth.currentUser.updatePassword(newpassword)
	}

	updateEmail(newemail: string) {
		return this.afAuth.auth.currentUser.updateEmail(newemail + '@buylligator.com')
	}

	async isAuthenticated() {
		if(this.user) return true

		const user = await this.afAuth.authState.pipe(first()).toPromise()

		if(user) {
			this.setUser({
				username: user.email.split('@')[0],
				uid: user.uid
			})

			return true
		}
		return false
	}

	getUID(): string {
		return this.user.uid
	}


  logout(){
	this.afAuth.auth.signOut()
  }

}
