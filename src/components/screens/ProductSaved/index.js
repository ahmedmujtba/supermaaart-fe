import { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import UserContext from "../../../context/UserContext";
import { getFavoriteItem } from "../../../api/services/products";

export default function ProductsSaved() {
  const { signedUser, setSignedUser } = useContext(UserContext);

  const fetchFavItems = async (signedUser) => {
    const response = await getFavoriteItem(signedUser);
    console.log("fetchFavItems--", response);
  };
  useEffect(() => {
    if (signedUser !== "") {
      console.log("user signed in", signedUser);
      fetchFavItems(signedUser);
    } else {
      console.log("please sign in");
    }
  }, []);
  return (
    <View>
      <Text>Saved products list</Text>
    </View>
  );
}
