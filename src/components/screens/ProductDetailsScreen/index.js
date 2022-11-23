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
  const [priceTrend, setPriceTrend] = useState({});

  const getProductDetailsFn = async (itemId) => {
    const response = await getProductDetails(itemId);

    const priceDates = [];
    const prices = [];
    let currentMonth = "";
    response.data.priceHistory.forEach((item) => {
      let price = item.price;

      let updateDate = item.updateDate.split(" ")[1];
      currentMonth = item.updateDate.split(" ")[0];
      prices.push(price);
      priceDates.push({
        updateDate: updateDate,
        price: parseFloat(price),
      });
    });
    let averagePrice = 0;
    const currentPrice = priceDates[priceDates.length - 1].price;
    const oldestPrice = priceDates[priceDates.length - 7].price;

    priceDates.map((date) => {
      averagePrice += date.price;
    });

    averagePrice = (averagePrice / priceDates.length).toFixed(2);
    const percentage =
      (((oldestPrice - currentPrice) / oldestPrice) * 100).toFixed(0) * -1;

    const priceChange = {
      priceChange: percentage,
      averagePrice: parseFloat(averagePrice),
    };

    setPriceLabels(prices);
    setMonth(currentMonth);
    setPriceTrend(priceChange);
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
      <Text>{`Price Change (week): ${priceTrend.priceChange}% `}</Text>
      <Text>{`Average Price: £${priceTrend.averagePrice}`}</Text>
      <Button title="Add" onPress={addItemtoList} />
      <Text>Recent Prices:</Text>
      <View style={styles.chartContainer}>
        <VictoryChart
          domainPadding={{ x: 20 }}
          containerComponent={<VictoryVoronoiContainer />}
          width={380}
          theme={VictoryTheme.material}
          maxDomain={{ y: parseFloat(product.price) + 1 }}
          minDomain={{ y: parseFloat(product.price) - 1 }}
        >
          <VictoryLegend
            orientation="horizontal"
            x={70}
            y={5}
            data={[
              { name: "Below Average", symbol: { fill: "green" } },
              { name: "Above Average", symbol: { fill: "red" } },
            ]}
          />
          <VictoryAxis
            label={`Month: ${month}`}
            axisLabelComponent={<VictoryLabel dy={25} />}
          />
          <VictoryAxis
            dependentAxis
            label={"Price (£)"}
            axisLabelComponent={<VictoryLabel dy={-25} />}
          />
          <VictoryBar
            data={priceHistory}
            labels={priceLabels}
            x="updateDate"
            y="price"
            style={{
              data: {
                fill: ({ datum }) =>
                  datum.price <= priceTrend.averagePrice ? "green" : "red",
              },
            }}
          ></VictoryBar>
        </VictoryChart>
      </View>
    </ScrollView>
  );
}
