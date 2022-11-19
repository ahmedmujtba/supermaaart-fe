import { Text, View, Image } from "react-native";
import { useEffect, useState } from "react";
import { getProductDetails } from "../../../api/services/products";
import { styles } from "./Style";

export default function ProductDetails({ route, navigation }) {
  const { itemName, itemId } = route.params;
  const [product, setProduct] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getProductDetailsFn = async (itemId) => {
    const response = await getProductDetails(itemId);
    console.log("data", response.data);
    if (response.status === 200) {
      setProduct(response.data);
      setLoading(false);
    } else {
      setError(response.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    getProductDetailsFn(itemId);
  }, []);
  return (
    <View style={styles.container}>
      <Text>{product.name}</Text>
      <Text>{product.description}</Text>
      <Text>{product.price}</Text>
      <Text>{product.supermarket}</Text>
      <Image source={{ uri: product.pictureLink }} style={styles.logo} />
    </View>
  );
}
