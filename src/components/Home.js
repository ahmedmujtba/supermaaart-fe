import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ImageBackground,
} from "react-native";
import { Link } from "@react-navigation/native";
import MyComponent from "./HomeCard";

export default function Home({ navigation }) {
  return (
    <View>
      <MyComponent navigation={navigation} />
    </View>
  );
}
