import { Recipe } from './recipe.model';

export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is just a test', 'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg'),
        new Recipe('Another Test Recipe', 'This is just a test', 'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg')
      ];

      getRecipes() {
          return this.recipes.slice();
      }
}
