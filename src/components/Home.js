import { View } from "react-native";
import LoginTab from "./LoginTab";
import MainBanner from "./MainBanner";

export default function Home({ navigation }) {
  return (
    <View>
      <LoginTab />
      <MainBanner navigation={navigation} />
    </View>
  );
}
