import {MEALS} from '../data/dummy-data';
import { SET_FILTERS, TOOGLE_FAVOURITE } from './MealsAction';

const initialState = {
    meals: MEALS,
    filteredmeals :MEALS,
    favouritemeals: []
};

const mealReducer = (state = initialState, action)=>{
    switch ( action.type) {
        case TOOGLE_FAVOURITE:
            const existingIndex = state.favouritemeals.findIndex(meals=> meals.id === action.mealId);
            if (existingIndex >=0)
            {
                const updatedFav = [...state.favouritemeals];
                updatedFav.splice(existingIndex,1);
                return { ...state, favouritemeals:updatedFav};
            }
            else{
                const meal = state.meals.find(meal=>meal.id=== action.mealId);
                return {...state, favouritemeals: state.favouritemeals.concat(meal)};
            }
        case SET_FILTERS:
            const appliedFilters = action.filters;
            const updatedFilterMeals = state.meals.filter(
                meal=>{
                    if(appliedFilters.gluten && !meal.isGlutenFree){
                        return false;
                    }
                    if (appliedFilters.vegan && !meal.isVegan)
                    {
                        return false;
                    }
                    if( appliedFilters.veg && !meal.isVegetarian)
                    {
                        return false;
                    }
                    if(appliedFilters.lactose && !meal.isLactoseFree)
                    {
                        return false;
                    }
                    return true;
                }
            );
            return {...state, filteredmeals: updatedFilterMeals};
    
        default:
            return state;
    }
    return state;
}

export default mealReducer;