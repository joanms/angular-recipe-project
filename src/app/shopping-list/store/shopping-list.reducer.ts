import { Ingredient } from '../../shared/ingredient.model';
import { ADD_INGREDIENT } from './shopping-list.actions';
import { Action } from '@ngrx/store';

const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ]
};

export function shoppingListReducer(state = initialState, action: Action) {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                /*
                copy the state with the spread operator to pull out the
                existing ingredients and then add this new one to them
                */
                ...state,
                ingredients: [...state.ingredients, action]
            };
    }
}