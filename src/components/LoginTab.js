import * as React from "react";
import { Card, Button, Title, Paragraph } from "react-native-paper";
import { View, StyleSheet } from "react-native";

const LoginTab = ({ navigation }) => (
  <Card style={styles.container}>
    <Card.Actions>
      <Card.Content>
        <Title>Dont forget to login!</Title>
      </Card.Content>
      <Button
        buttonColor="#3b5998"
        onPress={() => navigation.navigate("LoginPage")}
      >
        Log In
      </Button>
    </Card.Actions>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 5,
  },
});

export default LoginTab;
// navigation.navigate("LoginPage")
