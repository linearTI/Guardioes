import React, { Component } from "react";

import {
	Content,
	Card,
	CardItem,
	Text,
	Body,
	Container,
	Header,
	Title,
	Button,
	Item,
	Input,
	Left,
	Right,
	Icon,
	Form,
	Label,
	InputGroup,
	ListItem,
	CheckBox,
	List,
	Grid,
	Row,
	Col,
} from "native-base";

import {
	StyleSheet,
	View,
	Alert,
	PixelRatio,
	TouchableOpacity,
	Image,
	Platform,
	AsyncStorage,
	TextInput,
	ScrollView,
	//Modal,
} from "react-native";
import Modal from "react-native-modal";

import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import StorageManager from "../../storage/StorageManager";
import ImagePicker from "react-native-image-picker";
import ModalSelector from "react-native-modal-selector";
import Functions from "../../helpers/functions";
import Constants from "../../helpers/constants";
import DatePicker from "react-native-datepicker";
import style from "react-native-modal-selector/style";
import styles from "./styles";
import Spinner from "react-native-loading-spinner-overlay";
import Toast, { DURATION } from "react-native-easy-toast";
import translate from "../../helpers/translate";
import { EventRegister } from "react-native-event-listeners";

const imgUser = require("../../../assets/default-user.png");
const frequencyNotifications = [
	{ key: "never", label: "Não quero receber", value: "never" },
	{ key: "day", label: "Diariamente", value: "day" },
	{ key: "week", label: "Semanalmente", value: "week" },
	{ key: "month", label: "Mensalmente", value: "month" },
];

export default class tabProfileSpecialist extends Component {
	state = {
		IdUser: "",
		Continue: true,
		ImageSource: imgUser,
		GeneroKey: "",
		IdiomaKey: "",
		EscolaridadeKey: "",
		NomeCompleto: "",
		NomeUsuario: "",
		Email: "",
		AppCode: "",
		DataNascimento: "01/01/1990",
		OptionsTaxgrp: [],
		OptionsPlants: [],
		FrequencyNotifications: "Selecione a frequência",
		modalReady: false,
		modalMap: false,
		visible: true,
		EspecialidadesSelecionadas: [],
		Curriculum: "",
		Agreement: false,
		Comments: "",
		AlertPeriod: "",
		inputCurriculumError: false,
		inputCurriculumMessageError: "",
		inputAgreementError: false,
		inputAgreementMessageError: "",
		Password: "",
		MessageLoading: translate.val("BuscandoInformacoes"),
		ErroAtualizarInformacoes: translate.val("ErroAtualizarInformacoes"),
		ErroAtualizarInformacoesApi: translate.val("ErroAtualizarInformacoesApi"),
		CampoObrigatorio: translate.val("CampoObrigatorio"),
		InformacoesAtualizadasSucesso: translate.val(
			"InformacoesAtualizadasSucesso"
		),
		ErroAceitarTermosUso: translate.val("ErroAceitarTermosUso"),
		SalvarTexto: translate.val("Salvar"),
		ComentariosTexto: translate.val("Comentarios"),
		AnimaisTexto: translate.val("Animais"),
		PlantasTexto: translate.val("Plantas"),
		QueroReceberNotificacaoTexto: translate.val("QueroReceberNotificacao"),
		NaoQueroReceberTexto: translate.val("NaoQueroReceber"),
		EspecifiqueLinkCurriculoTexto: translate.val("EspecifiqueLinkCurriculo"),
		PoliticaParticipacaoEspecialistaTexto: translate.val(
			"PoliticaParticipacaoEspecialista"
		),
		TermosUsoTexto: translate.val("TermosUso"),
		SelecioneFrequencia: translate.val("SelecioneFrequencia"),
		EspecialistaColaborarIdentificacao: translate.val(
			"EspecialistaColaborarIdentificacao"
		),
		ConfirmoAceitarTermosUso: translate.val("ConfirmoAceitarTermosUso"),
		DeixarDeSerEspecialista: translate.val("DeixarDeSerEspecialista"),
		Nao: translate.val("Nao"),
		Sim: translate.val("Sim"),
		DesejaRealmenteDeixarSerEspecialista: translate.val(
			"DesejaRealmenteDeixarSerEspecialista"
		),
		NewSpecialist: false,
		CurrentSpecialist: false,
		NewValueSpecialist: false,
		TermosUsoLidoAceitoEspecialista: translate.val(
			"TermosUsoLidoAceitoEspecialista"
		),
		MarqueGruposTaxonomicos: translate.val("MarqueGruposTaxonomicos"),
	};

