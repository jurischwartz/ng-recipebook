import {Component, OnInit} from '@angular/core';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeItem: Recipe;
  id: number;

  constructor(private shoppingListService: ShoppingListService,
              private recipeService: RecipeService,
              private rout: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.rout.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipeItem = this.recipeService.getRecipeById(this.id);
        }
      );
  }

  addToShoppingList() {
    this.shoppingListService.addIngredients(this.recipeItem.ingredients);
    this.router.navigate(['shopping-list']);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../recipes']);
  }
}
