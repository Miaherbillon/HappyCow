import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        alt="logo"
        style={styles.logo}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Restaurant");
        }}
      >
        <Text style={styles.tap}>Entrer</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: { width: 250, height: 250 },
  tap: { fontSize: 20, color: "white", fontWeight: "bold" },
});
