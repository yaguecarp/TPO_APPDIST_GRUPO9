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
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
// import { PasswordInput } from "../components/PasswordInput";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ResetPasswordScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);

  const [mail, setMail] = useState("");
  const [isMailOk, setIsMailOk] = useState(false);
  const [isCodeOk, setIsCodeOk] = useState(false);

  const [code, setCode] = useState("");

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  // PARA EL CODIGO DE CONFIRMACION
  const CELL_COUNT = 6;
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  async function handleResetPassword() {
    try {
      if (mail === "") {
        Alert.alert("Error", "No has ingresado el mail");
        return;
      }
      const response = await fetch(
        `http://192.168.0.173:3000/api/usuarios/getByEmail/${mail}`
      );
      const result = await response.json();
      if (result) {
        setIsMailOk(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleFinishResetPassword() {
    try {
      if (password === repeatPassword) {
        const response = await fetch(
          `http://192.168.0.173:3000/api/usuarios/getByEmail/${mail}`
        );
        const result = await response.json();

        if (result) {
          const newPwdResponse = await fetch(
            `http://192.168.0.173:3000/api/usuarios/${result.idUsuario}/updatePassword`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                idUsuario: result.idUsuario,
                newPassword: password,
              }),
            }
          );
          const newPwdResult = await newPwdResponse.json();
          console.log(newPwdResult);
          Alert.alert("Exito", "La contraseña fue generada con exito.");
          navigation.navigate("Login");
        }
      } else {
        Alert.alert("Las contraseñas no coinciden.");
      }
    } catch (error) {}
  }

  async function handleCode() {
    try {
      if (value === "123456") {
        setIsCodeOk(true);
      } else {
        Alert.alert("Codigo no aceptado");
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (isCodeOk) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        {/* <Text style={styles.title}>Bienvenido!</Text> */}
        <View style={styles.inputsWrapper}>
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
          <View style={styles.inputs}>
            <TextInput
              secureTextEntry={!showPassword}
              placeholder="Repetir"
              onChangeText={(text) => setRepeatPassword(text)}
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
        <Pressable
          style={styles.button}
          onPress={() => handleFinishResetPassword()}
        >
          <Text style={{ color: "#fff", fontSize: 17 }}>
            Confirmar Contraseña
          </Text>
        </Pressable>
      </View>
    );
  }

  if (isMailOk) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        {/* <Text style={styles.title}>Bienvenido!</Text> */}
        <View style={styles.inputsWrapper}>
          <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 10 }}>
            Ingresa el codigo que te enviamos a tu casilla de correo.
          </Text>
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
        <Text style={{ fontSize: 80 }}>👨🏻‍🍳</Text>
        <Pressable style={styles.button} onPress={() => handleCode()}>
          <Text style={{ color: "#fff", fontSize: 17 }}>
            Recuperar Contraseña
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <Text style={styles.title}>Bienvenido!</Text> */}
      <View style={styles.inputsWrapper}>
        <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 10 }}>
          Ingresa tu mail, te enviaremos un codigo de verificacion a tu casilla.
        </Text>
        <TextInput
          defaultValue={mail}
          style={styles.inputs}
          placeholder="Email"
          onChangeText={(text) => setMail(text)}
        />
      </View>
      <Text style={{ fontSize: 80 }}>👨🏻‍🍳</Text>
      <Pressable style={styles.button} onPress={() => handleResetPassword()}>
        <Text style={{ color: "#fff", fontSize: 17 }}>
          Recuperar Contraseña
        </Text>
      </Pressable>
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
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#00000030",
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
});
