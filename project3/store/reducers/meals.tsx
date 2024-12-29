import { MEALS } from "../../data/dummy-data";
import { Meal } from "../../model/meal";
import {
  SetFiltersAction,
  SET_FILTERS,
  ToggleFavouriteAction,
  TOGGLE_FAVOURITE,
} from "../actions/meals";

export interface MealsState {
  meals: Meal[];
  filteredMeals: Meal[];
  favouriteMeals: Meal[];
}

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favouriteMeals: [] as Meal[],
};

const mealsReducer = (
  state: MealsState = initialState,
  action: { type: string }
): MealsState => {
  if (action.type === TOGGLE_FAVOURITE) {
    const mealId = (action as ToggleFavouriteAction).mealId;
    const meal = state.favouriteMeals.find((meal) => meal.id === mealId);
    if (meal) {
      return {
        ...state,
        ...{
          favouriteMeals: state.favouriteMeals.filter(
            (meal) => meal.id !== mealId
          ),
        },
      };
    } else {
      return {
        ...state,
        ...{
          favouriteMeals: [
            ...state.favouriteMeals,
            state.meals.find((meal) => meal.id === mealId) as Meal,
          ],
        },
      };
    }
  } else if (action.type === SET_FILTERS) {
    const filters = (action as SetFiltersAction).filters;
    return {
      ...state,
      ...{
        filteredMeals: state.meals.filter((meal) => {
          if (filters.isVegan && !meal.isVegan) {
            return false;
          }
          if (filters.isVegetarian && !meal.isVegetarian) {
            return false;
          }
          if (filters.isGlutenFree && !meal.isGlutenFree) {
            return false;
          }
          if (filters.isLactoseFree && !meal.isLactoseFree) {
            return false;
          }
          return true;
        }),
      },
    };
  }
  return state;
};

export default mealsReducer;
