import { StyleSheet } from "react-native";
import CONSTANTS from "../Constants";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    top: 0,
    width: CONSTANTS.app_width - 40,
    height:
      CONSTANTS.app_height -
      80 -
      CONSTANTS.footer_hight -
      CONSTANTS.header_hight,
    marginTop: 40,
    marginBottom: 40,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#999",
    opacity: 0.95,
    overflow: "hidden",
    zIndex: 2,
    borderRadius: 25
  },
  title: { color: "#fff", fontWeight: "bold", marginTop: 10, marginBottom: 20 },
  xbutton: {
    position: "absolute",
    left: CONSTANTS.app_width - 45,
    top: 30,
    maxWidth: 30,
    maxHeight: 30,
    margin: 0,
    padding: 0,
    zIndex: 4,
    backgroundColor: "transparent"
  },
  list: { width: "100%" },
  text: { color: "#fff" }
});

export default styles;
