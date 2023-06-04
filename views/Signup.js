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

export default function SignupScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [mail, setMail] = useState("");
  const [alias, setAlias] = useState("");

  const [nombre, setNombre] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");

  const [isAvailable, setIsAvailable] = useState(false);

  const [isSuccessfull, setIsSuccessfull] = useState(false);

  const { login } = useContext(AuthContext);

  async function handleSignup() {
    try {
      if (alias === "" || mail === "") {
        Alert.alert(
          "Completa los campos",
          "Por favor, completa todos los campos"
        );
        return;
      }
      const usuario = await fetch(
        `http://192.168.0.173:3000/api/usuarios/getByEmail/${mail}`
      );
      const dataUsuario = await usuario.json();

      if (dataUsuario.msg) {
        const nickname = await fetch(
          `http://192.168.0.173:3000/api/usuarios/getByNickname/${alias}`
        );
        const dataNickname = await nickname.json();
        if (dataNickname.msg) {
          setIsAvailable(true);
        } else {
          Alert.alert("Error", "El Alias ya existe! prueba con otro.");
        }
      } else {
        Alert.alert(
          "Error",
          "El mail que ingresaste ya esta registado. Prueba recuperar tu contraseña."
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleFinishSignup() {
    try {
      const userData = {
        mail,
        nickname: alias,
        habilitado: "Si",
        nombre,
        avatar,
        tipo_usuario: "Alumno",
      };

      const response = await fetch(`http://192.168.0.173:3000/api/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const result = await response.json();
      if (result.msg) {
        const res = await fetch(
          `http://192.168.0.173:3000/api/usuarios/getByEmail/${mail}`
        );
        const usuarioGrabado = await res.json();

        const resUsrPwd = await fetch(
          `http://192.168.0.173:3000/api/usuarios/${usuarioGrabado.idUsuario}/setPassword`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password }),
          }
        );

        const usrPwd = await resUsrPwd.json();
        if (!usrPwd.msg) {
          setIsAvailable(false);
          setIsSuccessfull(true);
        }
      }
    } catch (error) {}
  }

  if (isSuccessfull) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#5DB075",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StatusBar style="auto" />
        {/* <Text style={styles.title}>Bienvenido!</Text> */}
        <View
          style={{
            backgroundColor: "#fff",
            width: 300,
            height: 400,
            borderRadius: 15,
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 30 }}>Exito !</Text>
          <Text style={{ fontSize: 20 }}>Ya estas registrado 😁👍</Text>
          <Pressable
            style={{
              backgroundColor: "#EA5C2B",
              width: 250,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 20,
              borderRadius: 30,
            }}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={{ color: "#fff", fontSize: 17 }}>Continuar</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (isAvailable) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        {/* <Text style={styles.title}>Bienvenido!</Text> */}
        <View style={styles.inputsWrapper}>
          <TextInput
            defaultValue={nombre}
            style={styles.inputs}
            placeholder="Nombre"
            onChangeText={(text) => setNombre(text)}
          />
          <TextInput
            defaultValue={avatar}
            style={styles.inputs}
            placeholder="Avatar......"
            onChangeText={(text) => setAvatar(text)}
          />
          <View style={styles.inputs}>
            <TextInput
              defaultValue={password}
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
        <Pressable style={styles.button} onPress={handleFinishSignup}>
          <Text style={{ color: "#fff", fontSize: 17 }}>Continuar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <Text style={styles.title}>Bienvenido!</Text> */}
      <View style={styles.inputsWrapper}>
        <TextInput
          defaultValue={alias}
          style={styles.inputs}
          placeholder="Alias"
          onChangeText={(text) => setAlias(text)}
          r
        />
        <View style={styles.inputs}>
          <TextInput
            placeholder="Email"
            onChangeText={(text) => setMail(text)}
          />
        </View>
      </View>
      <Pressable style={styles.button} onPress={() => handleSignup()}>
        <Text style={{ color: "#fff", fontSize: 17 }}>Continuar</Text>
      </Pressable>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={{ color: "#ea5c2f" }}>Ya estoy registrado</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Reset Password")}>
        <Text style={{ color: "#ea5c2f" }}>Recuperar contraseña</Text>
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
