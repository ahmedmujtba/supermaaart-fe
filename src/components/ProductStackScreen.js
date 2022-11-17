import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Products from "./Products";
import ProductDetails from "./ProductDetails";
const ProductsStack = createNativeStackNavigator();

export default function ProductStackScreen() {
  return (
    <ProductsStack.Navigator>
      <ProductsStack.Screen name="Products" component={Products} />
      <ProductsStack.Screen name="Product Details" component={ProductDetails} />
    </ProductsStack.Navigator>
  );
}
