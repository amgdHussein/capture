import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserAuthService } from 'src/app/shared/services/user';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
})
export class SignInComponent {
	signInForm: FormGroup;
	constructor(
		private formBuilder: FormBuilder,
		private authService: UserAuthService,
	) {
		this.signInForm = this.formBuilder.group({
			email: [
				null,
				Validators.compose([Validators.required, Validators.email]),
			],
			password: [
				null,
				Validators.compose([Validators.required, Validators.minLength(8)]),
			],
		});
	}

	async signIn() {
		if (this.signInForm.valid) {
			let { email, password } = this.signInForm.value;
			return await this.authService.signIn(email, password);
		} else {
			window.alert(
				[
					'Invalid input format 😿.',
					'You can always recover your password by 😼👉 the "Forgot Password?" Link',
				].join('\n'),
			);
		}
	}

	googleSignIn() {
		return this.authService.googleSignIn();
	}
}
