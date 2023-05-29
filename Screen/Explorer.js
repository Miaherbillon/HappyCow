import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Restaurant from "../assets/restaurants.json";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Explorer() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [vegan, setVegan] = useState(false);
  const [vegetarien, setVegetarien] = useState(false);
  const [optveg, setOptveg] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const { coords } = await Location.getCurrentPositionAsync();
        setLatitude(coords.latitude);
        setLongitude(coords.longitude);
        setOptveg(true);
        setVegan(true);
        setVegetarien(true);
        setIsLoading(false);
      } else {
        alert("permission refusée");
      }
    };
    getPermission();
  });

  return isLoading ? (
    <Text>Loading ...</Text>
  ) : (
    <View>
      <View style={styles.header}>
        <FontAwesome name="map-marker" size={30} color="white" />
        <Text style={styles.title}>Happy Cow</Text>
      </View>
      <View style={styles.legende}>
        <Text style={styles.filterTitle}>Selectionne un filtre :</Text>
        <View style={styles.filter}>
          <TouchableOpacity>
            <Text
              onPress={() => {
                setVegetarien(false);
                setOptveg(false);
              }}
            >
              Végan
              <Image
                source={require("../assets/vegan.svg")}
                alt="logo"
                style={styles.logo}
              />
              {/* <FontAwesome5 name="map-marker-alt" size={24} color="green" /> */}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setVegan(false);
              setOptveg(false);
            }}
          >
            <Text>
              Végétarien
              <FontAwesome5 name="map-marker-alt" size={24} color="blue" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setVegan(false);
              setVegetarien(false);
            }}
          >
            <Text>
              Option Végétarien
              <FontAwesome5 name="map-marker-alt" size={24} color="red" />
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            setVegan(true);
            setVegetarien(true);
            setOptveg(true);
          }}
        >
          <Text>Tout afficher</Text>
        </TouchableOpacity>
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
          if (item.type === "vegan" && vegan) {
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
          } else if (item.type === "vegetarian" && vegetarien) {
            return (
              <Marker
                key={item.placeId}
                pinColor="blue"
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
          } else if (item.type === "veg-options" && optveg) {
            return (
              <Marker
                key={item.placeId}
                pinColor="red"
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
  map: { width: "100%", height: "70%" },
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
  legende: {
    height: 110,
    padding: 10,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: "rgb(159, 137, 191)",
    margin: 5,
  },
  filterTitle: { fontSize: 15, marginBottom: 10 },
  filter: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    marginBottom: 17,
  },
  logo: { width: 5, height: 5 },
});
