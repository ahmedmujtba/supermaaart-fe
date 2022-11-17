import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Account from "./Account";
import LoginPage from "./LoginPage";
import RegisterScreen from "./RegisterScreen";

const AccountStack = createNativeStackNavigator();

export default function AccountStackScreen() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name="Account"
        component={Account}
        options={{ title: "Account" }}
      />
      <AccountStack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{ title: "Login" }}
      />
      <AccountStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ title: "Register" }}
      />
    </AccountStack.Navigator>
  );
}
