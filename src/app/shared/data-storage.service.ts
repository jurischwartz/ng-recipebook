import {Injectable} from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import 'rxjs/add/operator/map';
import {AuthService} from '../auth/auth.service';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

  storeRecipes() {
    // const headers = new HttpHeaders().set('Authorization', 'Bearer jhasdhsdhs');
    return this.httpClient.put('https://ng-recipe-book-4271a.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
      observe: 'body',
      // use Interceptors!
      // params: new HttpParams().set('auth', token)
      // headers: headers
    });
  }

  fetchRecipes() {
    return this.httpClient.get<Recipe[]>('https://ng-recipe-book-4271a.firebaseio.com/recipes.json')
      .map(
        (recipes) => {
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
