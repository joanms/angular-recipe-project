import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/Operators';
import { Store } from '@ngrx/store';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import * as fromApp from '../store/app.reducer';
import * as RecipesAction from '../recipes/store/recipe.actions';

// {providedIn: 'root'} is an alternative to adding it to providers in the app module
@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(
      private http: HttpClient,
      private recipeService: RecipeService,
      private store: Store<fromApp.AppState>
    ) {}

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
              // this.recipeService.setRecipes(recipes);
              this.store.dispatch(new RecipesAction.SetRecipes(recipes));
            })
          );
      }
    }
