import { Component, Input } from '@angular/core';
import * as moment from 'moment';
import { Photo, PhotoStoreService } from 'src/app/shared';

import { User, UserStoreService } from 'src/app/shared/services/user';

@Component({
	selector: 'dashboard-photo',
	templateUrl: './dashboard-photo.component.html',
})
export class DashboardPhotoComponent {
	@Input()
	userPhoto!: Photo;

	user: User | null = null;

	constructor(
		private userStoreService: UserStoreService,
		private storeService: PhotoStoreService,
	) {
		this.userStoreService.currentUser.subscribe((currentUser) => {
			this.user = currentUser;
		});
	}

	get isCurrentUser(): boolean {
		return this.user?.uid === this.userPhoto.uid;
	}

	deletePhoto() {
		this.storeService.deletePhoto(this.userPhoto.id).subscribe(() => {
			console.log(`Photo with ${this.userPhoto?.id} deleted.`);
		});
	}

	get creationDate() {
		return moment(this.userPhoto.date).format('MMMM D, YYYY').toUpperCase();
	}
}
