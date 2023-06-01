import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";

export default function CardRestaurant({ navigation, route, setToken }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [storageFavoris, setStorageFavoris] = useState([]);
  const isFocused = useIsFocused();
  const [color, setColor] = useState(true);
  const [token, setnewToken] = useState(null);

  // console.log(setToken);

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

    const fav = async () => {
      const response = await axios.get("http://localhost:4001/favoris");
      setStorageFavoris(response.data);
      setnewToken(setToken);
      console.log(response.data);
    };

    isFocused && getPermission() && fav();
  }, [isFocused, color]);

  const coords = [
    {
      id: 1,
      latitude: route.params.elem.location.lat,
      longitude: route.params.elem.location.lng,
      title: route.params.elem.name,
    },
  ];
  const handleFavoritePress = async (e) => {
    if (storageFavoris.includes(route.params.elem.name)) {
      const data = route.params.elem.name;
      const response = await axios.delete("http://localhost:4001/favoris", {
        data: {
          name: data,
        },
      });
      setColor(!color);
    } else {
      e.preventDefault();
      const data = route.params.elem.name;
      const info = route.params.elem;

      try {
        const response = await axios.post("http://localhost:4001/favoris", {
          name: data,
          token: token,
          info: info,
        });
        setColor(!color);
        // console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return Loading ? (
    <Text>Loading ... </Text>
  ) : (
    //Icone haut de page //

    <ScrollView vertical>
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

              <TouchableOpacity
                key={route.params.elem.placeID}
                onPress={handleFavoritePress}
              >
                <View>
                  {storageFavoris.includes(route.params.elem.name) ? (
                    <AntDesign name="star" size={24} color="yellow" />
                  ) : (
                    <AntDesign name="star" size={24} color="black" />
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Entypo name="share" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          {/* // Images // */}

          <ScrollView horizontal>
            <View style={styles.images}>
              {route.params.elem.pictures.map((images, index) => {
                return (
                  <Image
                    key={index}
                    source={{ uri: images }}
                    style={styles.image}
                  />
                );
              })}
            </View>
          </ScrollView>

          {/* Titre et type */}

          <View style={styles.boxTitle}>
            <View style={styles.title}>
              <Text style={styles.name}>{route.params.elem.name}</Text>
              <Text style={styles.type}>
                <Entypo name="leaf" size={24} color="black" />{" "}
                {route.params.elem.type}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.info}>
          <View style={styles.infoBox}>
            <TouchableOpacity onPress={() => alert(route.params.elem.phone)}>
              <Text style={styles.coordinate}>Telephone</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                alert(route.params.elem.website);
              }}
            >
              <Text style={styles.coordinate}>Site internet</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Text style={styles.coordinate}>laisser un avis</Text>
              {modalVisible && (
                <Modal
                  style={styles.containerModal}
                  animationType="slide"
                  transparent={true}
                  //   visible={modalVisible}
                >
                  <Text>ok</Text>
                </Modal>
              )}
            </TouchableOpacity>
          </View>
          <Text>{route.params.elem.description}</Text>
        </View>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 48.856614,
            longitude: 2.3522219,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
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
    </ScrollView>
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
    width: 150,
    height: 150,
    borderRadius: 5,
  },
  title: { margin: 20, gap: 10 },
  name: { fontSize: 20 },
  type: { fontSize: 20 },
  images: {
    flexDirection: "row",
    gap: 5,
    marginTop: 20,
  },
  info: { gap: 20, marginHorizontal: 20, marginVertical: 20 },
  map: {
    height: "25%",
    width: "100%",
  },
  infoBox: { flexDirection: "row", gap: 10, justifyContent: "center" },
  coordinate: {
    fontSize: 20,
    borderWidth: 1,
    padding: 5,
    borderColor: "grey",
    color: "grey",
    borderRadius: 15,
  },
  containerModal: { marginTop: 200 },
});
