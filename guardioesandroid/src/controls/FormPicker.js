import React, { Component } from "react";
import {
	//Modal,
	TouchableWithoutFeedback,
	Text,
	StyleSheet,
	Platform,
	View,
	Picker,
	TextInput,
	TouchableOpacity,
	AppRegistry,
} from "react-native";
import Modal from "react-native-modal";

export default class FormPicker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
			placeholder: this.props.placeholder,
		};
	}

	render() {
		if (Platform.OS === "android") {
			return (
				<Picker
					selectedValue={this.props.value}
					onValueChange={this.props.onValueChange}
				>
					{this.props.items.map((i, index) => (
						<Picker.Item key={index} label={i.label} value={i.value} />
					))}
				</Picker>
			);
		} else {
			const selectedItem = this.props.items.find(
				(i) => i.value === this.props.value
			);
			const selectedLabel = selectedItem ? selectedItem.label : "";

			return (
				<View style={stylesFormPicker.inputContainer}>
					<TouchableOpacity
						onPress={() => this.setState({ modalVisible: true })}
					>
						<TextInput
							style={stylesFormPicker.input}
							editable={false}
							placeholder={this.state.placeholder}
							onChangeText={(searchString) => {
								this.setState({ searchString });
							}}
							value={selectedLabel}
						/>
					</TouchableOpacity>
					<Modal
						animationType="slide"
						transparent={true}
						visible={this.state.modalVisible}
						onRequestClose={() => {}}
					>
						<TouchableWithoutFeedback
							onPress={() => this.setState({ modalVisible: false })}
						>
							<View style={stylesFormPicker.modalContainer}>
								<View style={stylesFormPicker.modalContent}>
									<Text
										style={{ color: "blue" }}
										onPress={() =>
											this.setState({ modalVisible: false })
										}
									>
										Done
									</Text>
								</View>
								<View
									onStartShouldSetResponder={(evt) => true}
									onResponderReject={(evt) => {}}
								>
									<Picker
										selectedValue={this.props.value}
										onValueChange={this.props.onValueChange}
									>
										{this.props.items.map((i, index) => (
											<Picker.Item
												key={index}
												label={i.label}
												value={i.value}
											/>
										))}
									</Picker>
								</View>
							</View>
						</TouchableWithoutFeedback>
					</Modal>
				</View>
			);
		}
	}
}

const stylesFormPicker = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	content: {
		marginLeft: 15,
		marginRight: 15,
		marginBottom: 5,
		alignSelf: "stretch",
		justifyContent: "center",
	},
	inputContainer: {
		...Platform.select({
			ios: {
				borderBottomColor: "gray",
				borderBottomWidth: 1,
			},
		}),
	},
	input: {
		height: 40,
	},
	modalContainer: {
		flex: 1,
		justifyContent: "flex-end",
	},
	modalContent: {
		justifyContent: "flex-end",
		flexDirection: "row",
		padding: 4,
		backgroundColor: "#ececec",
	},
});
