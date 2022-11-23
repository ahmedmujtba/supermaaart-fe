import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Navbar from "./src/components/Navbar";
import UserContext from "./src/context/UserContext";
import ProductContext from "./src/context/ProductContext";

export default function App() {
  const [signedUser, setSignedUser] = useState("");
  const [savedProducts, setSavedProducts] = useState([]);
  return (
    <UserContext.Provider value={{ signedUser, setSignedUser }}>
      <ProductContext.Provider value={{ savedProducts, setSavedProducts }}>
        <NavigationContainer>
          <Navbar />
        </NavigationContainer>
      </ProductContext.Provider>
    </UserContext.Provider>
  );
}
