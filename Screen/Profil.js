import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Profil({ setToken, navigation }) {
  console.log(setToken);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon profile</Text>
      <TouchableOpacity
        onPress={() => {
          const userToken = null;
          setToken(userToken);
          navigation.navigate("Home");
        }}
      >
        <Text>Deconnexion</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { padding: 50 },
  title: { marginTop: 20, fontSize: 30, textAlign: "center", color: "#50539F" },
});
