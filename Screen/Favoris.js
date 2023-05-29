import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

import { useNavigation } from "@react-navigation/native";

export default function Favories(extraData) {
  const [Favoris, setFavoris] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [data, setData] = useState();
  console.log(extraData);

  useEffect(() => {
    const response = () => {
      setFavoris(extraData.extraData);
      setData(extraData);
      setIsLoading(true);
    };
    isFocused && response();
  }, [isFocused]);

  // console.log(data);

  return isLoading ? (
    <View style={styles.page}>
      <Text style={styles.title}>Liste des favoris</Text>
      <View style={styles.container}>
        {Favoris.map((elem, index) => {
          return (
            <TouchableOpacity
              key={index}
              // onPress={() => {
              //   navigation.navigate("CardRestaurant", { elem: data });
              // }}
            >
              <Text style={styles.nameFav}>{elem}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.clear();
        }}
      >
        <Text>tout supprimer</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des favoris</Text>
      <Text>Aucun favoris</Text>
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
