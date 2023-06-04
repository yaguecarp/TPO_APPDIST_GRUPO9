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

import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function HomeScreen() {
  const { logout, userToken, userInfo } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>HOME PAGE!</Text>
        <Text>{userInfo.nickname}</Text>
        <Pressable style={styles.button} onPress={() => logout()}>
        <Text style={{ color: "#fff", fontSize: 17 }}>LOGOUT</Text>
      </Pressable>
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
  button: {
    backgroundColor: "#EA5C2B",
    width: 350,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    borderRadius: 30,
  },
});
