import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";

const RecipeItem = ({ route, navigation }) => {
  const { idReceta, idUsuario } = route.params;
  const [recipe, setRecipe] = useState({});
  const [usuario, setUsuario] = useState('')
  const [isLoading, setIsLoading] = useState(true);

  async function fetchRecipe(id) {
    const res = await fetch(`http://192.168.0.173:3000/api/recetas/${id}`);
    const data = await res.json();
    setRecipe(data);
  }

  async function fetchUsuario(id){
    const res= await fetch(`http://192.168.0.173:3000/api/usuarios/${id}`)
    const data = await res.json();
    setUsuario(data)


  }

  useEffect(() => {
    // console.log(route.params);
    fetchRecipe(idReceta);
    fetchUsuario(idUsuario)
    setIsLoading(false);
  }, []);

  console.log(recipe)

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: `http://192.168.0.173:3000/${recipe.foto}.jpg`}} style={styles.recipeImage} />
      <View style={styles.detailsContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.title}>{recipe.nombre}</Text>
            <Text style={styles.author}>Autor: {usuario.nombre}</Text>
          </View>
          <TouchableOpacity style={styles.favoriteButton}>
            <Text style={styles.favoriteButtonText}>Fav</Text>
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 20, marginBottom: 5}}>Cantidad de porciones: {recipe.porciones}</Text>
        <Text style={{fontSize: 20, marginBottom: 10}}>Cantidad de personas: {recipe.cantidadPersonas}</Text>
        <Text style={styles.description}>{recipe.descripcion}</Text>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  recipeImage: {
    width: "100%",
    height: 200,
  },
  detailsContainer: {
    padding: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  leftContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  author: {
    marginTop: 5,
    fontSize: 17,
    color: "#999",
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF7F3F",
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
  },
});

export default RecipeItem;
