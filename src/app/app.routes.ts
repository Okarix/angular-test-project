import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { SearchComponent } from './features/search/search.component';
import { ProfileComponent } from './features/profile/profile.component';
import { LayoutComponent } from './core/layout/layout.component';
import { canActivateAuth } from './core/guards/access.guard';
import { SettingsComponent } from './features/settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: SearchComponent },
      { path: 'profile/:id', component: ProfileComponent },
      { path: 'settings', component: SettingsComponent },
    ],
    canActivate: [canActivateAuth],
  },
  { path: 'login', component: LoginComponent },
];
