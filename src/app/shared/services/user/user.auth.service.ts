import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';

import { User } from './user.interface';
import { UserLocalService } from './user.local.service';
import { UserStoreService } from './user.store.service';

export interface IUserAuthService {
	get isAuthenticated(): boolean;
	signIn(email: string, password: string): Promise<void>;
	signUp(email: string, password: string, username: string): Promise<void>;
	googleSignIn(): Promise<void>;
	googleSignUp(): Promise<void>;
	sendVerificationMail(): Promise<void>;
	forgotPassword(passwordResetEmail: string): Promise<void>;
	signOut(): Promise<void>;
}

@Injectable()
export class UserAuthService implements IUserAuthService {
	currentUser: any;

	constructor(
		private userLocalService: UserLocalService,
		private userStoreService: UserStoreService,
		private userAuthService: AngularFireAuth,
		private router: Router,
	) {
		this.userAuthService.authState.subscribe((user) => {
			// Saving user data in localstorage
			this.userLocalService.setUser(user);
			// this._currentUser = this.userLocalService.getUser();
		});

		this.userAuthService.user.subscribe((user) => {
			this.currentUser = user;
		});
	}

	// Returns true when user is looged in and email is verified
	get isAuthenticated(): boolean {
		const user = this.userLocalService.getUser();
		return user && user.emailVerified;
	}

	// Save user data into firestore
	private async addUser(userCredential: any): Promise<void> {
		const user: User = {
			uid: userCredential.uid,
			email: userCredential.email,
			displayName: userCredential.displayName,
			photoURL: userCredential.photoURL,
			emailVerified: userCredential.emailVerified,
		};

		return await this.userStoreService.addUser(user);
	}

	// Sign in with email/password
	async signIn(email: string, password: string): Promise<void> {
		try {
			await this.userAuthService.signInWithEmailAndPassword(email, password);
			this.userAuthService.authState.subscribe(async (user) => {
				if (user) await this.router.navigate(['dashboard']);
			});
		} catch (error: any) {
			window.alert(error?.message || error);
		}
	}

	// Sign up with email/password
	async signUp(
		email: string,
		password: string,
		username: string,
	): Promise<void> {
		try {
			// Sign up -> send user to firestore
			const userCredential =
				await this.userAuthService.createUserWithEmailAndPassword(
					email,
					password,
				);
			await userCredential.user?.updateProfile({ displayName: username });
			await this.addUser(userCredential.user);

			// Verify email and sign in
			await this.router.navigate(['verify-email-address']).then(async () => {
				await this.signIn(email, password);
			});
		} catch (error: any) {
			window.alert(error?.message || error);
		}

		return;
	}

	// Send email verfificaiton when new user sign up
	async sendVerificationMail(): Promise<void> {
		try {
			const user = await this.userAuthService.currentUser;
			await user?.sendEmailVerification();
		} catch (error: any) {
			window.alert(error?.message || error);
		}

		return;
	}

	// Reset Forggot password
	async forgotPassword(passwordResetEmail: string): Promise<void> {
		try {
			await this.userAuthService.sendPasswordResetEmail(passwordResetEmail);
			window.alert('Password reset email sent, check your inbox.');
		} catch (error: any) {
			window.alert(error?.message || error);
		}

		return;
	}

	// Sign in with Google
	async googleSignIn(): Promise<void> {
		await this.accountSignIn(new auth.GoogleAuthProvider());
		await this.router.navigate(['dashboard']);
	}

	private async accountSignIn(provider: any): Promise<void> {
		try {
			const userCredential = await this.userAuthService.signInWithPopup(
				provider,
			);
		} catch (error: any) {
			window.alert(error?.message || error);
		}
	}

	async googleSignUp(): Promise<void> {
		await this.accountSigUp(new auth.GoogleAuthProvider());
		await this.router.navigate(['dashboard']);
	}

	private async accountSigUp(provider: any): Promise<void> {
		try {
			const userCredential = await this.userAuthService.signInWithPopup(
				provider,
			);
			await this.addUser(userCredential.user);
		} catch (error: any) {
			window.alert(error?.message || error);
		}
	}

	async signOut(): Promise<void> {
		try {
			await this.userAuthService.signOut();
			this.userLocalService.deleteUser();
			await this.router.navigate(['sign-in']);
		} catch (error: any) {
			window.alert(error?.message || error);
		}
	}
}
