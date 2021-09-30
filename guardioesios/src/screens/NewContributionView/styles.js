
const React = require("react-native");
const { Platform, Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  container: {
    backgroundColor: "#fff"
  },
  iconSave: {
    right: 5,
    color: '#FFF'
  },
  iconTrash: {
    right: 5,
    color: '#FFF'
  },
  ObservacaoMapa:
  {
    top: Platform.OS === "android" ? deviceHeight / 100 : deviceHeight / 100,
    left: Platform.OS === "android" ? deviceWidth / 18 : deviceWidth / 18,
    marginBottom: 10,
    color: '#cc0033'
  },
  InputData:
  {
    left: Platform.OS === "android" ? deviceWidth / 18 : deviceWidth / 18,
    width: "95%"
  },
  TitleNew:
  {
    marginTop:14
  },
  ButtonSaveContribution:
  {
    width: 150,
    height: 35,
    marginTop: 15,
    left: Platform.OS === "android" ? deviceWidth / 3.7 : deviceWidth /3.7,
    marginBottom: 25

  },
  TextSaveContribution:
  {
    left: Platform.OS === "android" ? deviceWidth / 11 : deviceWidth / 11,
    textAlign: "center",
  },
};
