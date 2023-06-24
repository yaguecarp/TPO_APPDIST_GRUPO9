import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../views/Login";
import HomeScreen from "../views/Home";
import { AuthContext } from "../context/AuthContext";
import { View, ActivityIndicator } from "react-native";
import SignupScreen from "../views/Signup";
import ResetPasswordScreen from "../views/ResetPassword";
import RecipeItemScreen from "../views/Recipe"

const Stack = createNativeStackNavigator();

export default function AppNav() {
  const { isLoading, userToken } = React.useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken !== null ? (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            options={{ title: "Inicio" }}
            component={HomeScreen}
          />
          <Stack.Screen name="Receta" component={RecipeItemScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Reset Password" component={ResetPasswordScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
