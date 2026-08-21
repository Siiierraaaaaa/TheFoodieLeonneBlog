import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit, OnDestroy {

  quotes = [
    'Good food brings people together.',
    'Life is too short for boring food.',
    'A good meal is always worth sharing.',
    'Food tastes better when it is made with love.',
    'There is always room for something delicious.'
  ];

  currentQuoteIndex = 0;

  private quoteInterval: any;


  ngOnInit() {

    this.quoteInterval = setInterval(() => {

      this.currentQuoteIndex =
        (this.currentQuoteIndex + 1) %
        this.quotes.length;

    }, 5000);

  }


  ngOnDestroy() {

    if (this.quoteInterval) {

      clearInterval(this.quoteInterval);

    }

  }

}