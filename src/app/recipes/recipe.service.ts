import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Boxty',
            'Boxty (Irish: bacstaí) is a traditional Irish potato pancake.',
            'https://upload.wikimedia.org/wikipedia/commons/2/2a/Boxty_with_beef_and_squash.jpg',
            [
                new Ingredient('Potatoes', 6),
                new Ingredient('Onions', 2)
            ]),
        new Recipe(
            'Irish Stew',
            'Irish stew (Irish: stobhach/Stobhach Gaelach) is a lamb (or mutton) and root vegetable stew native to Ireland.',
            'https://upload.wikimedia.org/wikipedia/commons/4/42/Irish_stew_2007.jpg',
            [
                new Ingredient('Lamb', 1),
                new Ingredient('Carrots', 6)
            ])
      ];

      constructor(private slService: ShoppingListService) {}

      getRecipes() {
          return this.recipes.slice();
      }

      getRecipe(index: number) {
          return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }
}
