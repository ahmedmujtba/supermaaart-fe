import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  itemContainer: {
    flexDirection: "row",
    margin: 5,
  },
  imgContainer: {
    marginRight: 10,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemNameText: {
    flexDirection: "row",
  },
  item: {
    flex: 1,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    // borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
  },
  itemImg: {
    width: 100,
    height: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  showMoreBtn: {
    marginHorizontal: 26,
    borderRadius: 10,
  },
  ratingsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
});