	constructor(props) {
		super(props);
		var conn = StorageManager.getConnection();
		this.UpdateUser = this.UpdateUser.bind(this);
		this.RemoverEspecialista = this.RemoverEspecialista.bind(this);
		this.RemoverEspecialista_ = this.RemoverEspecialista_.bind(this);
		conn.transaction((tx) => {
			tx.executeSql("SELECT * FROM GuardianModel", [], (_, results) => {
				if (results.rows.length > 0) {
					let row = results.rows.item(0);
					this.setState({
						DataNascimento: row.DataNascimento,
						Email: row.Email,
						NomeCompleto: row.Name,
						NomeUsuario: row.NameUser,
						AppCode: row.AppCode,
						IdUser: row.ID,
						Password: row.Password,
					});
					this.getInfoUser();
				}
			});
		});
	}
	componentWillMount() {
		this.listenerLanguage = EventRegister.addEventListener(
			"Language",
			(data) => {
				this.setState({
					MessageLoading: translate.val("BuscandoInformacoes"),
					ErroAtualizarInformacoes: translate.val(
						"ErroAtualizarInformacoes"
					),
					ErroAtualizarInformacoesApi: translate.val(
						"ErroAtualizarInformacoesApi"
					),
					CampoObrigatorio: translate.val("CampoObrigatorio"),
					InformacoesAtualizadasSucesso: translate.val(
						"InformacoesAtualizadasSucesso"
					),
					ErroAceitarTermosUso: translate.val("ErroAceitarTermosUso"),
					SalvarTexto: translate.val("Salvar"),
					ComentariosTexto: translate.val("Comentarios"),
					AnimaisTexto: translate.val("Animais"),
					PlantasTexto: translate.val("Plantas"),
					QueroReceberNotificacaoTexto: translate.val(
						"QueroReceberNotificacao"
					),
					NaoQueroReceberTexto: translate.val("NaoQueroReceber"),
					EspecifiqueLinkCurriculoTexto: translate.val(
						"EspecifiqueLinkCurriculo"
					),
					PoliticaParticipacaoEspecialistaTexto: translate.val(
						"PoliticaParticipacaoEspecialista"
					),
					TermosUsoTexto: translate.val("TermosUso"),
					SelecioneFrequencia: translate.val("SelecioneFrequencia"),
					EspecialistaColaborarIdentificacao: translate.val(
						"EspecialistaColaborarIdentificacao"
					),
					ConfirmoAceitarTermosUso: translate.val(
						"ConfirmoAceitarTermosUso"
					),
					DeixarDeSerEspecialista: translate.val(
						"DeixarDeSerEspecialista"
					),
					Nao: translate.val("Nao"),
					Sim: translate.val("Sim"),
					DesejaRealmenteDeixarSerEspecialista: translate.val(
						"DesejaRealmenteDeixarSerEspecialista"
					),
					TermosUsoLidoAceitoEspecialista: translate.val(
						"TermosUsoLidoAceitoEspecialista"
					),
					MarqueGruposTaxonomicos: translate.val(
						"MarqueGruposTaxonomicos"
					),
				});
			}
		);
	}
	// componentWillUnmount() {
	//   EventRegister.removeEventListener(this.listener);
	//   EventRegister.removeEventListener(this.listenerLanguage);
	// }

