import { View, StyleSheet, Image, Button, Text } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        alt="logo"
        style={styles.logo}
      />
      <Button
        title="ici"
        onPress={() => {
          navigation.navigate("Restaurant");
        }}
      />
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
});
