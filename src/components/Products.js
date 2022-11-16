import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ImageBackground,
} from "react-native";

import { useEffect, useState } from "react";
import { getItems } from "../api/services/products";

import SearchScreen from "./SearchScreen";

export default function Products() {
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await getItems();
    // console.log("fetch product", response);
  };

  const searchProduct = (searchInput) => {
    console.log("search Product by input", searchInput);
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
  return (
    <View>
      <SearchScreen
        searchProduct={searchProduct}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperSearch: {
    padding: 15,
  },
});
