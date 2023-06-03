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
  Switch,
} from "react-native";
import { PasswordInput } from "../components/PasswordInput";
import { useState } from "react";

export default function LoginScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <Text style={styles.title}>Bienvenido!</Text> */}
      <View style={styles.inputsWrapper}>
        <TextInput style={styles.inputs} placeholder="Email" />
        <View style={styles.inputs}>
          <TextInput secureTextEntry={!showPassword} placeholder="Contraseña" />
          <TouchableOpacity
            onPress={() => {
              setShowPassword(!showPassword);
            }}
          >
            <Text style={{ fontSize: 10, color: "#ea5c2f" }}>
              {showPassword ? "OCULTAR" : "MOSTRAR"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{ fontSize: 80 }}>👨🏻‍🍳</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={{ color: "#fff", fontSize: 17 }}>Ingresar</Text>
      </Pressable>
      <TouchableOpacity>
        <Text style={{ color: "#ea5c2f" }}>Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
    </View>
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
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#EA5C2B",
    width: 350,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    borderRadius: 30,
  },
});
