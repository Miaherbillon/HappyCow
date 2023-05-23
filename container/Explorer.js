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
  const navigation = useNavigation();
  useEffect(() => {
    const getPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const { coords } = await Location.getCurrentPositionAsync();
        setLatitude(coords.latitude);
        setLongitude(coords.longitude);
        setLoading(false);
      } else {
        alert("permission refusée");
      }
    };
    getPermission();
  }, []);

  return (
    <View>
      <View style={styles.header}>
        <FontAwesome name="map-marker" size={30} color="white" />
        <Text style={styles.title}>Happy Cow</Text>
      </View>

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
      >
        {Restaurant.map((item) => {
          return (
            <Marker
              key={item.placeId}
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
