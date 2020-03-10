import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';
import { ShoppingListModule } from '../shopping-list.module';

const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                /*
                copy the state with the spread operator to pull out the
                existing ingredients and then add this new one to them
                */
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
    }
}