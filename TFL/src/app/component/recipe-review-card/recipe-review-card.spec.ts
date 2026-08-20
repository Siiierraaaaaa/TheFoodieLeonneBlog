import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeReviewCard } from './recipe-review-card';

describe('RecipeReviewCard', () => {
  let component: RecipeReviewCard;
  let fixture: ComponentFixture<RecipeReviewCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeReviewCard],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeReviewCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
