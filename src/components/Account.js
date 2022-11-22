import { useContext } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import UserContext from "../context/UserContext";

export default function Account({ navigation }) {
  const { signedUser, setSignedUser } = useContext(UserContext);

  const showAlert = (routeName = "Home") =>
    Alert.alert("Logout", "Logout Successful", [
      {
        text: "OK",
        onPress: () => navigation.navigate(routeName),
      },
    ]);
  const handleLogout = async () => {
    try {
      setSignedUser("");
      showAlert();
    } catch (e) {
      console.log("error in logout", e);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.btn}>
        {signedUser === "" ? (
          <Button
            title="Sign in"
            onPress={() => navigation.navigate("LoginPage")}
          />
        ) : (
          <Text>Hello, {signedUser}</Text>
        )}
      </View>

      <View style={styles.btn}>
        <Button
          title="Sign up"
          onPress={() => navigation.navigate("RegisterScreen")}
        />
      </View>
      <View style={styles.btn}>
        <Button title="Sign out" onPress={handleLogout} />
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
