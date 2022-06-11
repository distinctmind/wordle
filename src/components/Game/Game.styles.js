import { StyleSheet } from "react-native";

import { colors } from "../../constants";

export default StyleSheet.create({
  map: {
    alignSelf: "stretch",
    marginVertical: 18,
  },
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
  },
  resetButton: {
    marginTop: 11,
    backgroundColor: colors.primary,
    width: 75,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  resetText: {
    color: colors.lightgrey,
    fontSize: 15,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  cell: {
    aspectRatio: 1,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.darkgrey,
    flex: 1,
    margin: 3,
    maxWidth: 70,
    justifyContent: "center",
  },
  letter: {
    color: colors.lightgrey,
    fontSize: 35,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
