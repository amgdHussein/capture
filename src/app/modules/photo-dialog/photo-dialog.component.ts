import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PhotoStoreService } from 'src/app/shared';

@Component({
	selector: 'photo-dialog',
	templateUrl: 'photo-dialog.component.html',
})
export class PhotoDialogComponent {
	photoForm: FormGroup;
	progress: number = 0;
	file: File | undefined;

	constructor(
		private formBuilder: FormBuilder,
		private photoStoreService: PhotoStoreService,
		private dialogRef: MatDialogRef<PhotoDialogComponent>,
		@Inject(MAT_DIALOG_DATA) private data: FormGroup,
	) {
		this.photoForm = this.formBuilder.group({
			tag: [
				null,
				Validators.compose([Validators.required, Validators.maxLength(15)]),
			],
			description: [
				null,
				Validators.compose([Validators.required, Validators.maxLength(80)]),
			],
			img: [null, Validators.compose([Validators.required])],
		});

		// Cancel when esc button clicked
		this.dialogRef.keydownEvents().subscribe((event) => {
			if (event.key === 'Escape') {
				this.onCancel();
			}
		});

		this.dialogRef.backdropClick().subscribe((event) => {
			this.onCancel();
		});
	}

	// On file selected
	onChange(event: any) {
		if (event.target.files.length > 0) {
			this.file = event.target.files[0];
		}
	}

	// On click of button upload
	onUpload() {
		if (this.photoForm.valid && this.file) {
			// Open a subscription with firebase
			this.photoStoreService
				.addPhoto(
					this.file,
					this.photoForm.value.tag,
					this.photoForm.value.description,
				)
				.subscribe((value: number | undefined) => {
					this.progress = value ?? 0;
				});
		} else {
			window.alert(
				['Invalid Form 😿.', 'Please check your form and 😸 try again.'].join(
					'\n',
				),
			);
		}
	}

	// Progress bar status
	onLoading(): number {
		return Math.floor(this.progress);
	}

	get isLoaded(): boolean {
		return this.progress == 100;
	}

	onCancel(): void {
		this.dialogRef.close(this.photoForm);
	}
}
