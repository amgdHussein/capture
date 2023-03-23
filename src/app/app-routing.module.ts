import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
	EmailVerificationComponent,
	ForgotPasswordComponent,
	FroalaEditorComponent,
	SignInComponent,
	SignUpComponent,
} from './components';
import { AuthenticationGuard, UnAuthenticationGuard } from './shared/guards';
import { DashboardComponent } from './modules';

const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{
		path: 'sign-in',
		component: SignInComponent,
		canActivate: [AuthenticationGuard],
	},
	{
		path: 'sign-up',
		component: SignUpComponent,
		canActivate: [AuthenticationGuard],
	},
	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [UnAuthenticationGuard],
	},
	{
		path: 'forgot-password',
		component: ForgotPasswordComponent,
		canActivate: [AuthenticationGuard],
	},
	{
		path: 'verify-email-address',
		component: EmailVerificationComponent,
		// canActivate: [EmailVerificationGuard],
	},
	{
		path: 'froala-editor',
		component: FroalaEditorComponent,
		canActivate: [UnAuthenticationGuard],
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			useHash: true,
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
