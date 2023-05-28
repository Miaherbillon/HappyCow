import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Home from "./Screen/Home";
import Favoris from "./Screen/Favoris";
import Restaurant from "./Screen/Restaurant";
import CardRestaurant from "./Screen/CardRestaurant";
import Explorer from "./Screen/Explorer";
import Signup from "./Screen/Signup";
import Signin from "./Screen/Signin";
import Profil from "./Screen/Profil";
import { useState, useEffect } from "react";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const [isLoading, setIsLoading] = useState(false);
  const [storageFavoris, setStorageFavoris] = useState();
  const [userToken, setUserToken] = useState(null);

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      setUserToken(userToken);
    };

    const storage = async () => {
      const response = await AsyncStorage.getAllKeys();
      // console.log(response);
      setStorageFavoris(response);
    };
    setIsLoading(true);
    storage() && bootstrapAsync();
  }, [storageFavoris]);

  return (
    isLoading && (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          >
            {/* {(props) => <Home {...props} extraData={storageFavoris} />} */}
          </Stack.Screen>
          <Stack.Screen
            name="CardRestaurant"
            component={CardRestaurant}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            setToken={setToken}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Signin"
            component={Signin}
            setToken={setToken}
            // options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen name="Restaurant" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator>
                <Tab.Screen
                  name="Resto"
                  options={{
                    headerShown: false,
                    title: "les Restaurants",
                    tabBarIcon: ({ color, size }) => (
                      <MaterialIcons
                        name="restaurant"
                        size={24}
                        color="black"
                      />
                    ),
                  }}
                >
                  {(props) => (
                    <Restaurant {...props} extraData={storageFavoris} />
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="Favoris"
                  // component={Favoris}
                  options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                      <MaterialIcons
                        name="favorite-border"
                        size={24}
                        color="black"
                      />
                    ),
                  }}
                >
                  {(props) => <Favoris {...props} extraData={storageFavoris} />}
                </Tab.Screen>
                <Tab.Screen
                  name="Explorer"
                  component={Explorer}
                  options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                      <Foundation name="map" size={24} color="black" />
                    ),
                  }}
                ></Tab.Screen>
                <Tab.Screen
                  name="Profil"
                  component={Profil}
                  options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                      <MaterialIcons name="tag-faces" size={24} color="black" />
                    ),
                  }}
                ></Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
}
