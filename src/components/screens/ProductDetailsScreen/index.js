import {
  Text,
  View,
  Image,
  Button,
  Alert,
  ScrollView,
  ActivityIndicator,
  FlatList,
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
import UserContext from "../../../context/UserContext";
import ProductContext from "../../../context/ProductContext";
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
  const [modalVisible, setModalVisible] = useState(false);
  const { signedUser, setSignedUser } = useContext(UserContext);
  const [otherSupermarkets, setOtherSupermarkets] = useState([]);
  const { savedProducts, setSavedProducts } = useContext(ProductContext);
  const [priceHistory, setPriceHistory] = useState([]);
  const [priceLabels, setPriceLabels] = useState([]);
  const [month, setMonth] = useState("");
  const [priceTrend, setPriceTrend] = useState({});

  const getProductDetailsFn = async (itemId) => {
    const response = await getProductDetails(itemId);
    console.log("data", response.data);

    if (response.status === 200) {
      if (response.data && response.data.otherSupermarkets) {
        console.log("others market data", response.data.otherSupermarkets);
        for (const [key, val] of Object.entries(
          response.data.otherSupermarkets
        )) {
          setOtherSupermarkets((prevItem) => {
            let itemExists = false;
            prevItem.forEach((item) => {
              if (item.brand === key) {
                itemExists = true;
              }
            });
            return itemExists
              ? [...prevItem]
              : [...prevItem, { brand: key, price: val }];
          });
        }
      }
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
      console.log("Response from server for saving--", response);

      if (response.status === 201) {
        setLoading(false);
        setSavedProducts((prevProducts) => [...prevProducts, response.data]);
        Alert.alert("Product", "Product Added", [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ]);
      } else {
        console.log("error response from add list", response.data);
        // setError(response.data.message);
        setLoading(false);
        Alert.alert("Product", `${response.data.message}`, [
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
      <Image source={{ uri: product.pictureLink }} style={styles.itemImg} />
      <Text
        style={[
          styles.title,
          styles.textColor,
          { textTransform: "capitalize" },
          { fontWeight: "bold" },
        ]}
      >
        {product.supermarket}
      </Text>
      <Text style={[styles.textColor, { marginVertical: 3 }]}>
        {product.name}
      </Text>
      <Text style={[styles.textColor, { marginVertical: 3 }]}>
        {product.description} &nbsp; &nbsp; &nbsp; &nbsp; £{product.price}
      </Text>

      {otherSupermarkets.length > 0 && (
        <View>
          <Text
            style={[
              styles.title,
              styles.textColor,
              { textTransform: "capitalize" },
              { fontWeight: "bold" },
              { marginVertical: 5 },
            ]}
          >
            Price Comparison
          </Text>
          {otherSupermarkets.map((superMarket) => {
            return (
              <View
                key={superMarket.brand}
                style={styles.otherSupermarketsContainer}
              >
                <Text
                  style={[
                    styles.textColor,
                    styles.otherBrands,
                    { textTransform: "capitalize" },
                  ]}
                >
                  {superMarket.brand}
                </Text>
                <Text style={[styles.textColor, styles.otherBrandsPrice]}>
                  £{superMarket.price}
                </Text>
              </View>
            );
          })}
        </View>
      )}
      <Text
        style={[styles.textColor, { marginTop: 10 }]}
      >{`Price Change (week): ${priceTrend.priceChange}% `}</Text>
      <Text
        style={[styles.textColor, { marginTop: 3 }]}
      >{`Average Price: £${priceTrend.averagePrice}`}</Text>
      <View style={styles.addBtn}>
        <Button title="Add" onPress={addItemtoList} />
      </View>

      <Text style={styles.textColor}>Recent Prices:</Text>
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
