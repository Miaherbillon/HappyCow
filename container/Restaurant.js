import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

export default function Restaurant({ navigation }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fechData = async () => {
      const { data } = await axios.get(
        "https://res.cloudinary.com/lereacteur-apollo/raw/upload/v1575242111/10w-full-stack/Scraping/restaurants.json"
      );
      setData(data), setLoading(false);
    };
    fechData();
  }, []);
  return loading ? (
    <View>
      <Text style={styles.loading}>Laoding ... </Text>
    </View>
  ) : (
    <KeyboardAwareScrollView>
      <Header />
      <View style={styles.displayMenu}>
        <TouchableOpacity>
          <Text style={styles.menu}>Végan</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.menu}>Végétarien</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.menu}>Option Végétarien</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.menu}>Filtre</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {data.map((elem, index) => {
          return (
            elem.description && (
              <TouchableOpacity
                key={elem.placeId}
                style={styles.RestaurantBox}
                onPress={() =>
                  navigation.navigate("CardRestaurant", { elem: elem })
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
                    <Text style={styles.title}>{elem.name}</Text>
                    <Text style={styles.description} numberOfLines={5}>
                      {elem.description}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          );
        })}
      </View>
    </KeyboardAwareScrollView>
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
  displayMenu: {
    flexDirection: "row",
    gap: 5,
    marginHorizontal: "10%",
    marginVertical: "2%",
    justifyContent: "center",
  },
  menu: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "grey",
    height: 50,
    padding: 10,
    flex: 1,
    textAlign: "center",
    fontSize: 12,
  },
  display: { flexDirection: "row", gap: 20 },
  title: { fontSize: 15, marginBottom: 10, fontWeight: "bold" },
  description: { width: 200 },
  RestaurantBox: {
    borderColor: "rgb(216, 216, 216)",
    borderRadius: 5,
    borderWidth: 1,
    width: "100%",
    padding: 10,
    gap: 10,
  },
  image: {
    width: 100,
    height: 110,
  },
});
