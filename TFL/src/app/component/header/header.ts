import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  private router = inject(Router);

  goHome() {
    this.router.navigate(['/']);
  }

  goAbout() {
    this.router.navigate(['/about']);
  }

  goRecipes() {
    this.router.navigate(['/recipes-reviews']);
  }

}