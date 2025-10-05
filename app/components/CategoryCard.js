import { Pressable, Text } from "react-native";

export default function CategoryCard({ id, name, navigation }) {
  return (
    <Pressable
      onPress={() => navigation.navigate("CategoryScreen", { category: id })}
      style={{ padding: 16, backgroundColor: "#e0f7fa", marginBottom: 10, borderRadius: 12 }}
    >
      <Text style={{ fontSize: 18 }}>{name}</Text>
    </Pressable>
  );
}
