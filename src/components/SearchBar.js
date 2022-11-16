import { StyleSheet, Text, View, TextInput, Button } from "react-native";

import { IC_Search } from "../../assets/Icons";

export default function SearchBar(props) {
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View style={styles.wrapperSearch}>
        <TextInput
          placeholder="Search"
          value={props.searchInput}
          onChangeText={(text) => props.setSearchInput(text)}
          style={styles.textInputSearch}
          onSubmitEditing={props.onSubmit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperSearch: {
    marginTop: 15,
    height: 40,
    backgroundColor: "#D3D3D3",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
});
