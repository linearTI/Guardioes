const React = require("react-native");
const { Platform, Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  drawerCover: {
    alignSelf: "stretch",
    height: deviceHeight / 3.5,
    width: null,
    position: "relative",
    marginBottom: 10,
    backgroundColor: "#669966"
  },
  drawerImage: {
    position: "absolute",
    top: Platform.OS === "android" ? deviceHeight / 15 : deviceHeight / 20,
    left: Platform.OS === "android" ? deviceWidth / 15 : deviceWidth / 20,
    width: 100,
    height: 100,
    borderRadius: 52,
    resizeMode: "cover"
  },
  text: {
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    fontSize: 16,
    marginLeft: 10,
    color: "gray"
  },
  textLogin: {
    position: "absolute",
    fontWeight: Platform.OS === "ios" ? "500" : "400",
    top: Platform.OS === "android" ? deviceHeight / 7 : deviceHeight / 7,
    right: Platform.OS === "android" ? deviceWidth / 5 : deviceWidth / 5,
    fontSize: 25,
    marginLeft: 10,
    color: "white"
  },
  badgeText: {
    fontSize: Platform.OS === "ios" ? 13 : 11,
    fontWeight: "400",
    textAlign: "center",
    marginTop: Platform.OS === "android" ? -3 : undefined
  },
  textInfoName:
  {
    fontWeight: Platform.OS === "ios" ? "200" : "100",
    fontWeight: Platform.OS === "ios" ? "normal" : "normal",
    fontSize: 15
  },
  textInfoEmail:
  {
    fontSize: 10,
    color: "white"
  },
  teste:{
    top: Platform.OS === "android" ? deviceHeight / 8 : deviceHeight / 10,
  }
};
