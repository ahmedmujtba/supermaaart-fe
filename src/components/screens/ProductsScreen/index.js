import {
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
import { getProducts } from "../../../api/services/products";
import SearchScreen from "../../SearchScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./Style";

export default function Products({ navigation }) {
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [masterProducts, setMasterProducts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const fetchProducts = async () => {
    const response = await getProducts();
    console.log("fetch products", response);
    if (response.status === 200) {
      setProducts(response.data);
      setMasterProducts(response.data);
    } else {
      setError(response.data);
    }
  };

  const searchProduct = (searchInput) => {
    console.log("search Product by input", searchInput);
    setProducts(
      masterProducts.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  };

  const selectedProductFn = (name) => {
    setSelectedId(name);
    navigation.navigate("Product Details", {
      itemName: name,
    });
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
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.item, backgroundColor]}
      >
        <Text style={[styles.title, textColor]}>{item.name}</Text>
        <Text style={[styles.title, textColor]}>{item.description}</Text>
        <Text style={[styles.title, textColor]}>{item.price}</Text>
        <Text style={[styles.title, textColor]}>{item.supermarket}</Text>
        <Image source={{ uri: item.pictureLink }} style={styles.logo} />
      </TouchableOpacity>
    </View>
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
          keyExtractor={(item) => item.name}
          extraData={selectedId}
        />
      </SafeAreaView>
    </View>
  );
}