	getInfoUser() {
		let Api = Constants.getApi();
		Functions.trustFetch(Api, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				action: "profile",
				appcode: this.state.AppCode,
			}),
		})
			.then((response) => {
				//alert(JSON.stringify(response));
				var responseJson = response.json();
				let dataNascimento =
					responseJson.birth_day +
					"/" +
					responseJson.birth_month +
					"/" +
					responseJson.birth_year;
				let frequency = this.state.SelecioneFrequencia;
				let expertises = new Array();
				let arrayAnimais = new Array();
				let arrayPlantas = new Array();
				var conn = StorageManager.getConnection();
				if (!Functions.isNullOrEmpty(responseJson.alert_period)) {
					for (let period of frequencyNotifications) {
						if (
							Functions.isEquals(period.key, responseJson.alert_period)
						) {
							frequency = period.label;
						}
					}
				}

				this.setState({
					DataNascimento: dataNascimento,
					Email: responseJson.email,
					NomeCompleto: responseJson.name,
					NomeUsuario: responseJson.nickname,
					GeneroKey: responseJson.gender,
					IdiomaKey: responseJson.language,
					EscolaridadeKey: responseJson.education,
					Comments: responseJson.comments,
					CurrentSpecialist: responseJson.agreement == 0 ? false : true,
					NewValueSpecialist: responseJson.agreement == 0 ? false : true,
					Expertises: responseJson.expertise,
					Curriculum: responseJson.curriculum,
					AlertPeriod: responseJson.alert_period,
					FrequencyNotifications: frequency,
				});

				expertises = responseJson.expertise;

				conn.transaction((tx) => {
					tx.executeSql(
						"SELECT EL.value, E.key, E.id FROM Expertise E " +
							" INNER JOIN Expertise_Language EL ON EL.ExpertiseId = E.id" +
							" WHERE LanguageId = 'pt' AND [group] = 'animalia' " +
							" ORDER BY E.key",
						[],
						(_, results) => {
							var groups = new Array();
							for (let i = 0; i < results.rows.length; i++) {
								group = results.rows.item(i);
								groups.push({
									key: i,
									id: group.id,
									value: group.value,
									checked:
										expertises.findIndex(function (element) {
											return element == group.id;
										}) > -1,
								});
							}
							this.setState({ OptionsTaxgrp: groups });
						}
					);
				});

				conn.transaction((tx) => {
					tx.executeSql(
						"SELECT EL.value, E.key, E.id FROM Expertise E " +
							" INNER JOIN Expertise_Language EL ON EL.ExpertiseId = E.id" +
							" WHERE LanguageId = 'pt' AND [group] = 'plantae' " +
							" ORDER BY E.key",
						[],
						(_, results) => {
							var groups = new Array();
							for (let i = 0; i < results.rows.length; i++) {
								group = results.rows.item(i);
								groups.push({
									key: i,
									id: group.id,
									value: group.value,
									checked:
										expertises.findIndex(function (element) {
											return element == group.id;
										}) > -1,
								});
							}
							this.setState({ OptionsPlants: groups });
						}
					);
				});
				this.setState({ visible: false });
			})
			.catch((error) => {
				this.setState({ visible: false });
				console.error(error);
				alert(error);
			});
	}
	selectCheckBoxPlant(id, index) {
		let array = new Array();
		for (let i = 0; i < this.state.OptionsPlants.length; i++) {
			array.push({
				id: this.state.OptionsPlants[i].id,
				value: this.state.OptionsPlants[i].value,
				key: this.state.OptionsPlants[i].key,
				checked:
					i != index
						? this.state.OptionsPlants[i].checked
						: !this.state.OptionsPlants[i].checked,
			});
		}
		this.setState({ OptionsPlants: array });
	}

	selectCheckBoxAnimal(id, index) {
		let array = new Array();
		for (let i = 0; i < this.state.OptionsTaxgrp.length; i++) {
			array.push({
				id: this.state.OptionsTaxgrp[i].id,
				value: this.state.OptionsTaxgrp[i].value,
				key: this.state.OptionsTaxgrp[i].key,
				checked:
					i != index
						? this.state.OptionsTaxgrp[i].checked
						: !this.state.OptionsTaxgrp[i].checked,
			});
		}

		this.setState({ OptionsTaxgrp: array });
	}

	selectAgreement() {
		let NewValueSpecialist = !this.state.NewValueSpecialist;
		this.setState({
			NewValueSpecialist: NewValueSpecialist,
		});
	}

	validateCurriculum() {
		if (Functions.isNullOrEmpty(this.state.Curriculum)) {
			this.setState({ inputCurriculumError: true });
			this.setState({
				inputCurriculumMessageError: this.state.CampoObrigatorio,
			});
		} else {
			this.setState({ inputCurriculumError: false });
			this.setState({ inputCurriculumMessageError: "" });
		}
	}

	UpdateUser() {
		let validFields = true;
		if (Functions.isNullOrEmpty(this.state.Curriculum)) {
			this.setState({ inputCurriculumError: true });
			this.setState({
				inputCurriculumMessageError: this.state.CampoObrigatorio,
			});
			validFields = false;
		} else {
			this.setState({ inputCurriculumError: false });
			this.setState({ inputCurriculumMessageError: "" });
		}

		if (this.state.NewValueSpecialist == 0) {
			this.setState({ inputAgreementError: false });
			this.setState({
				inputAgreementMessageError: this.state.ErroAceitarTermosUso,
			});
			validFields = false;
		} else {
			this.setState({ inputAgreementError: true });
			this.setState({ inputAgreementMessageError: "" });
		}

		if (!validFields) {
			this.setState({
				visible: false,
			});
		} else {
			let array = new Array();
			let dataNascimento = this.state.DataNascimento.split("/");
			var Api = Constants.getApi();
			this.setState({
				MessageLoading: translate.val("AtualizandoInformacoes"),
				visible: true,
			});
			for (let i = 0; i < this.state.OptionsTaxgrp.length; i++) {
				if (this.state.OptionsTaxgrp[i].checked) {
					array.push(this.state.OptionsTaxgrp[i].id);
				}
			}
			for (let i = 0; i < this.state.OptionsPlants.length; i++) {
				if (this.state.OptionsPlants[i].checked) {
					array.push(this.state.OptionsPlants[i].id);
				}
			}

			Functions.trustFetch(Api, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					action: "update_profile",
					appcode: this.state.AppCode,
					birth_day: dataNascimento[0],
					birth_month: dataNascimento[1],
					birth_year: dataNascimento[2],
					name: this.state.NomeCompleto,
					nickname: this.state.NomeUsuario,
					education: this.state.EscolaridadeKey,
					language: this.state.IdiomaKey,
					gender: this.state.GeneroKey,
					email: this.state.Email,
					picture: this.state.ImageSource,
					agreement: this.state.NewValueSpecialist,
					curriculum: this.state.Curriculum,
					comments: this.state.Comments,
					expertise: array,
					alert_period: this.state.AlertPeriod,
					password: this.state.Password,
				}),
			})
				.then((response) => {
					let responseJson = response.json();
					if (responseJson.status == "ok") {
						this.setState({
							CurrentSpecialist: true,
							NewValueSpecialist: true,
						});

						var conn = StorageManager.getConnection();
						conn.transaction((tx) => {
							tx.executeSql(
								"UPDATE GuardianModel SET  Name=?, Email=?,  NameUser=?, Picture=?, DataNascimento=?, Escolaridade=?, Genero=?, Idioma=?, CompletedRegistration=?, Password=? WHERE AppCode=?",
								[
									this.state.NomeCompleto,
									this.state.Email,
									this.state.NomeUsuario,
									this.state.ImageSource.uri,
									this.state.DataNascimento,
									this.state.EscolaridadeLabel,
									this.state.GeneroLabel,
									this.state.IdiomaLabel,
									this.state.Password,
									true,
									this.state.AppCode,
								],
								(_, results) => {
									this.setState({
										isLoggedIn: true,
									});
									this.setState({ visible: false });
									this.refs.toast.show(
										this.state.InformacoesAtualizadasSucesso,
										DURATION.LENGTH_LONG
									);
								},
								(error) => {
									this.setState({ visible: false });
									this.refs.toast.show(
										this.state.ErroAtualizarInformacoes,
										DURATION.LENGTH_LONG
									);
								}
							);
						});
					} else {
						this.setState({ visible: false });
						alert(this.state.ErroAtualizarInformacoes);
					}
				})
				.catch((error) => {
					this.setState({ visible: false });
					alert(this.state.ErroAtualizarInformacoes);
				});
		}
	}

	RemoverEspecialista() {
		Alert.alert(
			"",

			this.state.DesejaRealmenteDeixarSerEspecialista,
			[
				{
					text: this.state.Nao,
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel",
				},
				{
					text: this.state.Sim,
					onPress: () => this.RemoverEspecialista_(),
				},
			]
		);
	}
	RemoverEspecialista_() {
		this.setState({ visible: true });
		let Api = Constants.getApi();

		this.setState({
			Comments: "",
			AlertPeriod: "",
		});

		let dataNascimento = this.state.DataNascimento.split("/");

		Functions.trustFetch(Api, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				action: "update_profile",
				appcode: this.state.AppCode,
				birth_day: dataNascimento[0],
				birth_month: dataNascimento[1],
				birth_year: dataNascimento[2],
				name: this.state.NomeCompleto,
				nickname: this.state.NomeUsuario,
				education: this.state.EscolaridadeKey,
				language: this.state.IdiomaKey,
				gender: this.state.GeneroKey,
				email: this.state.Email,
				picture: this.state.ImageSource,
				agreement: this.state.NewSpecialist,
				curriculum: this.state.Curriculum,
				comments: this.state.Comments,
				expertise: this.state.EspecialidadesSelecionadas,
				alert_period: this.state.AlertPeriod,
				password: this.state.Password,
			}),
		})
			.then((response) => {
				let responseJson = response.json();
				if (responseJson.status == "ok") {
					this.getInfoUser();
				} else {
					this.setState({ visible: false });
					alert(this.state.ErroAtualizarInformacoes);
				}
			})
			.catch((error) => {
				this.setState({ visible: false });
				alert(this.state.ErroAtualizarInformacoes);
			});
	}
	render() {
		return (
			<Container>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalMap}
					onRequestClose={() => {
						this.setState({ modalReady: false });
						this.setState({ modalMap: false });
					}}
					onShow={() => {
						this.setState({ modalReady: true });
					}}
				>
					<Header>
						<Left>
							<Button
								transparent
								onPress={() => {
									this.setState({ modalReady: false });
									this.setState({ modalMap: false });
								}}
							>
								<Icon name="arrow-back" />
							</Button>
						</Left>
						<Body>
							<Title>{this.state.TermosUsoTexto}</Title>
						</Body>
						<Right>
							<Button transparent />
						</Right>
					</Header>
					<Content style={{ flex: 1 }}>
						<ScrollView>
							<Text style={styles.TitleTermsOfUse}>
								{this.state.PoliticaParticipacaoEspecialistaTexto}
							</Text>
							<Label style={styles.TextTermsOfUse}>
								Acreditamos que a colaboração entre cientistas e
								cidadãos não cientistas é importante para a geração de
								conhecimento a partir de dados coletados pelos cidadãos.
								Para garantir essa experiência, há critérios quanto à
								participação como especialista. Os critérios
								especificados nestes termos não são obrigatórios, porém,
								acreditamos que se forem seguidos, o compartilhamento
								das identificações com os guardiões e público em geral
								se tornará um processo eficiente e motivador para que os
								guardiões continuem a fotografar as interações que
								observarem. Além disso, otimiza a geração de dados
								científicos para as análises por outros cientistas ou
								tomadores de decisão.
							</Label>
							<Text style={styles.TitleTermsOfUse}>
								Identificação dos espécimes nas fotos
							</Text>
							<Label style={styles.TextTermsOfUse}>
								É desejável a identificação a nível de espécie, porém é
								totalmente aceitável a identificação como família e
								gênero nos casos em que as fotos não permitirem uma
								identificação específica. Sugerimos que as
								identificações sejam feitas no prazo máximo de 15 dias a
								partir da data de envio das fotos pelos guardiões. Você
								pode escolher com que frequência deseja receber
								notificações por e-mail de observações enviadas pelos
								guardiões que necessitam de identificação ou de
								validação. Entre as opções estão: diariamente,
								semanalmente e mensalmente. Caso não deseje receber
								notificações por e-mail, basta escolher a opção "não
								quero receber notificações". Ao identificar os
								espécimes, você se compromete em fornecer os nomes
								corretos e aceitos atualmente. Não é necessário incluir
								o nome da espécie completo com o autor.
							</Label>

							<Text style={styles.TitleTermsOfUse}>
								Direitos autorais
							</Text>
							<Label style={styles.TextTermsOfUse}>
								Ao identificar um espécime, você concorda em receber os
								créditos pela identificação, tendo, assim, seu nome
								associado ao espécime identificado na foto. A
								identificação dos espécimes ficará visível para o
								guardião e para o público em geral que acessar o
								sistema.
							</Label>
						</ScrollView>
					</Content>
				</Modal>

				<Content padder>
					<Form>
						<Text style={styles.LabelInfo}>
							{this.state.EspecialistaColaborarIdentificacao}
						</Text>
						<View>
							<Item
								floatingLabel
								error={this.state.inputCurriculumError}
							>
								<Label style={styles.LabelDefault}>
									{this.state.EspecifiqueLinkCurriculoTexto}
								</Label>
								<Input
									value={this.state.Curriculum}
									onChangeText={(text) => {
										this.setState({ Curriculum: text });
									}}
									onEndEditing={(event) => this.validateCurriculum()}
								/>
							</Item>
							{this.state.inputCurriculumError ? (
								<Label style={styles.LabelError}>
									{this.state.inputCurriculumMessageError}
								</Label>
							) : (
								<Label></Label>
							)}
						</View>
						<View>
							<Text style={styles.LabelInfo2}>
								{this.state.MarqueGruposTaxonomicos}
							</Text>
						</View>
						<ListItem>
							<Text style={styles.LabelTitulo}>
								{this.state.PlantasTexto}
							</Text>
						</ListItem>
						<List
							dataArray={this.state.OptionsPlants}
							renderRow={(data) => (
								<ListItem>
									<CheckBox
										color="#cc9933"
										style={styles.checkBoxStyle}
										onPress={() =>
											this.selectCheckBoxPlant(data.id, data.key)
										}
										checked={data.checked}
									/>
									<Body>
										<Text
											style={{ color: "gray", fontSize: 13 }}
											onPress={() =>
												this.selectCheckBoxPlant(data.id, data.key)
											}
										>
											{data.value}
										</Text>
									</Body>
								</ListItem>
							)}
						/>
						<ListItem>
							<Text style={styles.LabelTitulo}>
								{this.state.AnimaisTexto}
							</Text>
						</ListItem>
						<List
							dataArray={this.state.OptionsTaxgrp}
							renderRow={(data) => (
								<ListItem>
									<CheckBox
										color="#cc9933"
										style={styles.checkBoxStyle}
										onPress={() =>
											this.selectCheckBoxAnimal(data.id, data.key)
										}
										checked={data.checked}
									/>
									<Body>
										<Text
											style={{ color: "gray", fontSize: 13 }}
											onPress={() =>
												this.selectCheckBoxAnimal(data.id, data.key)
											}
										>
											{data.value}
										</Text>
									</Body>
								</ListItem>
							)}
						/>
						<View
							style={{
								flex: 1,
								justifyContent: "space-around",
								padding: 5,
							}}
						>
							<Label style={styles.LabelNotificacao}>
								{this.state.QueroReceberNotificacaoTexto}
							</Label>
							<ModalSelector
								data={frequencyNotifications}
								cancelText="Cancelar"
								initValue={this.state.NaoQueroReceberTexto}
								optionTextStyle={{ color: "black" }}
								onChange={(option) => {
									this.setState({
										FrequencyNotifications: option.label,
										AlertPeriod: option.key,
									});
								}}
							>
								<Item style={{ marginLeft: 5 }}>
									<Input
										editable={false}
										value={this.state.FrequencyNotifications}
									/>
								</Item>
							</ModalSelector>
						</View>
						<View>
							<Item floatingLabel error={this.state.inputEmailError}>
								<Label style={styles.LabelDefault}>
									{this.state.ComentariosTexto}
								</Label>
								<Input
									value={this.state.Comments}
									onChangeText={(text) => {
										this.setState({ Comments: text });
									}}
								/>
							</Item>
						</View>
						{this.state.CurrentSpecialist ? (
							<View>
								<Text
									style={styles.LabelTermosUso}
									onPress={() => {
										this.setState({ modalMap: true });
									}}
								>
									{this.state.TermosUsoLidoAceitoEspecialista}
								</Text>
								<ListItem>
									<Body>
										<Button
											guardioes
											style={styles.ButtonRegister}
											onPress={this.RemoverEspecialista}
										>
											<Text>
												{this.state.DeixarDeSerEspecialista}
											</Text>
										</Button>
									</Body>
								</ListItem>
							</View>
						) : (
							<View>
								<ListItem>
									<Body>
										<CheckBox
											color="#000"
											checked={this.state.NewValueSpecialist}
											onPress={() => this.selectAgreement()}
										/>
										<Text
											style={styles.LabelDefault}
											onPress={() => {
												this.setState({ modalMap: true });
											}}
										>
											{this.state.ConfirmoAceitarTermosUso}
										</Text>
									</Body>
								</ListItem>
								<Button
									guardioes
									style={styles.ButtonRegister}
									onPress={this.UpdateUser}
								>
									<Text style={styles.TextSaveUser}>
										{this.state.SalvarTexto}
									</Text>
								</Button>
							</View>
						)}
					</Form>
					<Spinner
						visible={this.state.visible}
						textContent={this.state.MessageLoading}
						textStyle={{ color: "#FFF" }}
					/>
				</Content>
				<Toast
					ref="toast"
					style={{ backgroundColor: "black" }}
					position="top"
					positionValue={200}
					fadeInDuration={750}
					fadeOutDuration={1000}
					opacity={0.8}
					textStyle={{ color: "white" }}
				/>
			</Container>
		);
	}
}
const stylesCamera = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
