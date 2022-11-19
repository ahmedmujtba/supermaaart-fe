import {
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
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
  const [loading, setLoading] = useState(false);
  const [showMoreCount, setShowMoreCount] = useState(10);

  const fetchProducts = async () => {
    const response = await getProducts();
    if (response.status === 200) {
      const showNProducts = response.data.slice(0, showMoreCount);
      setProducts(showNProducts);
      setMasterProducts(response.data);
      setLoading(false);
    } else {
      setError(response.data);
      setLoading(false);
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

  const showMoreFn = () => {
    console.log("show more fn");
    const showNProducts = masterProducts.slice(0, showMoreCount + 10);
    setProducts(showNProducts);
    setShowMoreCount((prevCount) => prevCount + 10);
  };

  useEffect(() => {
    setLoading(true);
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchInput === "") {
      setProducts(masterProducts);
    }
  }, [searchInput]);

  //Render views

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (error !== "") {
    return (
      <View>
        <Text>Error in fetching data</Text>
      </View>
    );
  }
  const ShowMore = () => {
    return (
      <View>
        {products.length === masterProducts.length ? (
          <Text>All the products covered</Text>
        ) : (
          <Button title="Show more" onPress={showMoreFn} />
        )}
      </View>
    );
  };
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
          ListFooterComponent={ShowMore}
          ListFooterComponentStyle={styles.showMoreBtn}
        />
      </SafeAreaView>
    </View>
  );
}
