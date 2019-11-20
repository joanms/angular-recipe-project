import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/Operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

// {providedIn: 'root'} is an alternative to adding it to providers in the app module
@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http
        .put(
            'https://ng-recipe-book-880f8.firebaseio.com/recipes.json',
            recipes
        )
        .subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes() {
        return this.http
        .get<Recipe[]>(
            'https://ng-recipe-book-880f8.firebaseio.com/recipes.json')
            /*
            The following code handles cases where a user inputs a recipe without ingredients.
            The instance of map on the next line of code is an rxjs operator
            and the one on the line after that is a JavaScript array method
            */
            .pipe(map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                });
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            })
        );
    }
}
