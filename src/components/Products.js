import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Products({ route, navigation }) {
  console.log(route.params);

  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  if (error !== "") {
    return (
      <View>
        <Text>Error in fetching data</Text>
      </View>
    );
  }
  return (
    <View>
      <Text>Hello products page</Text>
    </View>
  );
}
