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
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryLegend,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory-native";
import { defaultTheme } from "@rneui/base";

export default function ProductDetails({ route, navigation }) {
  const { itemName, itemId } = route.params;
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signedUser, setSignedUser] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [priceHistory, setPriceHistory] = useState([]);
  const [priceLabels, setPriceLabels] = useState([]);
  const [month, setMonth] = useState("");

  const getProductDetailsFn = async (itemId) => {
    const response = await getProductDetails(itemId);

    const priceDates = [];
    const prices = [];
    let currentMonth = "";
    response.data.priceHistory.map((item) => {
      let price = item.price;

      let updateDate = item.updateDate.split(" ")[1];
      currentMonth = item.updateDate.split(" ")[0];
      prices.push(price);
      priceDates.push({
        updateDate: updateDate,
        price: parseFloat(price),
      });
    });
    setPriceLabels(prices);
    setMonth(currentMonth);

    setPriceHistory(priceDates);
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
    priceOverTime();
  }, []);

  const priceOverTime = async () => {
    try {
      const currentPrice = priceHistory[priceHistory.length - 1].price;
      const oldestPrice = priceHistory[0].price;
      const priceChange = ((currentPrice - oldestPrice) * 100).toFixed(0);
      return priceChange;
    } catch (err) {
      console.log(err);
    }
  };
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
      <Text>{}</Text>
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
          domainPadding={{ x: 20 }}
          containerComponent={<VictoryVoronoiContainer />}
          width={380}
          theme={VictoryTheme.material}
          maxDomain={{ y: parseFloat(product.price) + 1 }}
          minDomain={{ y: parseFloat(product.price) - 1 }}
        >
          <VictoryAxis
            label={month}
            axisLabelComponent={<VictoryLabel dy={25} />}
          />
          <VictoryAxis
            dependentAxis
            label={"Price(£)"}
            axisLabelComponent={<VictoryLabel dy={-25} />}
          />
          <VictoryBar
            data={priceHistory}
            labels={priceLabels}
            x="updateDate"
            y="price"
          ></VictoryBar>
        </VictoryChart>
      </View>
    </ScrollView>
  );
}
