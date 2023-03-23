import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';

import {
	AngularFirestore,
	AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import * as moment from 'moment';

import { Photo } from './photo.entity.interface';
import { PhotoStorageService } from './photo.storage.service';
import { UserAuthService } from '../user';

export interface IPhotoStoreService {
	addPhoto(
		file: File,
		tag: string,
		description: string,
	): Observable<number | undefined>;

	updatePhoto(photo: Photo): Promise<Photo>;
	deletePhoto(id: string): Observable<any>;
}

@Injectable()
export class PhotoStoreService implements IPhotoStoreService {
	private collection: AngularFirestoreCollection<Photo>;
	photos: Observable<Photo[]>;

	constructor(
		private storageService: PhotoStorageService,
		private storeService: AngularFirestore,
		private authService: UserAuthService,
	) {
		this.collection = this.storeService.collection('photos');
		this.photos = this.collection.valueChanges({ idField: 'id' });
	}

	addPhoto(
		file: File,
		tag: string,
		description: string,
	): Observable<number | undefined> {
		let doc = this.collection.doc();
		let id = doc.ref.id;
		let uploadProgress = this.storageService.uploadPhoto(id, file);

		return uploadProgress.pipe(
			finalize(() => {
				this.storageService.getDownloadURL(id).subscribe(async (url) => {
					let photo: Photo = {
						id: id,
						uid: this.authService.currentUser?.uid,
						username: this.authService.currentUser?.displayName,
						tag: tag,
						description: description,
						url: url,
						type: file.type,
						date: moment().valueOf(),
						size: file.size,
					};

					return await doc.set(photo);
				});
			}),
		);
	}

	updatePhoto(photo: Photo): Promise<Photo> {
		throw new Error('Method not implemented.');
	}

	deletePhoto(id: string): Observable<any> {
		let updateProgress = this.storageService.deletePhoto(id);

		return updateProgress.pipe(
			finalize(async () => {
				return await this.collection.doc(id).delete();
			}),
		);
	}
}
