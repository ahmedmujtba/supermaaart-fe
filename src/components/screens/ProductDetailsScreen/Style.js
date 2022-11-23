import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: 800,
    marginBottom: 0,
  },
  textColor: {
    color: "#243578",
  },
  title: {
    fontSize: 15,
  },
  itemImg: {
    width: 220,
    height: 220,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  chartContainer: {
    marginBottom: 50,
  },
  otherSupermarketsContainer: {
    flexDirection: "row",
    margin: 5,
    justifyContent: "space-around",
  },
  otherBrands: {
    marginRight: 5,
    fontWeight: "600",
  },
  otherBrandsPrice: {
    marginLeft: 5,
  },
  addBtn: {
    width: "50%",
    marginHorizontal: "30%",
    marginVertical: 20,
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 5,
  },
});
