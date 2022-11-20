import { Text, View, Image, Button, Alert, Modal } from "react-native";
import { useEffect, useState } from "react";
import { getProductDetails } from "../../../api/services/products";
import { styles } from "./Style";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalScreen from "../ModalScreen";

export default function ProductDetails({ route, navigation }) {
  const { itemName, itemId } = route.params;
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signedUser, setSignedUser] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const getProductDetailsFn = async (itemId) => {
    const response = await getProductDetails(itemId);
    console.log("data", response.data);
    if (response.status === 200) {
      setProduct(response.data);
      setLoading(false);
    } else {
      setError(response.data);
      setLoading(false);
    }
  };

  const checkSignedUser = async () => {
    try {
      const userName = await AsyncStorage.getItem("username");
      if (userName != null) {
        setSignedUser(userName);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addItemtoList = () => {
    console.log("add item to the list");
    if (signedUser === "") {
      navigation.navigate("LoginPage");
    }
    console.log("add to list");
  };
  useEffect(() => {
    setLoading(true);
    checkSignedUser();
    getProductDetailsFn(itemId);
  }, []);
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.pictureLink }} style={styles.logo} />
      <Text>{product.name}</Text>
      <Text>{product.description}</Text>
      <Text>{product.price}</Text>
      <Text>{product.supermarket}</Text>
      <Button title="Add" onPress={addItemtoList} />
    </View>
  );
}
