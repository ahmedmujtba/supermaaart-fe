import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ImageBackground,
} from "react-native";

import { useState } from "react";

import SearchBar from "./SearchBar";

export default function SearcScreen(props) {
  const { searchInput, setSearchInput, searchProduct } = props;

  const handleSearchFn = () => {
    console.log("search input submitted", searchInput);
    searchProduct(searchInput);
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
