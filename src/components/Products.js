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

export default function Products({ navigation }) {
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [masterProducts, setMasterProducts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const fetchProducts = async () => {
    const response = await getProducts();
    setProducts(response);
    setMasterProducts(response);
  };

  const searchProduct = (searchInput) => {
    console.log("search Product by input", searchInput);
    setProducts(masterProducts.filter((item) => item.name === searchInput));
  };

  const selectedProductFn = (name) => {
    setSelectedId(name);
    navigation.navigate("Product Details");
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchInput === "") {
      setProducts(masterProducts);
    }
  }, [searchInput]);

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
        onPress={() => selectedProductFn(item.name)}
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
