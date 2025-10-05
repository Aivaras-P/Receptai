import { Pressable, Text } from "react-native";

export default function RecipeCard({ id, title, navigation, category }) {
  return (
    <Pressable
      onPress={() => navigation.navigate("RecipeDetails", { id, category })}
      style={{
        backgroundColor: "#fff3e0",
        padding: 14,
        borderRadius: 10,
        marginBottom: 10,
      }}
    >
      <Text style={{ fontSize: 18, color: "#000" }}>{title}</Text>
    </Pressable>
  );
}
