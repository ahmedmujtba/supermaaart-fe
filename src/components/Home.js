import { View } from "react-native";
import MainBanner from "./MainBanner";

export default function Home({ navigation }) {
  return (
    <View>
      <MainBanner navigation={navigation} />
    </View>
  );
}
