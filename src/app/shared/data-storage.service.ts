import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/Operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

// {providedIn: 'root'} is an alternative to adding it to providers in the app module
@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

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
            'https://ng-recipe-book-880f8.firebaseio.com/recipes.json',
          )
          .pipe(
            map(recipes => {
              return recipes.map(recipe => {
                return {
                  ...recipe,
                  ingredients: recipe.ingredients ? recipe.ingredients : []
                };
              });
            }),
            tap(recipes => {
              this.recipeService.setRecipes(recipes);
            })
          );
      }
    }
