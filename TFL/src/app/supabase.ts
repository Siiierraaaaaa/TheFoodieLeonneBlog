import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Supabase {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabasePublishableKey
    );
  }
  async getPosts() {
  const { data, error } = await this.supabase
    .from('posts')
    .select('*');

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return data;
}
async signIn(email: string, password: string) {
  const { data, error } = await this.supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    throw error;
  }

  return data;
}
async getSession() {
  return await this.supabase.auth.getSession();
}
async addPost(post: {
  title: string;
  description: string;
  category: string;
  type: string;
  image_url: string;
  rating: number | null;
}) {
  const { data, error } = await this.supabase
    .from('posts')
    .insert(post)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
}