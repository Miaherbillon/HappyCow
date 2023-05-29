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

export default function CardRestaurant({ navigation, route }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [storageFavoris, setStorageFavoris] = useState([]);
  const [color, setColor] = useState();
  const isFocused = useIsFocused();

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
    const fetchAsyncStorage = async () => {
      keys = await AsyncStorage.getItem("favoris");

      setStorageFavoris(keys);
      // console.log(keys);
    };

    isFocused && getPermission() && fetchAsyncStorage();
  }, [isFocused]);

  const coords = [
    {
      id: 1,
      latitude: route.params.elem.location.lat,
      longitude: route.params.elem.location.lng,
      title: route.params.elem.name,
    },
  ];
  const handleFavoritePress = async () => {
    if (storageFavoris.includes(route.params.elem.name)) {
      await AsyncStorage.removeItem(route.params.elem.name);
      setColor(false);
    } else {
      setColor(true);
      const newFavorites = [...storageFavoris, route.params.elem];
      await AsyncStorage.setItem("favoris", JSON.stringify(newFavorites));
    }
  };
  // console.log(storageFavoris);
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
                {storageFavoris.includes(route.params.elem.name) ? (
                  <AntDesign name="star" size={24} color="yellow" />
                ) : (
                  <AntDesign name="star" size={24} color="black" />
                )}
              </TouchableOpacity>
              <TouchableOpacity>
                <Entypo name="share" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          {/* // Images // */}

          <ScrollView horizontal>
            <View style={styles.images}>
              {route.params.elem.pictures.map((images) => {
                return <Image source={{ uri: images }} style={styles.image} />;
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
