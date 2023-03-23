import { Component } from '@angular/core';

import { UserAuthService } from 'src/app/shared/services/user';

@Component({
	selector: 'app-verify-email',
	templateUrl: './email-verification.component.html',
})
export class EmailVerificationComponent {
	constructor(public authService: UserAuthService) {
		this.sendVerificationMail();
	}

	sendVerificationMail(): Promise<void> {
		return this.authService.sendVerificationMail();
	}

	get currentUser(): any {
		return this.authService.currentUser;
	}
}
