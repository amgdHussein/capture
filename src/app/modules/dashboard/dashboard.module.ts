import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonModule } from '@angular/common';

import {
	AuthenticationGuard,
	EmailVerificationGuard,
	UnAuthenticationGuard,
} from 'src/app/shared/guards';

import {
	FroalaEditorStoreService,
	PhotoStorageService,
	PhotoStoreService,
} from 'src/app/shared/services';

import { PhotoDialogModule } from '../photo-dialog';

import {
	DashboardPhotoComponent,
	EmailVerificationComponent,
	ForgotPasswordComponent,
	FroalaEditorComponent,
	SignInComponent,
	SignUpComponent,
} from 'src/app/components';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
	imports: [
		DashboardRoutingModule,

		BrowserModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,

		AngularFireAuthModule,
		AngularFirestoreModule,
		AngularFireStorageModule,

		MatButtonModule,
		MatCommonModule,
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,

		PhotoDialogModule,

		FroalaEditorModule.forRoot(),
		FroalaViewModule.forRoot(),
	],
	declarations: [
		SignInComponent,
		SignUpComponent,
		EmailVerificationComponent,
		ForgotPasswordComponent,

		DashboardComponent,
		DashboardPhotoComponent,

		FroalaEditorComponent,
	],
	providers: [
		PhotoStoreService,
		PhotoStorageService,
		FroalaEditorStoreService,

		AuthenticationGuard,
		UnAuthenticationGuard,
		EmailVerificationGuard,
	],
	exports: [DashboardComponent],
})
export class DashboardModule {}
