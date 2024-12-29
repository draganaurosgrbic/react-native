import { Place } from "../../models/place";
import {
  AddPlaceAction,
  ADD_PLACE,
  SetPlacesAction,
  SET_PLACES,
} from "../actions/places";

export interface PlacesState {
  places: Place[];
}

const initialState = {
  places: [],
};

export const placesReducer = (
  state: PlacesState = initialState,
  action: { type: string }
): PlacesState => {
  if (action.type === ADD_PLACE) {
    return {
      ...state,
      places: [...state.places, (action as AddPlaceAction).place],
    };
  } else if (action.type === SET_PLACES) {
    return {
      ...state,
      places: (action as SetPlacesAction).places,
    };
  }
  return state;
};
