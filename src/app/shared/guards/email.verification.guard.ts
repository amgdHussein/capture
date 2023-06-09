import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router,
} from '@angular/router';
import { Observable } from 'rxjs';

import { UserAuthService } from '../services/user';

@Injectable()
export class EmailVerificationGuard implements CanActivate {
	constructor(public authService: UserAuthService, private router: Router) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Observable<boolean> | Promise<boolean> | boolean {
		if (!this.authService.currentUser) {
			this.router.navigate(['/sign-in']);
		}
		return true;
	}
}
