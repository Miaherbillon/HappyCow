import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function Fvaoris2() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState();
  const isFocused = useIsFocused();
  useEffect(() => {
    const fav = async () => {
      const response = await axios.get("http://localhost:4001/favoris");
      //   console.log(response.data);
      setData(response.data);
      setLoading(false);
    };

    const info = async () => {
      const information = await axios.get("http://localhost:4001/favoris/id");
      console.log(information);
      setInfo(information);
    };
    isFocused && fav() && info();
  }, [isFocused]);

  return loading ? (
    <Text>Loading ... </Text>
  ) : (
    <View style={styles.page}>
      <Text style={styles.title}>Mes Favoris</Text>
      <View style={styles.container}>
        {data.map((favoris, index) => {
          console.log(favoris);
          return (
            <Text key={index} style={styles.nameFav}>
              {favoris}
            </Text>
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
