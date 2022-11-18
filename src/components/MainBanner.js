import * as React from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const MainBanner = ({ navigation }) => (
  <>
    <Card
      style={{
        display: "flex",
        justContent: "center",
        alignItems: "center",
        marginTop: 80,
        margin: 5,
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
  </>
);

export default MainBanner;
