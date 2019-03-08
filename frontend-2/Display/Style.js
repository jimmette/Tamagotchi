import { StyleSheet } from "react-native";
import CONSTANTS from "../Constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "rgba(200,200,200,0.9)",
    borderRadius: 15
  },
  title: {
    width: "100%",
    textAlign: "center",
    color: "#444",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 50
  },
  subtitle: { width: "100%", textAlign: "center", color: "#fff" },
  xbutton: {
    position: "absolute",
    left: CONSTANTS.app_width - 60,
    top: 0,
    maxWidth: 30,
    maxHeight: 30,
    margin: 0,
    padding: 0,
    zIndex: 4
  },
  list: { width: "100%", margin: 0, padding: 0 },
  listItem: { margin: 0, padding: 0 },
  text: { color: "#fff" }
});

export default styles;
