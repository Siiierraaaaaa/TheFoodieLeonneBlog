import {
  Component,
  OnDestroy,
  ChangeDetectorRef,
  afterNextRender,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Supabase } from '../../supabase';
import { Sidebar } from '../../component/sidebar/sidebar';

interface Post {
  id: number;
  created_at: string;
  title: string;
  description: string;
  category: string;
  type: string;
  image_url: string | null;
  rating: number | null;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    Sidebar
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnDestroy {

  private supabase = inject(Supabase);
  private cdr = inject(ChangeDetectorRef);

  featuredPosts: Post[] = [];
  currentPostIndex = 0;

  private carouselInterval: any;
  private destroyed = false;

  constructor() {
    // afterNextRender guarantees this only runs in the browser,
    // strictly after hydration has finished reconciling the SSR'd DOM.
    afterNextRender(() => {
      this.loadFeaturedPosts();
    });
  }

  async loadFeaturedPosts() {
    try {
      const posts = await this.supabase.getPosts();

      if (this.destroyed) {
        return;
      }

      console.log('Home featured posts:', posts);

      this.featuredPosts = (posts || []).slice(0, 5);

      console.log('Featured posts loaded:', this.featuredPosts);

      this.cdr.markForCheck();
      this.cdr.detectChanges();

      if (this.featuredPosts.length > 1) {
        this.startCarousel();
      }
    } catch (error) {
      console.error('Error loading featured posts:', error);
    }
  }

  private startCarousel() {
    this.carouselInterval = setInterval(() => {
      this.nextPost();
      if (!this.destroyed) {
        this.cdr.markForCheck();
      }
    }, 5000);
  }

  pauseCarousel() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
      this.carouselInterval = null;
    }
  }

  resumeCarousel() {
    if (this.featuredPosts.length > 1 && !this.carouselInterval) {
      this.startCarousel();
    }
  }

  nextPost() {
    if (!this.featuredPosts.length) {
      return;
    }

    this.currentPostIndex =
      (this.currentPostIndex + 1) % this.featuredPosts.length;
  }

  previousPost() {
    if (!this.featuredPosts.length) {
      return;
    }

    this.currentPostIndex =
      (this.currentPostIndex - 1 + this.featuredPosts.length) %
      this.featuredPosts.length;
  }

  ngOnDestroy() {
    this.destroyed = true;

    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }
}