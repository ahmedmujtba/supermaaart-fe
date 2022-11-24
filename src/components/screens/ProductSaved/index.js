import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import UserContext from "../../../context/UserContext";
import ProductContext from "../../../context/ProductContext";

import { getFavoriteItem } from "../../../api/services/products";
import { styles } from "./Style";
export default function ProductsSaved() {
  const { signedUser, setSignedUser } = useContext(UserContext);
  const { savedProducts, setSavedProducts } = useContext(ProductContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFavItems = async () => {
    const response = await getFavoriteItem(signedUser);
    console.log("fetchFavItems--", response.data);
    if (response.status === 200) {
      setLoading(false);
      setSavedProducts(response.data);
    } else {
      setError(response.data);
    }
  };

  useEffect(() => {
    if (signedUser !== "") {
      console.log("user signed in", signedUser);
      setLoading(true);
      fetchFavItems();
    } else {
      console.log("please sign in");
    }
  }, [signedUser, savedProducts.length]);

  const Item = ({ item, textColor }) => (
    <View>
      <View style={styles.itemContainer}>
        <View style={styles.imgContainer}>
          <Image source={{ uri: item.pictureLink }} style={styles.itemImg} />
        </View>
        <View style={styles.itemTextContainer}>
          <View style={styles.itemNameText}>
            <Text
              style={[styles.title, textColor, { flex: 1, flexWrap: "wrap" }]}
            >
              {item.name}
            </Text>
          </View>

          <Text
            style={[
              styles.title,
              textColor,
              { textTransform: "capitalize" },
              { fontWeight: "bold" },
            ]}
          >
            {item.supermarket}
          </Text>
          <Text style={[styles.title, textColor]}>£{item.price}</Text>
        </View>
      </View>
    </View>
  );
  const renderItem = ({ item }) => {
    const backgroundColor = "white";
    const color = "#243578";

    return (
      <Item
        item={item}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };
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
  if (signedUser === "") {
    return (
      <View style={{ marginVertical: 100 }}>
        <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
          Please sign in to see the saved items.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          borderWidth: 1,
          borderBottomColor: "grey",
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderTopWidth: 0,
          marginTop: 10,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            fontWeight: "600",
            textAlign: "center",
            fontSize: 20,
            color: "#243578",
            marginBottom: 30,
          }}
        >
          Your saved product
        </Text>
      </View>

      <FlatList
        data={savedProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
}
