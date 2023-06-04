import * as React from "react";
import AppNav from "./navigation/AppNav";

import { AuthContext, AuthProvider } from "./context/AuthContext";


export default function App() {

  return (
    <AuthProvider>
      <AppNav/>
    </AuthProvider>
  );
}
