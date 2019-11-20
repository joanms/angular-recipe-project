import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
        this.http
        .get<Recipe[]>(
            'https://ng-recipe-book-880f8.firebaseio.com/recipes.json')
            .subscribe(recipes => {
                this.recipeService.setRecipes(recipes);
        });
    }
}
