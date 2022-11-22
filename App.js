import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Navbar from "./src/components/Navbar";
import UserContext from "./src/context/UserContext";

export default function App() {
  const [signedUser, setSignedUser] = useState("");
  return (
    <UserContext.Provider value={{ signedUser, setSignedUser }}>
      <NavigationContainer>
        <Navbar />
      </NavigationContainer>
    </UserContext.Provider>
  );
}
