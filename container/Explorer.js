import { View, Text, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Restaurant from "../assets/restaurants.json";

export default function Explorer() {
  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 48.856614,
        longitude: 2.3522219,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      // showsUserLocation={true}
    >
      {Restaurant.map((item) => {
        //   console.log(item.id);
        return (
          <Marker
            key={item.placeId}
            coordinate={{
              latitude: item.location.lat,
              longitude: item.location.lng,
            }}
            //   title={item.title}
          />
        );
      })}
    </MapView>
  );
}
const styles = StyleSheet.create({
  map: { width: "100%", height: "100%" },
});
