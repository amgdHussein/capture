import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/shared';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
	constructor(public authService: UserAuthService) {}

	forgotPassword(passwordResetEmail: string): Promise<void> {
		return this.authService.forgotPassword(passwordResetEmail);
	}
}
