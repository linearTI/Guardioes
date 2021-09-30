const React = require("react-native");
const { Platform, Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const labelDefault = {
  marginTop:10,
  fontSize:13
};
import {  PixelRatio } from "react-native";

export default {
  container: {
    backgroundColor: "#fff"
  },
  MessageNoNoteRecorded:
  {
    color:"#cc0033",
    left: Platform.OS === "android" ? deviceWidth / 8 : deviceWidth / 9,
    marginTop: 30,
  },
  icon: {
    color: '#99cc99'
  },
  iconAdd: {
    right: 5,
    color: '#FFF'
  },
  separator: {
    height: 0.5,
    width: "80%",
    alignSelf: 'center',
    backgroundColor: "#555"
  },
  StyleCheckbox:{
    marginTop: 25,
    marginRight: 25
  },
  ImageContainer: {
    borderRadius: 10,
    width: 80,
    height: 80
  },
  DateCreation:
  {
    marginBottom:  Platform.OS === "android" ? deviceHeight / 85 : deviceHeight / 85,
    right: Platform.OS === "android" ? deviceWidth / 20 : deviceWidth / 180,
  },
  TituloObservacao:
  {
    color: "#669966",
    fontSize: 16
  },
  LabelDefault:
  {
    ...labelDefault,
  },
  LabelInfo:{
    ...labelDefault,
    flexDirection: "row",
    flexWrap:"wrap"
  },
  cardStyle:
  {
    left:10,
    right:10,
    width: '94%'
  }
};
