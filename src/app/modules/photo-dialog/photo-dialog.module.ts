import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { PhotoDialogComponent } from './photo-dialog.component';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [PhotoDialogComponent],
	entryComponents: [PhotoDialogComponent],
	imports: [
		FormsModule,
		CommonModule,
		ReactiveFormsModule,

		MatButtonModule,
		MatCommonModule,
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
	],
})
export class PhotoDialogModule {}
