import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    margin: 20,
    marginTop: 0,
    justifyContent: "space-between",
  },
  img: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
    marginVertical: 50,
  },
  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    color: "#fff",
    opacity: 0.6,
    textAlign: "center",
    marginBottom: 20,
  },
  btn: {
    color: "#0891b2",
    fontWeight: 600,
    fontSize: 22,
    textAlign: "center",
    marginVertical: 40,
  }
});
