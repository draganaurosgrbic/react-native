import { Filters } from "../../model/filters";

export const TOGGLE_FAVOURITE = "TOGGLE_FAVOURITE";
export const SET_FILTERS = "SET_FILTERS";

export interface ToggleFavouriteAction {
  type: typeof TOGGLE_FAVOURITE;
  mealId: string;
}

export interface SetFiltersAction {
  type: typeof SET_FILTERS;
  filters: Filters;
}

export const toggleFavourite = (mealId: string): ToggleFavouriteAction => {
  return {
    type: TOGGLE_FAVOURITE,
    mealId,
  };
};

export const setFilters = (filters: Filters): SetFiltersAction => {
  return {
    type: SET_FILTERS,
    filters,
  };
};
