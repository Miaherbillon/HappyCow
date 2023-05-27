import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Signin({ setToken, navigation }) {
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const userToken = "secret-token";
    setToken(userToken);
    navigation.navigate("Restaurant");
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.boxImage}>
        <Image
          source={require("../assets/logo.png")}
          alt="logo"
          style={styles.logo}
        />
        <Text style={styles.title}>Connecte-toi !</Text>
      </View>
      <View style={styles.box}>
        <Text>Prénom:</Text>
        <TextInput
          placeholder="Jean Paul"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <Text>Mot de passe:</Text>
        <TextInput
          placeholder="azerty"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity title="Sign in" onPress={handleSignIn}>
          <Text style={styles.buttonCo}>Connexion</Text>
        </TouchableOpacity>
      </View>
      <Text>Pas encore de compte ?</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Signup");
        }}
      >
        <Text>Inscription</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    padding: 30,
    backgroundColor: "rgb(152, 211, 204)",
  },
  box: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  title: { textAlign: "center", fontSize: 30 },
  logo: { width: 150, height: 150 },
  boxImage: { alignItems: "center", margin: 30 },
  buttonCo: {
    width: 200,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
  },
});
