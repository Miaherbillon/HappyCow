import { View, Text, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Restaurant from "../assets/restaurants.json";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

export default function Explorer() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    const getPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const { coords } = await Location.getCurrentPositionAsync();
        setLatitude(coords.latitude);
        setLongitude(coords.longitude);
        setIsLoading(false);
      } else {
        alert("permission refusée");
      }
    };
    getPermission();
  }, []);

  return isLoading ? (
    <View>
      <Text>Loading ...</Text>
    </View>
  ) : (
    <View>
      <View style={styles.header}>
        <FontAwesome name="map-marker" size={30} color="white" />
        <Text style={styles.title}>Happy Cow</Text>
      </View>

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
      >
        {Restaurant.map((item) => {
          if (item.type === "vegan") {
            return (
              <Marker
                key={item.placeId}
                pinColor="green"
                coordinate={{
                  latitude: item.location.lat,
                  longitude: item.location.lng,
                }}
                title={item.name}
                onPress={() => {
                  navigation.navigate("CardRestaurant", { elem: item });
                }}
              />
            );
          } else if (item.type === "vegetarian") {
            return (
              <Marker
                key={item.placeId}
                pinColor="aqua"
                coordinate={{
                  latitude: item.location.lat,
                  longitude: item.location.lng,
                }}
                title={item.name}
                onPress={() => {
                  navigation.navigate("CardRestaurant", { elem: item });
                }}
              />
            );
          } else if (item.type === "veg-options") {
            return (
              <Marker
                key={item.placeId}
                pinColor="purple"
                coordinate={{
                  latitude: item.location.lat,
                  longitude: item.location.lng,
                }}
                title={item.name}
                onPress={() => {
                  navigation.navigate("CardRestaurant", { elem: item });
                }}
              />
            );
          }
        })}
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  map: { width: "100%", height: "100%" },
  header: {
    height: 110,
    paddingTop: 40,
    backgroundColor: "rgb(124, 73, 198)",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 30, color: "white" },
});
