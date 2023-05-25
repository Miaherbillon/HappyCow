import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Favories() {
  const [Favoris, setFavoris] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const response = async () => {
      const Favoris = await AsyncStorage.getItem("Favoris");
      setFavoris(Favoris);
      setIsLoading(false);
    };
    response();
  }, []);

  return isLoading ? (
    <View style={styles.container}>
      <Text>Loading ...</Text>
    </View>
  ) : (
    <View style={styles.container}>
      <Text>{Favoris}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { marginTop: 200 },
});
