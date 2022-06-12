import { StyleSheet } from "react-native";

import { colors } from "../../constants";

export default StyleSheet.create({
  buttonView: {
    flexDirection: "row",
  },
  map: {
    alignSelf: "stretch",
    marginVertical: 18,
    paddingHorizontal: 10,
  },
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    marginTop: 11,
    marginHorizontal: 7,
    borderRadius: 50,
    width: 70,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
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
