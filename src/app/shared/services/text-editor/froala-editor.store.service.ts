import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import {
	AngularFirestore,
	AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import * as moment from 'moment';

import { FroalaData } from './froala-data.entity.interface';

export interface IFroalaEditorStoreService {
	setContent(content: string): Promise<void>;
}

@Injectable()
export class FroalaEditorStoreService implements IFroalaEditorStoreService {
	private readonly collection: AngularFirestoreCollection;
	private id: string = '';
	froalaData: Observable<FroalaData | null>;

	constructor(
		private storeService: AngularFirestore,
		private authService: AngularFireAuth,
	) {
		this.collection = storeService.collection('froala');
		this.froalaData = this.authService.authState.pipe(
			switchMap((user) => {
				if (user === null || user === undefined) return of(null);
				this.id = user.uid;
				return this.storeService
					.doc(`froala/${user.uid}`)
					.valueChanges() as Observable<FroalaData>;
			}),
		);
	}

	async setContent(content: string): Promise<void> {
		if (this.id) {
			const doc = this.collection.doc(this.id);
			const data: FroalaData = {
				id: this.id,
				content: content,
				lastModification: +moment(),
			};

			return await doc.set(data, {
				merge: true,
			});
		}
	}
}
