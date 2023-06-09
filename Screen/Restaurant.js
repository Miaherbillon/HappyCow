import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Resto from "../assets/restaurants.json";
import { FontAwesome } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

export default function Restaurant({ navigation, setToken }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(false);
  const [search, setSearch] = useState();
  const [type, setType] = useState();
  const [storageFavoris, setStorageFavoris] = useState();
  const isFocused = useIsFocused();
  const [restaurants, setRestaurants] = useState();
  const [numb, setNumb] = useState(5);
  const [favoris, setFavoris] = useState();
  // console.log(setToken);
  useEffect(() => {
    const fav = async () => {
      const response = await axios.get("http://localhost:4001/favoris");

      setFavoris(response.data);
    };
    setLoading(false);

    isFocused && fav();
  }, [isFocused, numb]);
  console.log(favoris);
  return loading ? (
    <Text style={styles.loading}>Laoding ... </Text>
  ) : (
    <View>
      <View style={styles.search}>
        <Header />
        <TextInput
          style={{
            width: 300,
            height: 30,
            textAlign: "center",
            borderRadius: 5,
            backgroundColor: "white",
            marginBottom: 10,
          }}
          placeholder="Search"
          onChangeText={(text) => {
            setSearch(text);
          }}
          value={search}
        ></TextInput>
      </View>

      <View style={styles.displayMenu}>
        <TouchableOpacity
          onPress={() => {
            if (filter === false) {
              setFilter(true);
              setType("vegan");
            } else {
              setFilter(false);
              setType("");
            }
          }}
        >
          <View style={styles.menu}>
            <Text>Végan</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (filter === false) {
              setFilter(true);
              setType("vegetarian");
            } else {
              setFilter(false);
              setType("");
            }
          }}
        >
          <View style={styles.menu}>
            <Text>Végétarien</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (filter === false) {
              setFilter(true);
              setType("veg-options");
            } else {
              setFilter(false);
              setType("");
            }
          }}
        >
          <View style={styles.menu}>
            <Text>Option</Text>
            <Text>Végétarien</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setFilter(false);
          }}
        >
          <View style={styles.menu}>
            <Text>Enlever les</Text>
            <Text>Filtres</Text>
          </View>
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView
        onScroll={() => {
          setNumb(numb + 5);
        }}
      >
        <View style={styles.container}>
          {Resto.slice(0, numb).map((elem) => {
            // console.log(elem.name);
            if (
              elem.name.includes(search) ||
              elem.type.includes(search) ||
              !search
            ) {
              if (elem.type === type || filter === false) {
                return (
                  elem.description && (
                    <TouchableOpacity
                      key={elem.placeId}
                      style={styles.RestaurantBox}
                      onPress={() =>
                        navigation.navigate("CardRestaurant", {
                          elem: elem,
                        })
                      }
                    >
                      <View style={styles.display}>
                        <View key={elem.placeId}>
                          <Image
                            source={{ uri: elem.thumbnail }}
                            style={styles.image}
                          />
                        </View>

                        <View>
                          <View style={styles.flex}>
                            <Text style={styles.title}>{elem.name}</Text>
                            {favoris && (
                              <View>
                                {favoris.includes(elem.name) ? (
                                  <FontAwesome
                                    name="heart"
                                    size={15}
                                    color="red"
                                  />
                                ) : null}
                              </View>
                            )}
                          </View>

                          <Text style={styles.address}>{elem.address}</Text>
                          <Text style={styles.description} numberOfLines={3}>
                            {elem.description}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                );
              }
            }
          })}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    marginTop: 200,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    textAlign: "center",
    gap: 5,
  },
  search: { backgroundColor: "rgb(124, 73, 198)", alignItems: "center" },
  displayMenu: {
    flexDirection: "row",
    gap: 3,
    marginHorizontal: "10%",
    marginVertical: "1%",
    justifyContent: "center",
  },
  menu: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgb(226, 226, 226)",
    height: 50,
    padding: 5,
    width: 85,
    alignItems: "center",
    justifyContent: "center",
  },
  display: { flexDirection: "row", gap: 20 },
  title: { fontSize: 12, marginBottom: 10, fontWeight: "bold" },
  description: { width: 200, marginTop: 5, fontSize: 10 },
  address: { fontSize: 10, width: 200, fontWeight: "bold" },
  RestaurantBox: {
    borderColor: "rgb(216, 216, 216)",
    borderRadius: 5,
    borderWidth: 1,
    width: "100%",
    padding: 5,
    gap: 5,
  },
  image: {
    width: 100,
    height: 90,
  },
  flex: { flexDirection: "row", justifyContent: "space-between" },
});
