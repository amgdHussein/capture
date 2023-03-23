import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import { User } from './user.interface';
import { Observable, of, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

export interface IUserStoreService {
	addUser(user: User): Promise<void>;
	updateUser(user: User): Promise<void>;
	getUser(id: string): Promise<User>;
}

@Injectable()
export class UserStoreService implements IUserStoreService {
	currentUser: Observable<User | null>;
	private collection: AngularFirestoreCollection;

	constructor(
		private authService: AngularFireAuth,
		private storeService: AngularFirestore,
	) {
		this.collection = this.storeService.collection('users');
		this.currentUser = this.authService.authState.pipe(
			switchMap((user) => {
				if (user === null || user === undefined) return of(null);
				return this.storeService
					.doc(`users/${user.uid}`)
					.valueChanges() as Observable<User>;
			}),
		);
	}

	async addUser(user: User): Promise<void> {
		const doc = this.collection.doc(user.uid);
		return doc.set(user);
	}

	async updateUser(user: User): Promise<void> {
		const doc = this.collection.doc(user.uid);
		return await doc.update(user);
	}

	async getUser(id: string): Promise<User> {
		const doc = this.collection.doc(id);
		const documentSnapshot = await doc.ref.get();
		if (documentSnapshot.exists) {
			return documentSnapshot.data() as User;
		} else {
			throw new Error('User does not exist.');
		}
	}
}
