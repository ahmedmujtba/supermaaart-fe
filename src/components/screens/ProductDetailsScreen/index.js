import {
  Text,
  View,
  Image,
  Button,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { getProductDetails } from "../../../api/services/products";
import { styles } from "./Style";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalScreen from "../ModalScreen";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryVoronoiContainer,
} from "victory-native";

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
  const [signedUser, setSignedUser] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const getProductDetailsFn = async (itemId) => {
    const response = await getProductDetails(itemId);

    const priceDates = [];
    response.data.priceHistory.map((item) => {
      priceDates.push({
        updateDate: item.updateDate,
        price: parseFloat(item.price),
      });
    });

    console.log(priceDates);
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
      <Button title="Add" onPress={addItemtoList} />
      <View>
        <VictoryChart
          containerComponent={<VictoryVoronoiContainer />}
          width={300}
          theme={VictoryTheme.material}
        >
          <VictoryBar data={data} x="day" y="price" />
        </VictoryChart>
      </View>
    </ScrollView>
  );
}
