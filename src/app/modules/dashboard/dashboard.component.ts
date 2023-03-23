import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Photo, PhotoStoreService } from 'src/app/shared';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
	photos: Observable<Array<Photo>>;
	constructor(private storeService: PhotoStoreService) {
		this.photos = this.storeService.photos;
	}
}
