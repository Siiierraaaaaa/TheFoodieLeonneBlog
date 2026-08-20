import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Supabase } from './supabase';

export const authGuard: CanActivateFn = async () => {
  const supabase = inject(Supabase);
  const router = inject(Router);

  const { data } = await supabase.getSession();

  if (data.session) {
    return true;
  }

  return router.createUrlTree(['/login']);
};