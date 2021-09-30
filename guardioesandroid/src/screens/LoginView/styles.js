const React = require("react-native");
const { Platform, Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  container: {
    backgroundColor: "#fff"
  },
  icon: {
    position: 'absolute',
    top:  Platform.OS === "android" ? deviceHeight / 6 : deviceHeight / 6,
    right: 8,
    color: 'gray'
  },
  LabelError:
  {
    left: Platform.OS === "android" ? deviceWidth / 18 : deviceWidth / 18,
    color: '#cc0033',
    fontSize: 12
  },
  ButtonLogin:
  {
    width: 150,
    height: 35,
    top:  Platform.OS === "android" ? deviceHeight / 25 : deviceHeight / 20,
    left: Platform.OS === "android" ? deviceWidth / 3.7 : deviceWidth / 3.7,
    marginBottom: 15
  },
  TextLogin:
  {
    left: Platform.OS === "android" ? deviceWidth / 11 : deviceWidth / 11,
    textAlign: "center",
  },
  TextRecoverPassword:
  {
    top:  Platform.OS === "android" ? deviceHeight / 50 : deviceHeight / 40,
    left: Platform.OS === "android" ? deviceWidth / 25 : deviceWidth / 11,
    textDecorationLine: 'underline'
  },
  TextoOutroLogin:
  {
    top:  Platform.OS === "android" ? deviceHeight / 25 : deviceHeight / 20,
    left: Platform.OS === "android" ? deviceWidth / 3.2 : deviceWidth / 3.2,
  },
  buttonCommonGoogle: {
    width: 230,
    height: 35,
    marginTop:40,
    left: Platform.OS === "android" ? deviceWidth / 6.5 : deviceWidth / 6.5,
  },
  buttonCommonFacebook: {
    width: 230,
    height: 35,
    marginTop:10,
    backgroundColor: '#3b5998',
    left: Platform.OS === "android" ? deviceWidth / 6.5 : deviceWidth / 6.5,
  },
  textoLoginFacebook:
  {
    fontFamily: Platform === "android" ? "Roboto_medium" : "System" ,
    fontSize: 16,
    color: "#fff"
  },
  buttonCommonInstagram: {
    width: 230,
    height: 35,
    marginTop:10,
    left: Platform.OS === "android" ? deviceWidth / 6.5 : deviceWidth / 6.5,
  },
  buttonInstagram: {
    backgroundColor: "#e4405f",
  },
};
