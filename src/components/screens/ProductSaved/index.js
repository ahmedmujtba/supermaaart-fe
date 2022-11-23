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
import { getFavoriteItem } from "../../../api/services/products";
import { styles } from "./Style";
export default function ProductsSaved() {
  const { signedUser, setSignedUser } = useContext(UserContext);
  const [savedProducts, setSavedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFavItems = async (signedUser) => {
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
      fetchFavItems(signedUser);
    } else {
      console.log("please sign in");
    }
  }, [signedUser]);

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
      <View>
        <Text>Please sign in to see the items.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontWeight: "600", textAlign: "center" }}>
        Your saved product
      </Text>
      <FlatList
        data={savedProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
}
