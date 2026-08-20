import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Supabase } from '../../supabase';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';
  errorMessage = '';
  loading = false;

constructor(
  private supabase: Supabase,
  private router: Router
) {}

  async login() {
    this.loading = true;
    this.errorMessage = '';

    try {
  await this.supabase.signIn(this.email, this.password);

  console.log('Login successful!');

  await this.router.navigate(['/admin']);

} catch (error: any) {
  this.errorMessage = error.message;
} finally {
  this.loading = false;
}}
}