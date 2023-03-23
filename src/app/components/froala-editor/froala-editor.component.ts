import { Component } from '@angular/core';
import * as moment from 'moment';
import {
	FroalaData,
	FroalaEditorStoreService,
} from 'src/app/shared/services/text-editor';

@Component({
	selector: 'froala-editor',
	templateUrl: './froala-editor.component.html',
})
export class FroalaEditorComponent {
	froalaData: FroalaData = {
		id: '',
		content: '',
		lastModification: 0,
	};

	readonly options: Object = {
		placeholderText: 'Edit Your Content Here!',
		heightMin: 200,
		heightMax: 500,
	};

	constructor(private storeService: FroalaEditorStoreService) {
		this.storeService.froalaData.subscribe((data) => {
			if (data) this.froalaData = data;
		});
	}

	get lastModification() {
		let result = 'Initial';
		if (this.froalaData?.lastModification) {
			result = moment(this.froalaData?.lastModification)
				.format('DD MMM YYYY hh:mm a')
				.toUpperCase();
		}
		return result;
	}

	async setContent(): Promise<void> {
		await this.storeService.setContent(this.froalaData.content);
	}
}
