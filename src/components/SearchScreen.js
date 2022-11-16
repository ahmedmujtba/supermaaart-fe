import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ImageBackground,
} from "react-native";

import { useEffect, useState } from "react";
import { getItems } from "../api/services/products";

import SearchBar from "./SearchBar";

export default function SearcScreen(props) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchFn = () => {
    console.log("search input submitted", searchInput);
    props.searchProduct(searchInput);
  };

  return (
    <View>
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onSubmit={handleSearchFn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperSearch: {
    padding: 15,
  },
});
