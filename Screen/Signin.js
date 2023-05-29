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
import axios from "axios";
import { response } from "express";

export default function Signin({ setToken, navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async () => {
    const response = await axios.post("http://localhost:4001/user/login", {
      email: email,
      password: password,
    });
    if (response.data.token) {
      const userToken = response.data.token;
      setToken(userToken);
      alert("Connexion");
    } else {
      alert("La connexion a échoué");
    }
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
        <Text>Mail:</Text>
        <TextInput
          placeholder="Jean Paul @ Jean Paul"
          value={email}
          onChangeText={(email) => {
            setEmail(email);
          }}
        />
        <Text>Mot de passe:</Text>
        <TextInput
          placeholder="azerty"
          secureTextEntry={true}
          value={password}
          onChangeText={(password) => {
            setPassword(password);
          }}
        />

        <TouchableOpacity title="Sign in" onPress={submit}>
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
    backgroundColor: "rgb(31, 173, 158)",
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
