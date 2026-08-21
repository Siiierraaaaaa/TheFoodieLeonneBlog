import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Admin } from './pages/admin/admin';
import { About } from './pages/about/about';
import { RecipeReviews } from './pages/recipe-reviews/recipe-reviews';

import { authGuard } from './auth-guard';

export const routes: Routes = [

  {
    path: '',
    component: Home
  },

  {
    path: 'about',
    component: About
  },

  {
    path: 'recipes-reviews',
    component: RecipeReviews
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'admin',
    component: Admin,
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: ''
  }

];