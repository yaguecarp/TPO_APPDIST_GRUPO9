import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TextInput,
  Image,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";

export default function HomeScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchRecipe, setSearchRecipe] = useState([]);

  async function fetchRecipes() {
    const res = await fetch(`http://192.168.0.173:3000/api/recetas`);
    const data = await res.json();
    setRecipes(data);
    setLoading(false);
  }

  async function buscarRecetaPorNombre(receta) {
    setSearchText(receta);
    const res = await fetch(
      `http://192.168.0.173:3000/api/recetas/getByName/${receta}`
    );
    const data = await res.json();
    setSearchRecipe(data);
  }
  console.log(searchText);
  console.log(searchRecipe);

  useEffect(() => {
    fetchRecipes();
  }, []);

  // console.log(recipes[0].foto)

  // const imagenURL = `http://192.168.0.173:3000/imagen-receta-1.jpg`

  const renderRecipeItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.recipeContainer}
        onPress={() =>
          navigation.navigate("Receta", {
            idReceta: item.idReceta,
            idUsuario: item.idUsuario,
          })
        }
      >
        <Image
          width={100}
          source={{ uri: `http://192.168.0.173:3000/${item.foto}.jpg` }}
          style={styles.recipeImage}
        />
        <View style={styles.recipeInfo}>
          <Text style={styles.recipeTitle}>{item.nombre}</Text>
          <Text style={styles.recipeDescription} numberOfLines={5}>{item.descripcion}</Text>
        </View>
        <Text style={styles.postedAgo}>1hr</Text>
      </TouchableOpacity>
    );
  };

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Inicio</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar receta..."
          value={searchText}
          onChangeText={(receta) => buscarRecetaPorNombre(receta)}
        />
      </View>
      {searchText.length > 0 && searchRecipe.length === 0 ? (
        <View>
          <Text style={{ marginTop: 5, fontSize: 17, marginBottom: 10 }}>
            Resultados de busqueda:
          </Text>
          <Text>No se han encontrado resultados</Text>
        </View>
      ) : (
        <>
          {searchRecipe.length > 0 ? (
            <View>
              <Text style={{ marginTop: 5, fontSize: 17, marginBottom: 10 }}>
                Resultados de busqueda:{" "}
              </Text>

              {searchRecipe.map((receta) => (
                <TouchableOpacity
                  style={styles.recetasBusqueda}
                  o
                  onPress={() =>
                    navigation.navigate("Receta", {
                      idReceta: receta.idReceta,
                      idUsuario: receta.idUsuario,
                    })
                  }
                >
                  <Image
                    width={100}
                    source={{
                      uri: `http://192.168.0.173:3000/${receta.foto}.jpg`,
                    }}
                    style={styles.recipeImageBusqueda}
                  />
                  <View style={{width: '70%'}}>
                    <Text style={styles.recetaBusquedaItem}>
                      {receta.nombre}
                    </Text>
                    <Text style={styles.recetaBusquedaDescripcion} numberOfLines={3}>
                      {receta.descripcion}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <>
              {loading ? (
                <Text>Cargando recetas...</Text>
              ) : (
                <>
                  <FlatList
                    data={recipes}
                    // keyExtractor={(item) => item.idReceta.toString()}
                    keyExtractor={(item) => item.idReceta}
                    renderItem={renderRecipeItem}
                    ItemSeparatorComponent={renderSeparator}
                    style={styles.recipeList}
                  />
                </>
              )}
            </>
          )}
        </>
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  searchContainer: {
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
  },
  recipeList: {
    marginTop: 10,
  },
  recipeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  recipeImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10
  },
  recipeInfo: {
    flex: 1,
  },
  recipeTitle: {
    fontWeight: "bold",
  },
  recipeDescription: {
    marginTop: 5,
  },
  postedAgo: {
    marginLeft: 10,
    color: "#999",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 5,
  },
  recetasBusqueda: {
    backgroundColor: "#FFF",
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  recetaBusquedaItem: {
    color: "#000",
    fontSize: 17,
    fontWeight: 600,
    
  },
  recetaBusquedaDescripcion: {
    fontSize: 13,

  },
  recipeImageBusqueda: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
});
