import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PhotoDialogComponent } from './modules/photo-dialog';
import { MatDialog } from '@angular/material/dialog';
import { UserAuthService } from './shared';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent {
	constructor(private dialog: MatDialog, private authSerive: UserAuthService) {}

	async signOut(): Promise<void> {
		return await this.authSerive.signOut();
	}

	get isAuthenticated(): boolean {
		return this.authSerive.isAuthenticated;
	}

	openDialog(): void {
		let dialogRef = this.dialog.open(PhotoDialogComponent, {
			width: '500px',
			data: FormGroup,
		});

		dialogRef.afterClosed().subscribe((form: FormGroup) => {});
	}
}
