import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";

import { useEffect, useState } from "react";
import { getProducts } from "../api/services/products";

import SearchScreen from "./SearchScreen";

const apiData = [
  {
    name: "Woodcote 6 Medium Free Range British Eggs",
    description: "6 eggs",
    price: 1.09,
    siteLink:
      "https://www.lidl.co.uk/p/eggs/woodcote-6-medium-free-range-british-eggs/p6726",
    pictureLink:
      "https://uk.cat-ret.assets.lidl/catalog5media/uk/article/01309/xs/01309_66.jpg",
    category: "eggs",
    supermarket: "lidl",
  },
  {
    name: "Butter",
    description: "6 eggs",
    price: 1.09,
    siteLink:
      "https://www.lidl.co.uk/p/eggs/woodcote-6-medium-free-range-british-eggs/p6726",
    pictureLink:
      "https://uk.cat-ret.assets.lidl/catalog5media/uk/article/01309/xs/01309_66.jpg",
    category: "eggs",
    supermarket: "lidl",
  },
  {
    name: "Cheese",
    description: "6 eggs",
    price: 1.09,
    siteLink:
      "https://www.lidl.co.uk/p/eggs/woodcote-6-medium-free-range-british-eggs/p6726",
    pictureLink:
      "https://uk.cat-ret.assets.lidl/catalog5media/uk/article/01309/xs/01309_66.jpg",
    category: "eggs",
    supermarket: "lidl",
  },
  {
    name: "Olive oil",
    description: "6 eggs",
    price: 1.09,
    siteLink:
      "https://www.lidl.co.uk/p/eggs/woodcote-6-medium-free-range-british-eggs/p6726",
    pictureLink:
      "https://uk.cat-ret.assets.lidl/catalog5media/uk/article/01309/xs/01309_66.jpg",
    category: "eggs",
    supermarket: "lidl",
  },
];
export default function Products() {
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const fetchProducts = async () => {
    const response = await getProducts();
    // console.log("fetch product", response);
    setProducts(response);
  };

  const searchProduct = (searchInput) => {
    console.log("search Product by input", searchInput);
    setProducts(apiData.filter((item) => item.name === searchInput));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (error !== "") {
    return (
      <View>
        <Text>Error in fetching data</Text>
      </View>
    );
  }
  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.name}</Text>
      <Image source={{ uri: item.pictureLink }} style={styles.logo} />
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => {
    const backgroundColor = item.name === selectedId ? "#DBE6FA" : "white";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.name)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <View>
      <SearchScreen
        searchProduct={searchProduct}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperSearch: {
    padding: 15,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
