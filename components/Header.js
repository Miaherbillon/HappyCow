import { View, Text, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Happy Cow</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    height: 130,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    backgroundColor: "rgb(124, 73, 198)",
  },
  title: { fontSize: 40, color: "white" },
});
