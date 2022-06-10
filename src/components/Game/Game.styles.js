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
