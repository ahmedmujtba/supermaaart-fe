import * as React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { DATA } from "../api/services/deals";

const { width, height } = Dimensions.get("screen");
const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * 0.2;
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const MainBanner = ({ navigation }) => (
  <View style={styles.container}>
    <Card
      style={{
        display: "flex",
        justContent: "center",
        alignItems: "center",
        margin: 20,
      }}
    >
      <Card.Content>
        <Title>DON'T OVERPAY FOR YOUR GROCERIES!</Title>
      </Card.Content>
      <Card.Cover
        source={{
          uri: "https://i.ibb.co/xXT4Rmh/logo.png",
        }}
      />
      <Card.Actions>
        <Paragraph>Use supermAAART now!</Paragraph>
        <Button
          buttonColor="#3b5998"
          onPress={() => navigation.navigate("Products")}
        >
          Start
        </Button>
      </Card.Actions>
    </Card>

    <View style={styles.imgcontainer}>
      <FlatList
        data={DATA}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item }) => {
          return (
            <View
              style={{ width, justifyContent: "center", alignItems: "center" }}
            >
              <Image
                source={{ uri: item.imgsrc }}
                style={{
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT,
                  resizeMode: "cover",
                }}
              />
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  </View>
);

export default MainBanner;

const styles = StyleSheet.create({
  container: {},
  imgcontainer: { borderColor: "red", borderTopWidth: 2, borderBottomWidth: 2 },
});
