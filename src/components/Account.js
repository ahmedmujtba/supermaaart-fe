import { View, Text, Button, StyleSheet } from "react-native";

export default function Account({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.btn}>
        <Button
          title="Sign in"
          onPress={() => navigation.navigate("LoginPage")}
        />
      </View>

      <View style={styles.btn}>
        <Button
          title="Sign up"
          onPress={() => navigation.navigate("RegisterScreen")}
        />
      </View>
      <View style={styles.btn}>
        <Button title="Sign out" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  btn: {
    margin: 10,
  },
});
