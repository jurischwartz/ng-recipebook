import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs/Subject';

export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Tasty Schnitzel',
      'A super tasty Schnitzel - just awesome!',
      'https://photos.bigoven.com/recipe/hero/main---wiener-schnitzel-8f03d26e1f0f2601215a7029.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Big Fat Burger',
      'What else you need to say?',
      'http://static.feber.se/article_images/29/99/57/299957_1920.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.fireRecipeChangeEvent();
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.fireRecipeChangeEvent();
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.fireRecipeChangeEvent();
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.fireRecipeChangeEvent();
  }

  private fireRecipeChangeEvent() {
    this.recipeChanged.next(this.recipes.slice());
  }
}
