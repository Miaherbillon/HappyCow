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

export default function Favories({ navigation }) {
  const [Favoris, setFavoris] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  let keys = [];

  useEffect(() => {
    const response = async () => {
      keys = await AsyncStorage.getAllKeys();
      fav = [];
      for (let i = 0; i < keys.length; i++) {
        values = await AsyncStorage.getItem(keys[i]);
        fav.push(values);
      }
      setFavoris(fav);
    };
    setIsLoading(false);
    isFocused && response();
  }, [isFocused, AsyncStorage]);

  return isLoading ? (
    <View style={styles.container}>
      <Text>Loading ...</Text>
    </View>
  ) : Favoris ? (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des favoris</Text>
      <View>
        {Favoris.map((elem) => {
          console.log(elem);
          return (
            <TouchableOpacity
            // onPress={async () => {
            //   navigation.navigate("CardRestaurant");
            // }}
            >
              <Text>{elem}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.clear();
          RefreshControl;
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
  container: { marginTop: 100, gap: 50 },
  title: { fontSize: 30, textAlign: "center" },
});
