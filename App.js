import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Home from "./container/Home";
import Favoris from "./container/Favoris";
import Restaurant from "./container/Restaurant";
import CardRestaurant from "./container/CardRestaurant";
import Explorer from "./container/Explorer";
import { useState, useEffect } from "react";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const [isLoading, setIsLoading] = useState(false);
  const [storageFavoris, setStorageFavoris] = useState();

  useEffect(() => {
    const storage = async () => {
      const response = await AsyncStorage.getAllKeys();
      // console.log(response);
      setStorageFavoris(response);
    };
    setIsLoading(true);
    storage();
  }, [storageFavoris]);
  // console.log(storageFavoris);
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
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
}
