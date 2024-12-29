import axios from "axios";
import { documentDirectory, moveAsync } from "expo-file-system";
import { fetchPlaces, insertPlace } from "../../helpers/db";
import { Place } from "../../models/place";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export interface AddPlaceAction {
  type: typeof ADD_PLACE;
  place: Place;
}

export interface SetPlacesAction {
  type: typeof SET_PLACES;
  places: Place[];
}

export const addPlace = (place: Place) => {
  return async (dispatch: (action: AddPlaceAction) => void): Promise<void> => {
    const oldImage = place.image;
    place.image = `${documentDirectory}/${place.image.split("/").pop()}`;
    await moveAsync({
      from: oldImage,
      to: place.image,
    });
    place.address = (
      (
        await axios.get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${place.lat}&longitude=${place.lng}`
        )
      ).data as { city: string }
    ).city;
    place.id = (await insertPlace(place)).insertId;
    dispatch({
      type: ADD_PLACE,
      place,
    });
  };
};

export const loadPlaces = () => {
  return async (dispatch: (action: SetPlacesAction) => void): Promise<void> => {
    dispatch({
      type: SET_PLACES,
      places: ((await fetchPlaces()).rows as unknown as { _array: Place[] })
        ._array,
    });
  };
};
