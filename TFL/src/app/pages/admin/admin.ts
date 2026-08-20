import { Component, afterNextRender, ChangeDetectorRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Supabase } from '../../supabase';

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
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {

  private supabase = inject(Supabase);
  private cdr = inject(ChangeDetectorRef);

  posts: Post[] = [];
  loadingPosts = true;

  totalPosts = 0;
  totalRecipes = 0;
  totalReviews = 0;

  showPostForm = false;
  editingPostId: number | null = null;

  title = '';
  description = '';
  category = '';
  type = '';
  image_url = '';
  rating: number | null = null;

  successMessage = '';
  errorMessage = '';
  loading = false;

  constructor() {
    // afterNextRender only ever runs in the browser, after the first
    // render — so this naturally avoids SSR issues (Supabase's session
    // relies on localStorage, which doesn't exist on the server).
    afterNextRender(() => {
      this.loadPosts();
    });
  }

  async loadPosts() {
    try {
      const data = await this.supabase.getPosts();
      this.posts = data || [];
      this.totalPosts = this.posts.length;
      this.totalRecipes = this.posts.filter(
        post => post.type === 'Recipe'
      ).length;
      this.totalReviews = this.posts.filter(
        post => post.type === 'Review'
      ).length;
      console.log('Foodie Leonne posts:', this.posts);
    } catch (error: any) {
      console.error('Error loading posts:', error);
      this.errorMessage = error.message;
    } finally {
      this.loadingPosts = false;
      // afterNextRender runs outside Angular's zone, so async work
      // started inside it won't automatically trigger change detection.
      // This forces Angular to re-check the view once data arrives.
      this.cdr.markForCheck();
    }
  }

  openPostForm() {
    this.showPostForm = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  closePostForm() {
    this.showPostForm = false;
    this.title = '';
    this.description = '';
    this.category = '';
    this.type = '';
    this.image_url = '';
    this.rating = null;
    this.successMessage = '';
    this.errorMessage = '';
  }

  async createPost() {
  this.loading = true;
  this.successMessage = '';
  this.errorMessage = '';

  try {
    const postData = {
      title: this.title,
      description: this.description,
      category: this.category,
      type: this.type,
      image_url: this.image_url || null,
      rating: this.rating
    };

    if (this.editingPostId !== null) {

      await this.supabase.updatePost(
        this.editingPostId,
        postData
      );

      this.successMessage = 'Post updated successfully!';

    } else {

      await this.supabase.createPost(postData);

      this.successMessage = 'Post published successfully!';

    }

    await this.loadPosts();

    this.title = '';
    this.description = '';
    this.category = '';
    this.type = '';
    this.image_url = '';
    this.rating = null;
    this.editingPostId = null;

  } catch (error: any) {
    console.error('Error saving post:', error);
    this.errorMessage = error.message;

  } finally {
    this.loading = false;
    this.cdr.markForCheck();
  }
}
editPost(post: Post) {
  this.editingPostId = post.id;

  this.title = post.title;
  this.description = post.description;
  this.category = post.category;
  this.type = post.type;
  this.image_url = post.image_url || '';
  this.rating = post.rating;

  this.showPostForm = true;

  this.successMessage = '';
  this.errorMessage = '';
}
  async deletePost(id: number) {
    const confirmed = confirm('Are you sure you want to delete this post?');
    if (!confirmed) {
      return;
    }

    try {
      await this.supabase.deletePost(id);
      await this.loadPosts();
      this.successMessage = 'Post deleted successfully!';
    } catch (error: any) {
      console.error('Error deleting post:', error);
      this.errorMessage = error.message;
    }
  }
}