import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserAuthService } from 'src/app/shared/services/user';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
	signUpFrom: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private authService: UserAuthService,
	) {
		this.signUpFrom = this.formBuilder.group({
			email: [
				null,
				Validators.compose([Validators.required, Validators.email]),
			],
			username: [
				null,
				Validators.compose([
					Validators.required,
					Validators.minLength(4),
					Validators.pattern('^[a-zA-Z ]*$'),
				]),
			],
			password: [
				null,
				Validators.compose([Validators.required, Validators.minLength(8)]),
			],
		});
	}

	async signUp(): Promise<void> {
		if (this.signUpFrom.valid) {
			let { email, username, password } = this.signUpFrom.value;
			return await this.authService.signUp(email, password, username);
		} else {
			window.alert(
				[
					'Invalid input format 🙀.',
					'Please check your form and 😸 try again.',
				].join('\n'),
			);
		}
	}

	async googleSignUp(): Promise<void> {
		return await this.authService.googleSignUp();
	}
}
