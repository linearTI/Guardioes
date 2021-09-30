const React = require("react-native");
const { Platform, Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

import { PixelRatio } from "react-native";
export default {
	container: {
		backgroundColor: "#fff",
		height: 50,
	},
	TitleHelp: {
		// left: Platform.OS === "android" ? deviceWidth-2 / 100 : deviceWidth / 9,
		color: "#9c9",
		fontSize: 17,
	},
	SubTitleHelp: {
		color: "#c93",
		fontSize: 14,
	},
	LastCard: {
		marginBottom: 20,
	},
	TextHelp: {
		fontSize: 14,
		color: "gray",
	},
	TextHelpNegrito: {
		fontWeight: "bold",
		fontSize: 14,
		color: "black",
	},
	TextHelpNegritoVermelho: {
		fontWeight: "bold",
		fontSize: 14,
		color: "red",
	},
	LabelNegrito: {
		fontSize: 14,
		fontWeight: "bold",
	},
};
