import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";

import { loginUser } from "../api/services/users";
import UserContext from "../context/UserContext";

export default function LoginPage({ route, navigation }) {
  const { goto, itemName, itemId } = route.params;
  const [username, setUserName] = useState("");
  const [password, setUserPassword] = useState("");
  const [errortext, setErrortext] = useState("");
  const { signedUser, setSignedUser } = useContext(UserContext);

  const showAlert = (routeName = "Home") =>
    Alert.alert("Login", "Login Successful", [
      {
        text: "OK",
        onPress: () => {
          if (routeName === "Product Details") {
            navigation.navigate(routeName, { itemName, itemId });
          } else {
            navigation.navigate(routeName);
          }
        },
      },
    ]);

  const handleSubmitPress = async () => {
    setErrortext("");
    if (!username) {
      alert("Please fill user name");
      return;
    }
    if (!password) {
      alert("Please fill Password");
      return;
    }

    const response = await loginUser({ username, password });

    if (response.status === 200) {
      console.log("response", response.data);
      setSignedUser(response.data.username);
      showAlert(goto);
    } else {
      setErrortext(response.data);
      console.log("Please check your email id or password");
    }
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset="130"
      behavior={"padding"}
      style={{ flex: 1 }}
    >
      <View style={styles.mainBody}>
        <ScrollView
          keyboardShouldPersistTaps="never"
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <View>
            <View style={{ alignItems: "center" }}>
              <Image
                source={{
                  uri: "https://i.ibb.co/K5GRb7d/supermaaart-HIGHRESUPDATED.png",
                }}
                style={{
                  width: "50%",
                  height: 100,
                  resizeMode: "contain",
                  margin: 30,
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(username) => setUserName(username)}
                placeholder="Enter user name"
                placeholderTextColor="#8b9cb5"
                underlineColorAndroid="#f000"
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                placeholder="Enter Password"
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != "" ? (
              <Text style={styles.errorTextStyle}>{errortext}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}
            >
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              New Here? Register
            </Text>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    alignContent: "center",
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#3b5998",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "white",
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "black",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#dadae8",
  },
  registerTextStyle: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
    padding: 10,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});
