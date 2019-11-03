import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipeSelected =  new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'Boxty',
            'This is just a test',
            'https://upload.wikimedia.org/wikipedia/commons/2/2a/Boxty_with_beef_and_squash.jpg',
            [
                new Ingredient('Potatoes', 6),
                new Ingredient('Onions', 2)
            ]),
        new Recipe(
            'Irish Stew',
            'This is just a test',
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
          return this.recipes.slice()[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
      }
}
