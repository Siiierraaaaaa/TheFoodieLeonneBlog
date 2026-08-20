import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Admin } from './pages/admin/admin';
import { authGuard } from './auth-guard';

export const routes: Routes = [
     {
    path: 'login',
    component: Login
  },
   {
    path: 'admin',
    component: Admin,
    canActivate: [authGuard]
  },
    {path: '', component:Home}
];
