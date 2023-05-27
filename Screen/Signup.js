import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async () => {
    if (password === confirmPassword) {
      if (email && username && description && password && confirmPassword) {
        setErrorMessage("");
        try {
          const { data } = await axios.post(
            "http://localhost:4001/user/signup",
            {
              email,
              username,
              password,
            }
          );
          alert("Compte créé");
        } catch (error) {
          console.log(error.response);
          setErrorMessage("La création a échoué");
        }
      } else {
        setErrorMessage("Veuillez remplir tous les champs");
      }
    } else {
      setErrorMessage("Les mots de passe ne correspondent pas");
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
        <Text style={styles.title}>Inscris- toi !</Text>
      </View>

      <View style={styles.box}>
        <Text>Mail : </Text>
        <TextInput
          placeholder="mail@mail.fr"
          value={email}
          onChangeText={(text) => {
            setErrorMessage("");
            setEmail(text);
          }}
        />
        <Text>Prénom : </Text>
        <TextInput
          placeholder="Jean Paul"
          value={username}
          onChangeText={(text) => {
            setErrorMessage("");
            setUsername(text);
          }}
        />

        <Text>Mot de passe : </Text>
        <TextInput
          placeholder="azerty"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setErrorMessage("");
            setPassword(text);
          }}
        />
        <Text>Confirmation mot de passe : </Text>
        <TextInput
          placeholder="azerty"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => {
            setErrorMessage("");
            setConfirmPassword(text);
          }}
        />

        <TouchableOpacity onPress={submit} style={styles.buttonCo}>
          <Text style={styles.co}>Validé l'inscription</Text>
        </TouchableOpacity>

        {errorMessage !== "" && <Text>{errorMessage}</Text>}
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Signin");
        }}
      >
        <Text>Revenir à la page de connexion</Text>
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
    gap: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  title: { textAlign: "center", fontSize: 30 },
  logo: { width: 150, height: 150 },
  boxImage: { alignItems: "center", margin: 30, gap: 10 },
  buttonCo: {
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 20,
  },
});
