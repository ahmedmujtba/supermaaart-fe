import { useContext, useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import UserContext from "../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Account({ navigation }) {
  const { signedUser, setSignedUser } = useContext(UserContext);
  const [fullName, setFullName] = useState("");

  const showAlert = (routeName = "Home") =>
    Alert.alert("Logout", "Logout Successful", [
      {
        text: "OK",
        onPress: () => navigation.navigate(routeName),
      },
    ]);
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userFullName");
      setSignedUser("");
      showAlert();
    } catch (e) {
      console.log("error in logout", e);
    }
  };

  const getUserName = async () => {
    try {
      const userFullName = await AsyncStorage.getItem("userFullName");
      if (userFullName !== null) {
        setFullName(userFullName);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserName();
  }, [signedUser]);

  return (
    <View style={styles.container}>
      <View style={styles.btn}>
        {signedUser === "" ? (
          <Button
            title="Sign in"
            onPress={() => navigation.navigate("LoginPage")}
          />
        ) : (
          <Text style={{ fontWeight: "600", textTransform: "capitalize" }}>
            Hello, {fullName}
          </Text>
        )}
      </View>

      <View style={styles.btn}>
        {signedUser === "" ? (
          <Button
            title="Sign up"
            onPress={() => navigation.navigate("RegisterScreen")}
          />
        ) : (
          <></>
        )}
      </View>
      <View style={styles.btn}>
        {signedUser !== "" ? (
          <Button title="Sign out" onPress={handleLogout} />
        ) : (
          <></>
        )}
      </View>
      <View style={styles.btn}>
        {signedUser !== "" ? (
          <Button
            title="Personal details"
            onPress={() => console.log("personal details")}
          />
        ) : (
          <></>
        )}
      </View>
      <View style={styles.btn}>
        {signedUser !== "" ? (
          <Button
            title="Delete Account"
            onPress={() => console.log("delete account")}
          />
        ) : (
          <></>
        )}
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
