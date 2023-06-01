import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";

export default function Favoris2({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    const info = async () => {
      //toutes  les informations des restaurants enregistrer
      const information = await axios.get("http://localhost:4001/favoris/id");
      setInfo(information.data);
      setLoading(false);
    };

    isFocused && info();
  }, [isFocused]);

  return loading ? (
    <Text>Loading ... </Text>
  ) : (
    <View style={styles.page}>
      <Text style={styles.title}>Mes Favoris</Text>
      <View style={styles.container}>
        {info.map((favoris, index) => {
          return (
            <View>
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate("CardRestaurant", { elem: favoris[0] });
                }}
              >
                {console.log(favoris[0])}
                <Text style={styles.nameFav}>{favoris[0].name}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  page: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "rgb(152, 211, 204)",
  },
  container: {
    gap: 10,
    marginBottom: 30,
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    borderColor: "grey",
    backgroundColor: "white",
    color: "pink",
  },
  title: {
    marginTop: 70,
    fontSize: 40,
    textAlign: "center",
    marginBottom: 40,
    color: "black",
  },
  nameFav: { fontSize: 20, marginBottom: 5 },
});
