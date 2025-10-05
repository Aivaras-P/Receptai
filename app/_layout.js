import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./index";
import CategoryScreen from "./category/[category]";
import RecipeDetails from "./category/recipe/[id]";

const Stack = createStackNavigator();

export default function AppLayout() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#e0f7fa" },
          headerTintColor: "#000",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Kategorijos" }} />
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} options={{ title: "Receptai" }} />
        <Stack.Screen name="RecipeDetails" component={RecipeDetails} options={{ title: "Recepto detalės" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

