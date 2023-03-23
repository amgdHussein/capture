import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';

import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from 'src/environment/environment.production';

import {
	UserAuthService,
	UserLocalService,
	UserStoreService,
} from './shared/services';

import { DashboardModule } from './modules';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		AppRoutingModule,
		DashboardModule,

		AngularFireModule.initializeApp(environment.firebaseConfigs),
		AngularFireAuthModule,
		AngularFirestoreModule,
		AngularFireStorageModule,

		CommonModule,
		FormsModule,
		MatButtonModule,
		MatCommonModule,
		MatFormFieldModule,
		MatInputModule,
		BrowserAnimationsModule,

		NgbModule,
	],
	declarations: [AppComponent],
	providers: [UserLocalService, UserAuthService, UserStoreService],
	bootstrap: [AppComponent],
})
export class AppModule {}
