import React, { Component } from "react";
import {
	Image,
	Dimensions,
	BackHandler,
	Linking,
	View,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import {
	Container,
	Header,
	Title,
	Content,
	Button,
	Icon,
	Card,
	CardItem,
	Text,
	Label,
	Thumbnail,
	Left,
	Right,
	List,
	ListItem,
	Separator,
	Body,
} from "native-base";

// import styles from "./styles";
import { EventRegister } from "react-native-event-listeners";
import translate from "../../helpers/translate";
import StorageManager from "../../storage/StorageManager";
import {
	Collapse,
	CollapseHeader,
	CollapseBody,
} from "accordion-collapse-react-native";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import AppIntroSlider from "react-native-app-intro-slider";

const deviceWidth = Dimensions.get("window").width;
const logo = require("../../../assets/logo.png");
const cardImage = require("../../../assets/drawer-cover.png");

const styles = StyleSheet.create({
	mainContent: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-around",
	},
	buttonCircle: {
		width: 40,
		height: 40,
		backgroundColor: "rgba(0, 0, 0, .2)",
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: 300,
		height: 300,
		marginTop: 10,
	},
	imageBemVindo: {
		width: 160,
		height: 160,
		marginTop: 10,
	},
	text: {
		color: "rgba(255, 255, 255, 0.8)",
		backgroundColor: "transparent",
		textAlign: "center",
		paddingHorizontal: 16,
	},
	textBemVindo: {
		color: "rgba(255, 255, 255, 0.8)",
		backgroundColor: "transparent",
		textAlign: "center",
		paddingHorizontal: 16,
		paddingBottom: 50,
	},
	titleBemVindo: {
		fontSize: 22,
		color: "white",
		backgroundColor: "transparent",
		textAlign: "center",
		marginBottom: 5,
	},
	title: {
		fontSize: 22,
		color: "white",
		backgroundColor: "transparent",
		textAlign: "center",
		marginBottom: 5,
	},
});

const slides = [
	{
		key: "bemvindo",
		title: "Bem-vindo ao app Guardiões da Biodiversidade.",
		text:
			"Com ele você pode fazer registros fotográficos de interações entre animais e plantas e enviá-los a um sistema online.Para mais detalhes, visite guardioes.cria.org.br.",
		backgroundColor: "#9c9",
		image: require("../../../assets/ic_launcher.png"),
		imageStyle: styles.imageBemVindo,
		titleStyle: styles.titleBemVindo,
		textStyle: styles.textBemVindo,
	},
	{
		key: "novaobservacao",
		title: "Nova Observação",
		text:
			"Para registar uma nova observação no Sistema Guardiões da Biodiversidade preencha os campos apresentados na tela e clique no botão salvar disponivel no final da tela.",
		image: require("../../../assets/animal_world.png"),
		imageStyle: styles.image,
		titleStyle: styles.title,
		backgroundColor: "#c93",
		textStyle: styles.text,
	},
	{
		key: "enviandoobervacao",
		title: "Enviar Observação",
		text:
			'Para enviar uma observação para o Sistema Guardiões da Biodiversidade selecione todas as observações que deseja enviar e clique no icone de "avião" no canto direito.',
		image: require("../../../assets/swipersend.png"),
		imageStyle: styles.image,
		titleStyle: styles.title,
		backgroundColor: "#c03",
		textStyle: styles.text,
	},
];

class PresentationView extends Component {
	state = {
		showRealApp: false,
	};

	_onDone = () => {
		this.props.navigation.navigate("NewContribution", { welcome: 1 });
	};
	_renderNextButton = () => {
		return (
			<View style={styles.buttonCircle}>
				<IconFontAwesome
					name="arrow-right"
					color="rgba(255, 255, 255, .9)"
					size={24}
					style={{ backgroundColor: "transparent" }}
				/>
			</View>
		);
	};
	_renderDoneButton = () => {
		return (
			<View style={styles.buttonCircle}>
				<IconFontAwesome
					name="check"
					color="rgba(255, 255, 255, .9)"
					size={24}
					style={{ backgroundColor: "transparent" }}
				/>
			</View>
		);
	};
	// _renderItem = (props) => (
	// 	<Body
	// 		style={[
	// 			styles.mainContent,
	// 			{
	// 				paddingTop: props.topSpacer,
	// 				paddingBottom: props.bottomSpacer,
	// 				width: props.width,
	// 				height: props.height,
	// 				backgroundColor: props.backgroundColor,
	// 			},
	// 		]}
	// 	>
	// 		<Thumbnail square source={props.image} style={props.imageStyle} />
	// 		<Text style={props.titleStyle}>{props.title}</Text>
	// 		<View>
	// 			<Thumbnail
	// 				square
	// 				size={70}
	// 				source={props.image}
	// 				style={props.imageStyle}
	// 			/>
	// 			<Text style={props.textStyle}>{props.text}</Text>
	// 		</View>
	// 	</Body>
	// );

	_renderItem = ({ item }) => {
		return (
			<View
				style={[
					styles.mainContent,
					{
						// paddingTop: props.topSpacer,
						// paddingBottom: props.bottomSpacer,
						// width: props.width,
						// height: props.height,
						backgroundColor: item.backgroundColor,
					},
				]}
			>
				<Text style={item.titleStyle}>{item.title}</Text>
				<Image source={item.image} style={item.imageStyle} />
				<Text style={item.textStyle}>{item.text}</Text>
			</View>
		);
	};
	render() {
		return (
			<AppIntroSlider
				data={slides}
				renderDoneButton={this._renderDoneButton}
				renderNextButton={this._renderNextButton}
				renderItem={this._renderItem}
				onDone={this._onDone}
			/>
		);
	}
}

export default PresentationView;
