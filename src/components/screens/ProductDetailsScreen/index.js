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
const data = [
  { day: 1, price: 1, fill: "green" },
  { day: 2, price: 1.4, fill: "red" },
  { day: 3, price: 1.35, fill: "red" },
  { day: 4, price: 1.2, fill: "orange" },
  { day: 5, price: 1.2, fill: "orange" },
  { day: 6, price: 1.2, fill: "orange" },
  { day: 7, price: 1.2, fill: "orange" },
];

export default function ProductDetails({ route, navigation }) {
  const { itemName, itemId } = route.params;
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { signedUser, setSignedUser } = useContext(UserContext);
  const [otherSupermarkets, setOtherSupermarkets] = useState([]);
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
      if (response.status === 201) {
        Alert.alert("Product", "Product Added", [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ]);
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

      <Text>
        {product.description}
        {"\n"}
      </Text>
      <Text>
        {"£" + product.price}
        {"\n"}
      </Text>
      <Text
        style={[
          styles.title,
          { textTransform: "capitalize" },
          { fontWeight: "bold" },
        ]}
      >
        {product.supermarket} {"\n"}
      </Text>
      {otherSupermarkets.length > 0 && (
        <View>
          <Text>Other Supermarket prices: {"\n"}</Text>
          {otherSupermarkets.map((superMarket) => {
            return (
              <View>
                <Text>
                  {superMarket.brand.charAt(0).toUpperCase() +
                    superMarket.brand.slice(1)}
                </Text>
                <Text style={{ color: "blue" }}>
                  {"£" + superMarket.price}
                  {"\n"}
                </Text>
              </View>
            );
          })}
        </View>
      )}
      <Button title="Add" onPress={addItemtoList} />
      <View>
        <VictoryChart width={300} theme={VictoryTheme.material}>
          <VictoryBar
            style={{
              data: {
                fill: ({ datum }) => datum.fill,
              },
            }}
            data={data}
            x="day"
            y="price"
          />
        </VictoryChart>
      </View>
    </ScrollView>
  );
}
