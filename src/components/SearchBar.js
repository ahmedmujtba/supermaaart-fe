import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function SearchBar(props) {
  const { setSearchInput } = props;
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View style={styles.wrapperSearch}>
        <Icon size={18} name="search" color="white" style={styles.iconStyle} />
        <TextInput
          placeholder="Search"
          value={props.searchInput}
          onChangeText={(text) => setSearchInput(text)}
          style={styles.textInputSearch}
          onSubmitEditing={props.onSubmit}
        />
        <Icon
          size={18}
          name="close"
          color="white"
          style={styles.iconStyle}
          onPress={() => {
            setSearchInput("");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperSearch: {
    marginTop: 15,
    height: 50,
    backgroundColor: "#D3D3D3",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
  },
  textInputSearch: {
    height: 50,
    padding: 10,
  },
  iconStyle: {
    marginTop: 5,
    marginHorizontal: 5,
  },
});
