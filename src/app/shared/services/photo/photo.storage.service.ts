import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

export interface IPhotoStorageService {
	uploadPhoto(id: string, file: File): Observable<number | undefined>;
	updatePhoto(id: string, file: File): Observable<number | undefined>;
	deletePhoto(id: string): Observable<any>;
	getDownloadURL(id: string): Observable<string>;
}

@Injectable()
export class PhotoStorageService implements IPhotoStorageService {
	constructor(private storage: AngularFireStorage) {}

	uploadPhoto(id: string, file: File): Observable<number | undefined> {
		let ref = this.storage.ref(id);
		let task = ref.put(file);
		let uploadState = task.snapshotChanges().pipe(map((s) => s?.state));
		let uploadProgress = task.percentageChanges();
		return uploadProgress;
	}

	updatePhoto(id: string, file: File): Observable<number | undefined> {
		return this.deletePhoto(id).pipe(() => this.uploadPhoto(id, file));
	}

	deletePhoto(id: string): Observable<any> {
		return this.storage.ref(id).delete();
	}

	getDownloadURL(id: string): Observable<string> {
		return this.storage.ref(id).getDownloadURL();
	}
}
