import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { first } from 'rxjs/operators'
import * as firebase from 'firebase'
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

interface user {
	username: string
	uid: string
}

@Injectable({
	providedIn: 'root'
})


export class UserService {

	private user: user

	constructor(private afAuth: AngularFireAuth, private route: Router, private modalCtrl: ModalController) { }

	setUser(user: user) {

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
		if (this.user) return true

		const user = await this.afAuth.authState.pipe(first()).toPromise()

		if (user) {
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


	logout() {
		this.modalCtrl.dismiss()
		this.afAuth.auth.signOut()
		this.route.navigate(['/home']).then(() => window.location.reload())
	}

}
