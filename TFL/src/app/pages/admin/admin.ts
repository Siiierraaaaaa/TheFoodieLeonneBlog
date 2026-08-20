import { Component, OnInit } from '@angular/core';
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
export class Admin implements OnInit {

  posts: Post[] = [];

  showPostForm = false;

  title = '';
  description = '';
  category = '';
  type = '';
  image_url = '';
  rating: number | null = null;

  successMessage = '';
  errorMessage = '';
  loading = false;

  constructor(private supabase: Supabase) {}

  async ngOnInit() {
    await this.loadPosts();
  }

  async loadPosts() {
    try {
      const data = await this.supabase.getPosts();

      this.posts = data || [];

      console.log('Foodie Leonne posts:', this.posts);

    } catch (error: any) {
      console.error('Error loading posts:', error);
      this.errorMessage = error.message;
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

      await this.supabase.createPost({
        title: this.title,
        description: this.description,
        category: this.category,
        type: this.type,
        image_url: this.image_url || null,
        rating: this.rating
      });

      this.successMessage = 'Post published successfully!';

      await this.loadPosts();

      this.title = '';
      this.description = '';
      this.category = '';
      this.type = '';
      this.image_url = '';
      this.rating = null;

    } catch (error: any) {

      console.error('Error creating post:', error);
      this.errorMessage = error.message;

    } finally {

      this.loading = false;

    }
  }
}