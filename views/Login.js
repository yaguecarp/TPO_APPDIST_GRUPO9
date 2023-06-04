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
  Alert,
} from "react-native";
// import { PasswordInput } from "../components/PasswordInput";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  async function handleLogin() {
    try {
      /* REMPLAZAR LOCALHOST:3000 POR DIRECCION IPv4 PERSONAL */
      const usuario = await fetch(
        `http://192.168.0.173:3000/api/usuarios/getByEmail/${mail}`
      );
      const dataUsuario = await usuario.json();

      if (dataUsuario.msg) {
        Alert.alert("Error", "No se ha encontrado el mail ingresado.");
        return;
      }

      const usuarioPassword = await fetch(
        `http://192.168.0.173:3000/api/usuarios/${dataUsuario.idUsuario}/getPassword`
      );
      const dataUsuarioPassword = await usuarioPassword.json();

      if (password === dataUsuarioPassword) {
        login(dataUsuario.idUsuario, password);
      } else {
        Alert.alert("Error", "El password es incorrecto.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <Text style={styles.title}>Bienvenido!</Text> */}
      <View style={styles.inputsWrapper}>
        <TextInput
          defaultValue={mail}
          style={styles.inputs}
          placeholder="Email"
          onChangeText={(text) => setMail(text)}
        />
        <View style={styles.inputs}>
          <TextInput
            secureTextEntry={!showPassword}
            placeholder="Contraseña"
            onChangeText={(text) => setPassword(text)}
          />
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
      <Pressable style={styles.button} onPress={() => handleLogin()}>
        <Text style={{ color: "#fff", fontSize: 17 }}>Ingresar</Text>
      </Pressable>
      <TouchableOpacity onPress={() => navigation.navigate("Reset Password")}>
        <Text style={{ color: "#ea5c2f" }}>Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={{ color: "#ea5c2f" }}>Registrarse</Text>
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
