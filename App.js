import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";

import Home from "./container/Home";
import Favories from "./container/Favories";
import Restaurant from "./container/Restaurant";
import CardRestaurant from "./container/CardRestaurant";
import Explorer from "./container/Explorer";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        ></Stack.Screen>
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
                component={Restaurant}
                options={{
                  headerShown: false,
                  title: "les Restaurants",
                  tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="restaurant" size={24} color="black" />
                  ),
                }}
              ></Tab.Screen>
              <Tab.Screen
                name="Favories"
                component={Favories}
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
              ></Tab.Screen>
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
  );
}
