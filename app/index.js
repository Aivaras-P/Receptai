import React from "react";
import { View, Text, ScrollView } from "react-native";
import CategoryCard from "./components/CategoryCard";

export default function HomeScreen({ navigation }) {
  return (
        <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 20 }}>
        Sveiko maisto receptai
      </Text>
    <View style={{ flex: 1, padding: 1 }}>
      <CategoryCard id="soups" name="Sriubos" navigation={navigation} />
      <CategoryCard id="desserts" name="Desertai" navigation={navigation} />
      <CategoryCard id="main" name="Pagrindiniai patiekalai" navigation={navigation} />
    </View>
    </ScrollView>
  );
}
