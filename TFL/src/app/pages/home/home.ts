import { Component, OnInit } from '@angular/core';
import { Supabase } from '../../supabase';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  constructor(private supabase: Supabase) {}

  async ngOnInit() {
    const posts = await this.supabase.getPosts();

    console.log('Foodie Leonne posts:', posts);
  }
}