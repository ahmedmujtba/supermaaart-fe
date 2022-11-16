import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ImageBackground,
} from "react-native";

import { useState } from "react";

export default function Home({ navigation }) {
  const [searchInput, setSearchInput] = useState("");

  return (
    <View>
      <ImageBackground
        source={require("../../assets/bg.jpg")}
        style={styles.container}
        blurRadius={4}
      >
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchInput}
            placeholder="enter the keyword"
            onChangeText={setSearchInput}
          />
          <View style={styles.btn}>
            <Button
              title="Search"
              color="white"
              onPress={() =>
                navigation.navigate("Details", {
                  searchInput,
                })
              }
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 720,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 100,
    justifyContent: "center",
    alignContent: "center",
  },
  searchInput: {
    padding: 5,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "white",
    height: 40,
    width: 150,
  },
  btn: {
    marginTop: 2,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "grey",
    borderRadius: 10,
    height: 40,
    width: 100,
  },
});
