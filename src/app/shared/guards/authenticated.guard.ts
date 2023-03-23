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
export class AuthenticationGuard implements CanActivate {
	constructor(public authService: UserAuthService, private router: Router) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Observable<boolean> | Promise<boolean> | boolean {
		if (this.authService.isAuthenticated) {
			this.router.navigate(['/dashboard']);
		}

		return true;
	}
}
