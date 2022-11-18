import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Products from "./screens/ProductsScreen";
import ProductDetails from "./screens/ProductDetailsScreen";
const ProductsStack = createNativeStackNavigator();

export default function ProductStackScreen() {
  return (
    <ProductsStack.Navigator>
      <ProductsStack.Screen
        name="Products"
        component={Products}
        options={{ title: "Products" }}
      />
      <ProductsStack.Screen name="Product Details" component={ProductDetails} />
    </ProductsStack.Navigator>
  );
}
