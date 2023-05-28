import { View, Text, StyleSheet } from "react-native";

export default function Profil() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon profile</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { padding: 50 },
  title: { marginTop: 20, fontSize: 30, textAlign: "center", color: "#50539F" },
});
