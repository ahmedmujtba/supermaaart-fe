import { Text, View } from "react-native";
export default function ProductDetails({ route, navigation }) {
  const { itemName } = route.params;
  return (
    <View>
      <Text>Product details page-{itemName}</Text>
    </View>
  );
}
