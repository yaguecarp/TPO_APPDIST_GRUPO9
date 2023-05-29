import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Bienvenido!</Text>
        <View style={styles.inputsWrapper}>
          <TextInput style={styles.inputs} placeholder="Email" />
          <TextInput style={styles.inputs} placeholder="Contraseña" />
        </View>
        <Text style={{ fontSize: 80 }}>👨🏻‍🍳</Text>
        <Pressable style={styles.button} >
          <Text style={{color: '#fff', fontSize: 17}}>Ingresar</Text>
        </Pressable>
        <TouchableOpacity>
          <Text style={{color: '#ea5c2f'}}>Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  androidSafeArea: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
  title: {
    fontSize: 40,
  },
  inputsWrapper: {
    padding: 10,
    width: 350,
    gap: 10,
  },
  inputs: {
    backgroundColor: "#F6F6F6",
    color: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10
  },
  button:{
    backgroundColor: '#EA5C2B',
    width: 350,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 30,
  }
});
