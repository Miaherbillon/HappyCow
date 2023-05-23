import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAwareScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

export default function CardRestaurant({ navigation, route }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [Loading, setLoading] = useState(true);

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
  const coords = [
    {
      id: 1,
      latitude: route.params.elem.location.lat,
      longitude: route.params.elem.location.lng,
      title: route.params.elem.name,
    },
  ];
  return Loading ? (
    <View>
      <Text>Loading ... </Text>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.containerVert}>
        <View style={styles.containerHeader}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign name="caretleft" size={20} color="black" />
          </TouchableOpacity>
          <View style={styles.row}>
            <TouchableOpacity>
              <FontAwesome name="plane" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name="staro" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="share" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        {/* ---------------------- */}
        {/* ---------------------- */}

        <View style={styles.images}>
          {route.params.elem.pictures.map((images) => {
            return <Image source={{ uri: images }} style={styles.image} />;
          })}
        </View>
        <Text style={styles.title}>{route.params.elem.name}</Text>
        <Text>{route.params.elem.type}</Text>
      </View>
      <View style={styles.info}>
        <Text>{route.params.elem.description}</Text>
        <Text>{route.params.elem.phone}</Text>
      </View>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        showsUserLocation={true}
      >
        {coords.map((item) => {
          return (
            <Marker
              key={item.id}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              title={item.title}
            />
          );
        })}
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  containerVert: {
    backgroundColor: "rgb(31, 173, 158)",
    paddingVertical: 20,
    paddingTop: 50,
  },
  containerResto: { marginTop: 20 },
  row: { flexDirection: "row", gap: 20 },
  button: {
    fontSize: 20,
    color: "white",
    backgroundColor: "rgb(124, 73, 198)",
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlign: "center",
  },
  bloc: { alignItems: "center" },
  image: {
    width: 200,
    height: 200,
  },
  title: { fontSize: 20, marginTop: 20 },
  images: {
    flexDirection: "row",
    gap: 20,
    marginTop: 20,
  },
  info: { gap: 20, marginTop: 20 },
  map: {
    height: 200,
    width: "100%",
  },
});
