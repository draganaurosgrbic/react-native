import React, { useEffect, useState } from "react";
import { NavigationStackProp } from "react-navigation-stack";
import { useDispatch, useSelector } from "react-redux";
import { loadPlaces } from "../store/actions/places";
import { RootReducer } from "../store/root-reducer";
import { FlatList } from "react-native";
import PlaceItem from "../components/PlaceItem";

const PlacesScreen = (props: {
  navigation: NavigationStackProp;
}): JSX.Element => {
  const places = useSelector((state) => (state as RootReducer).places.places);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    fetchPlaces()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch]);

  const fetchPlaces = async () => {
    await dispatch(loadPlaces());
  };

  return (
    <FlatList
      onRefresh={fetchPlaces}
      refreshing={loading}
      data={places}
      keyExtractor={(place) => place.id.toString()}
      renderItem={(itemData) => (
        <PlaceItem place={itemData.item} navigation={props.navigation} />
      )}
    />
  );
};

export default PlacesScreen;
