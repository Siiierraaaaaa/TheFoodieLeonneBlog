import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Supabase {

  private client: SupabaseClient;

  constructor() {
    this.client = createClient(
      environment.supabaseUrl,
      environment.supabasePublishableKey
    );
  }

  // LOGIN
  async signIn(email: string, password: string) {
    const { data, error } = await this.client.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw error;
    }

    return data;
  }

  async getSession() {
    return await this.client.auth.getSession();
  }

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return this.client.auth.onAuthStateChange(callback);
  }

  // GET ALL POSTS
  async getPosts() {
    console.log('GET POSTS: function called');

    const { data, error } = await this.client
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    console.log('GET POSTS: data:', data);
    console.log('GET POSTS: error:', error);

    if (error) {
      throw error;
    }

    return data;
  }

  // CREATE A POST
  async createPost(post: {
    title: string;
    description: string;
    category: string;
    type: string;
    image_url: string | null;
    rating: number | null;
  }) {
    const { data, error } = await this.client
      .from('posts')
      .insert(post)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  // UPDATE A POST
  async updatePost(id: number, post: {
    title: string;
    description: string;
    category: string;
    type: string;
    image_url: string | null;
    rating: number | null;
  }) {
    const { data, error } = await this.client
      .from('posts')
      .update(post)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  // DELETE A POST
  async deletePost(id: number) {
    const { error } = await this.client
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return true;
  }
}