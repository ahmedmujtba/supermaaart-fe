import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Icon from "react-native-vector-icons/FontAwesome";
import Groceries from "./Groceries";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color="#900" size={35} />
          ),
        }}
      />
      <Tab.Screen
        name="Groceries"
        component={Groceries}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-basket" color="#900" size={35} />
          ),
        }}
      />
      <Tab.Screen
        name="Supermarkets"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-cart" color="#900" size={35} />
          ),
        }}
      />
      <Tab.Screen
        name="Shopping List"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="list" color="#900" size={35} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
