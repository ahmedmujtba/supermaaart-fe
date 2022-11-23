import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Icon from "react-native-vector-icons/FontAwesome";
import ProductStackScreen from "./ProductStackScreen";
import LoginPage from "./LoginPage";
import RegisterScreen from "./RegisterScreen";
import AccountStackScreen from "./AccountStackScreen";
import ProductsSaved from "../components/screens/ProductSaved";

const Tab = createBottomTabNavigator();

export default function Navbar() {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: "#0B3FF2",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "SupermAAART",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color="#3b5998" size={35} />
          ),
        }}
      />
      <Tab.Screen
        name="ProductStackScreen"
        component={ProductStackScreen}
        options={{
          title: "SupermAAART",
          tabBarLabel: "Products",
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-basket" color="#3b5998" size={35} />
          ),
        }}
      />
      <Tab.Screen
        name="Supermarkets"
        component={ProductsSaved}
        options={{
          title: "SupermAAART",
          tabBarLabel: "Favourites",
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" color="#3b5998" size={35} />
          ),
        }}
      />
      <Tab.Screen
        name="AccountStackScreen"
        component={AccountStackScreen}
        options={{
          title: "SupermAAART",
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color="#3b5998" size={35} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
