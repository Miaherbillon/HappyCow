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

// import { useNavigation } from "@react-navigation/native";

export default function Favories(extraData) {
  const [Favoris, setFavoris] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();
  // const navigation = useNavigation();
  console.log(extraData.extraData);

  useEffect(() => {
    const response = () => {
      setFavoris(extraData.extraData);
      setIsLoading(true);
    };
    isFocused && response();
  }, [isFocused]);

  return isLoading ? (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des favoris</Text>
      <View>
        {Favoris.map((elem) => {
          return (
            <TouchableOpacity>
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
  container: { marginTop: 100, gap: 10, marginBottom: 30 },
  title: { fontSize: 30, textAlign: "center" },
});
