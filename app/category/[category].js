import React from "react";
import { View, FlatList, Text } from "react-native";
import { recipes } from "../data/recipes";
import RecipeCard from "../components/RecipeCard";

export default function CategoryScreen({ route, navigation }) {
  const { category } = route.params;
  const data = recipes[category] || [];

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 12 }}>
        {category === "soups" ? "Sriubos" : category === "desserts" ? "Desertai" : "Pagrindiniai patiekalai"}
      </Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecipeCard
            id={item.id}
            title={item.title}
            category={category}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
}
