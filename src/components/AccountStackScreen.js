import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Account from "./Account";
import Testpage2 from "./Testpage2";

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
        name="Testpage2"
        component={Testpage2}
        options={{ title: "TestPage2" }}
      />
    </AccountStack.Navigator>
  );
}
