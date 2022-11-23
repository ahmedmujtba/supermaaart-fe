import {
  Text,
  View,
  Image,
  Button,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import {
  getProductDetails,
  saveFavoriteItem,
} from "../../../api/services/products";
import { styles } from "./Style";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalScreen from "../ModalScreen";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import UserContext from "../../../context/UserContext";
import ProductContext from "../../../context/ProductContext";

const data = [
  { day: 1, price: 1 },
  { day: 2, price: 1.4 },
  { day: 3, price: 1.35 },
  { day: 4, price: 1.2 },
  { day: 5, price: 1.2 },
  { day: 6, price: 1.2 },
  { day: 7, price: 1.2 },
];

export default function ProductDetails({ route, navigation }) {
  const { itemName, itemId } = route.params;
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { signedUser, setSignedUser } = useContext(UserContext);
  const [otherSupermarkets, setOtherSupermarkets] = useState([]);
  const { savedProducts, setSavedProducts } = useContext(ProductContext);

  const getProductDetailsFn = async (itemId) => {
    const response = await getProductDetails(itemId);
    console.log("data", response.data);
    if (response.data && response.data.otherSupermarkets) {
      console.log("others market data", response.data.otherSupermarkets);
      for (const [key, val] of Object.entries(
        response.data.otherSupermarkets
      )) {
        setOtherSupermarkets((prevItem) => {
          return [...prevItem, { brand: key, price: val }];
        });
      }
    }
    if (response.status === 200) {
      setProduct(response.data);
      setLoading(false);
    } else {
      setError(response.data);
      setLoading(false);
    }
  };

  const addItemtoList = async () => {
    console.log("add item to the list--user--", signedUser);
    if (signedUser === "") {
      navigation.navigate("LoginPage", {
        goto: "Product Details",
        itemName,
        itemId,
      });
    } else {
      const response = await saveFavoriteItem({
        username: signedUser,
        name: product.name,
        price: product.price,
        pictureLink: product.pictureLink,
        supermarket: product.supermarket,
      });
      console.log("response from server for saving", response);

      if (response.status === 201) {
        setSavedProducts((prevProducts) => [...prevProducts, response.data]);
        Alert.alert("Product", "Product Added", [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ]);
      } else {
        setError(response.data);
        setLoading(false);
      }
    }
    console.log("add to list");
  };
  useEffect(() => {
    setLoading(true);
    getProductDetailsFn(itemId);
  }, []);

  //Render views

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.pictureLink }} style={styles.logo} />
      <Text>{product.name}</Text>
      <Text>{product.description}</Text>
      <Text>{product.price}</Text>
      <Text
        style={[
          styles.title,
          { textTransform: "capitalize" },
          { fontWeight: "bold" },
        ]}
      >
        {product.supermarket}
      </Text>
      {otherSupermarkets.length > 0 && (
        <View>
          <Text>Other Supermarket prices</Text>
          {otherSupermarkets.map((superMarket) => {
            return (
              <View>
                <Text>{superMarket.brand}</Text>
                <Text>{superMarket.price}</Text>
              </View>
            );
          })}
        </View>
      )}
      <Button title="Add" onPress={addItemtoList} />
      <View>
        <VictoryChart width={300} theme={VictoryTheme.material}>
          <VictoryBar data={data} x="day" y="price" />
        </VictoryChart>
      </View>
    </ScrollView>
  );
}
