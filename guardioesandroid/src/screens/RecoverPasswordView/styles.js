const React = require("react-native");
const { Platform, Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  container: {
    backgroundColor: "#fff"
  },
  LabelError:
  {
    left: Platform.OS === "android" ? deviceWidth / 18 : deviceWidth / 25,
    color: '#cc0033',
    fontSize: 12
  },
  LabelEmail:
  {
    marginTop: 15,
    left: 15
  },
  ButtonRecoverPassword:
  {
    width: 150,
    height: 35,
    marginTop: 15,
    left: Platform.OS === "android" ? deviceWidth / 3.3 : deviceWidth / 3.7,
    marginBottom: 15
  },
  TextRecoverPassword:
  {
    left: Platform.OS === "android" ? deviceWidth / 15 : deviceWidth / 11,
    textAlign: "center",
  },
  MessageSuccess:
  {
    left: Platform.OS === "android" ? deviceWidth / 22 : deviceWidth / 9,
    color: '#99cc99'
  },
  MessageError:
  {
    left: Platform.OS === "android" ? deviceWidth / 22 : deviceWidth / 9,
    color: '#cc0033'
  },
  TitleRecoverPassword:
  {
    marginTop:14
  }
};
