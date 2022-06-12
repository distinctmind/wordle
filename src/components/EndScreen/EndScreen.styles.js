import { StyleSheet } from "react-native";

import { colors } from "../../constants";

export default StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: "black",
    width: "77%",
    height: "44%",
    alignItems: "center",
  },
  bottomView: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: colors.lightgrey,
    fontWeight: "700",
  },
  close: {
    position: "absolute",
    right: 20,
    top: 0,
    marginVertical: 10,
  },
  closeText: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
  },
  title: {
    textTransform: "uppercase",
    fontWeight: "800",
    color: "white",
  },
  time: {
    color: "white",
    fontSize: 22,
    margin: 10,
    fontWeight: "700",
  },
  timeView: {
    // position: "absolute",
    // bottom: 10,
    // left: 30,
    margin: 25,
  },
  statsView: {
    marginTop: 30,
    alignItems: "center",
  },
  stats: {
    flexDirection: "row",
    marginTop: 20,
  },
  stat: {
    width: 70,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  share: {
    backgroundColor: colors.primary,
    height: 33,
    width: 77,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    color: "white",
    fontSize: 25,
    fontWeight: "500",
  },
  subtitle: {
    color: "white",
    marginTop: 5,
    textAlign: "center",
  },
  gameStatusText: {
    color: colors.lightgrey,
    fontSize: 25,
    fontWeight: "700",
    margin: 25,
    textAlign: "center",
  },
});
