import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthService implements CanActivate{

  constructor(private user: UserService, private route: Router) { }

  async canActivate(route) {
		if(await this.user.isAuthenticated()) {

			return true
		}

		return false
	}

}
