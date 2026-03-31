import { Routes } from '@angular/router';
import { Login } from './login/login';

export const routes: Routes = [
    { path: '', redirectTo: 'auth-v1', pathMatch: 'full' },
    { path: 'auth-v1', component: Login, data: { animation: 'LoginPage' } },
    { path: 'reset-init-7a2', loadComponent: () => import('./forgot-password/forgot-password').then(m => m.ForgotPassword), data: { animation: 'ForgotPage' } },
    { path: 'v-secure-9b1', loadComponent: () => import('./otp-verification/otp-verification').then(m => m.OtpVerification), data: { animation: 'OtpPage' } },
    { path: 'upd-cred-3f4', loadComponent: () => import('./change-password/change-password').then(m => m.ChangePassword), data: { animation: 'ChangePage' } },
    { path: 'reg-new-8d2', loadComponent: () => import('./register/register').then(m => m.Register), data: { animation: 'RegisterPage' } },
    { path: 'root-home-v2b', loadComponent: () => import('./root-dashboard/root-dashboard').then(m => m.RootDashboard), data: { animation: 'DashboardPage' } },
    { path: 'edit-profile-v7y', loadComponent: () => import('./edit-profile/edit-profile').then(m => m.EditProfile), data: { animation: 'EditProfilePage' } },
    { path: 'secure-upd-v4k', loadComponent: () => import('./in-home-change-password/in-home-change-password').then(m => m.InHomeChangePassword), data: { animation: 'InHomeChangePasswordPage' } },
    { path: 'new-domain-v8x', loadComponent: () => import('./create-domain/create-domain').then(m => m.CreateDomain), data: { animation: 'CreateDomainPage' } },
    { path: 'domain-explorer-v9z', loadComponent: () => import('./domain-list/domain-list').then(m => m.DomainList), data: { animation: 'DomainListPage' } },
    { path: 'view-domain-k2m', loadComponent: () => import('./view-domain/view-domain').then(m => m.ViewDomain), data: { animation: 'ViewDomainPage' } },
    { path: 'reg-iam-f3n', loadComponent: () => import('./create-iam-user/create-iam-user').then(m => m.CreateIamUser), data: { animation: 'CreateIamUserPage' } },
    { path: 'view-iam-z5x', loadComponent: () => import('./view-iam-users/view-iam-users').then(m => m.ViewIamUsers), data: { animation: 'ViewIamUsersPage' } },
    { path: 'edit-iam-c4k', loadComponent: () => import('./edit-iam-user/edit-iam-user').then(m => m.EditIamUser), data: { animation: 'EditIamUserPage' } },
    { path: 'queries-v5t', loadComponent: () => import('./view-queries/view-queries').then(m => m.ViewQueries), data: { animation: 'QueriesPage' } },
    { path: 'post-announcement-v2x', loadComponent: () => import('./post-announcement/post-announcement').then(m => m.PostAnnouncement), data: { animation: 'PostAnnouncementPage' } },
    { path: 'create-announcement-n3y', loadComponent: () => import('./create-announcement/create-announcement').then(m => m.CreateAnnouncement), data: { animation: 'CreateAnnouncementPage' } },
    { path: 'edit-announcement-m5z', loadComponent: () => import('./edit-announcement/edit-announcement').then(m => m.EditAnnouncement), data: { animation: 'EditAnnouncementPage' } },
    { path: 'iam-user-home-v1x', loadComponent: () => import('./iam-user-home/iam-user-home').then(m => m.IamUserHome), data: { animation: 'IamUserHomePage' } }
];
