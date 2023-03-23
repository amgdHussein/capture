import { Injectable } from '@angular/core';

export interface IUserLocalService {
	getUser(): any;
	setUser(user: any): void;
	deleteUser(): void;
}

@Injectable()
export class UserLocalService implements IUserLocalService {
	private key = 'user';

	getUser(): any {
		// Logged user data
		const data = localStorage.getItem(this.key);
		return JSON.parse(data!);
	}

	setUser(user: any): void {
		const data = JSON.stringify(user);
		// Setting up null when signed out
		return localStorage.setItem(this.key, data || 'null');
	}

	deleteUser(): void {
		return localStorage.removeItem(this.key);
	}
}
