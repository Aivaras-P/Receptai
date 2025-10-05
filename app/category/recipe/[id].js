import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { recipes } from "../../data/recipes";

export default function RecipeDetails({ route }) {
  const { id } = route.params;


  let recipe;
  for (const cat in recipes) {
    const found = recipes[cat].find((r) => r.id === id);
    if (found) recipe = found;
  }

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [expanded, setExpanded] = useState(false);


const initialComments = {
  soup1: [
    { id: "s1", author: "Jonas", text: "Puikus receptas!" },
    { id: "s2", author: "Ona", text: "Man labai patiko." }
  ],
  dessert1: [
    { id: "d1", author: "Petras", text: "Lengva pagaminti." },
    { id: "d2", author: "Ana", text: "Skonis puikus." }
  ],
  main1: [
    { id: "m1", author: "Ąžuolas", text: "Tikrai rekomenduoju." },
    { id: "m2", author: "Miglė", text: "Labai skanu!" }
  ]
};

  useEffect(() => {
    loadComments();
  }, []);

const loadComments = async () => {
  try {
    const stored = await AsyncStorage.getItem(`comments-${id}`);
    if (stored) {
      setComments(JSON.parse(stored));
    } else {

      setComments(initialComments[id] || []);
    }
  } catch (e) {
    console.log("Error loading comments", e);
  }
};


  const saveComments = async (newComments) => {
    try {
      await AsyncStorage.setItem(`comments-${id}`, JSON.stringify(newComments));
      setComments(newComments);
    } catch (e) {
      console.log("Error saving comments", e);
    }
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    const updated = [
      ...comments,
      { id: Date.now().toString(), author: "Vartotojas", text: newComment },
    ];
    saveComments(updated);
    setNewComment("");
  };

  const deleteComment = (commentId) => {
    Alert.alert(
      "Ištrinti komentarą?",
      "Ar tikrai norite ištrinti šį komentarą?",
      [
        { text: "Atšaukti", style: "cancel" },
        {
          text: "Ištrinti",
          style: "destructive",
          onPress: () => {
            const updated = comments.filter((c) => c.id !== commentId);
            saveComments(updated);
          },
        },
      ]
    );
  };

  const deleteAllComments = () => {
    Alert.alert(
      "Ištrinti visus komentarus?",
      "Ar tikrai norite ištrinti visus komentarus šiam receptui?",
      [
        { text: "Atšaukti", style: "cancel" },
        {
          text: "Ištrinti",
          style: "destructive",
          onPress: () => {
            saveComments([]);
          },
        },
      ]
    );
  };

  if (!recipe) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Receptas nerastas.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        {recipe.title}
      </Text>

      <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 10 }}>Ingredientai:</Text>
      {recipe.ingredients.map((ing, i) => (
        <Text key={i}>• {ing}</Text>
      ))}

      <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 10 }}>Paruošimas:</Text>
      <Text>{recipe.instructions}</Text>


      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        style={{
          marginTop: 20,
          backgroundColor: "#e0f7fa",
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "600" }}>
          Komentarai ({comments.length}) {expanded ? "▲" : "▼"}
        </Text>
      </TouchableOpacity>

      {expanded && (
        <View style={{ marginTop: 10 }}>
          {comments.map((comment) => (
            <View
              key={comment.id}
              style={{
                marginBottom: 5,
                padding: 10,
                backgroundColor: "#f0f0f0",
                borderRadius: 8,
              }}
            >
              <Text style={{ fontWeight: "600" }}>{comment.author}:</Text>
              <Text>{comment.text}</Text>
              <TouchableOpacity onPress={() => deleteComment(comment.id)}>
                <Text style={{ color: "red", marginTop: 5 }}>Ištrinti</Text>
              </TouchableOpacity>
            </View>
          ))}

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <TextInput
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Rašykite komentarą..."
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 8,
                marginRight: 5,
              }}
            />
            <Button title="Pridėti" onPress={addComment} />
          </View>

          <View style={{ marginTop: 10 }}>
            <Button title="Ištrinti visus komentarus" color="red" onPress={deleteAllComments} />
          </View>
        </View>
      )}
    </ScrollView>
  );
}
