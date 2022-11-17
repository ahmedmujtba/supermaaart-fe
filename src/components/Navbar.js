import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Icon from "react-native-vector-icons/FontAwesome";
import ProductStackScreen from "./ProductStackScreen";

const Tab = createBottomTabNavigator();

export default function Navbar() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "SupermAAART",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color="#3b5998" size={35} />
          ),
        }}
      />
      <Tab.Screen
        name="Products"
        component={ProductStackScreen}
        options={{
          title: "Products",
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-basket" color="#3b5998" size={35} />
          ),
        }}
      />
      <Tab.Screen
        name="Supermarkets"
        component={Home}
        options={{
          title: "Cart",
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-cart" color="#3b5998" size={35} />
          ),
        }}
      />
      <Tab.Screen
        name="Shopping List"
        component={Home}
        options={{
          title: "List",
          tabBarIcon: ({ color, size }) => (
            <Icon name="list" color="#3b5998" size={35} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
