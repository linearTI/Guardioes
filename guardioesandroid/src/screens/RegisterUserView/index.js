import React, { Component } from "react";
import {
	Container,
	Header,
	Title,
	Content,
	Button,
	Item,
	Input,
	Body,
	Left,
	Right,
	Icon,
	Form,
	Text,
	Card,
	CardItem,
	Label,
	InputGroup,
	ListItem,
	CheckBox,
	List,
} from "native-base";

import {
	StyleSheet,
	View,
	PixelRatio,
	TouchableOpacity,
	Image,
	Platform,
	AsyncStorage,
	TextInput,
	NetInfo,
	//Modal,
	ScrollView,
} from "react-native";
import Modal from "react-native-modal";

import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import StorageManager from "../../storage/StorageManager";
import styles from "./styles";
import ImagePicker from "react-native-image-picker";
import ModalSelector from "react-native-modal-selector";
import Functions from "../../helpers/functions";
import Constants from "../../helpers/constants";
import DatePicker from "react-native-datepicker";
import style from "react-native-modal-selector/style";
import { BackHandler } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { EventRegister } from "react-native-event-listeners";
import translate from "../../helpers/translate";
import Moment from "moment";

const imgUser = require("../../../assets/default-user.png");
const generos = [
	{ key: "", label: "Selecione" },
	{ key: "female", label: "Feminino" },
	{ key: "male", label: "Masculino" },
];
const escolaridades = [
	{ key: "", label: "Selecione" },
	{ key: "fundamental", label: "Fundamental" },
	{ key: "medio", label: "Médio" },
	{ key: "superior", label: "Superior" },
	{ key: "pos", label: "Pós-Graduação" },
];
const idiomas = [
	{ key: "", label: "Selecione" },
	{ key: "pt", label: "Português" },
	{ key: "en", label: "English" },
];

class RegisterUserView extends React.Component {
	state = {
		Continue: true,
		ImageSource: imgUser,
		ImageData: "",
		PhotoTaken: false,
		GeneroLabel: "Selecione",
		GeneroKey: "",
		EscolaridadeLabel: "Selecione",
		EscolaridadeKey: "",
		IdiomaLabel: "Selecione",
		IdiomaKey: "",
		AppCode: "",
		NomeCompleto: "",
		NomeUsuario: "",
		Email: "",
		Senha: "",
		ConfirmarSenha: "",
		DataNascimento: "01/01/1990",
		icEye: "eye-slash",
		password: true,
		inputEmailError: false,
		inputEmailErrorMessage: "",
		inputFullNameError: false,
		inputFullNameErrorMessage: "",
		inputUserNameError: false,
		inputUserNameErrorMessage: "",
		inputPasswordError: false,
		inputPasswordErrorMessage: "",
		inputConfirmPasswordError: false,
		inputConfirmPasswordErrorMessage: "",
		inputEscolaridadeError: false,
		inputEscolaridadeErrorMessage: "",
		inputGeneroError: false,
		inputGeneroErrorMessage: "",
		inputIdiomaError: false,
		inputIdiomaErrorMessage: "",
		visible: false,
		CampoObrigatorio: translate.val("CampoObrigatorio"),
		SenhasDiferentes: translate.val("SenhasDiferentes"),
		EmailInvalido: translate.val("EmailInvalido"),
		CadastroNaoRealizado: translate.val("CadastroNaoRealizado"),
		TituloCadastro: translate.val("TituloCadastro"),
		NomeCompletoTexto: translate.val("NomeCompleto"),
		ComoQuerSerChamadoTexto: translate.val("ComoQuerSerChamado"),
		DataNascimentoTexto: translate.val("DataNascimento"),
		EmailTexto: translate.val("Email"),
		GeneroTexto: translate.val("Genero"),
		EscolaridadeTexto: translate.val("Escolaridade"),
		IdiomaTexto: translate.val("Idioma"),
		SenhaTexto: translate.val("Senha"),
		ConfirmarSenhaTexto: translate.val("ConfirmarSenha"),
		Cadastrar: translate.val("Cadastrar"),
		Aguarde: translate.val("Aguarde"),
		modalMap: false,
		TermosUsoTexto: translate.val("TermosUso"),
		DeixarDeSerEspecialista: translate.val("DeixarDeSerEspecialista"),
		Agreement: false,
		disabledButtonRegister: true,
		ConfirmoAceitarTermosUsoGuardiao: translate.val(
			"ConfirmoAceitarTermosUsoGuardiao"
		),
	};

	constructor(props) {
		super(props);
		this.RegisterUser = this.RegisterUser.bind(this);
		translate.setLanguage("pt");
		var conn = StorageManager.getConnection();
		conn.transaction((tx) => {
			tx.executeSql("SELECT * FROM GuardianModel", [], (_, results) => {
				if (results.rows.length > 0) {
					let row = results.rows.item(0);
					this.state.AppCode = row.AppCode;
				}
			});
		});
	}
	changePwdType = () => {
		let newState;
		if (this.state.password) {
			newState = {
				icEye: "eye",
				password: false,
			};
		} else {
			newState = {
				icEye: "eye-slash",
				password: true,
			};
		}
		this.setState(newState);
	};
	ValidatePassword() {
		if (Functions.isNullOrEmpty(this.state.Senha)) {
			this.setState({ inputPasswordError: true });
			this.setState({
				inputPasswordErrorMessage: this.state.CampoObrigatorio,
			});
		} else if (!Functions.isNullOrEmpty(this.state.ConfirmarSenha)) {
			this.CheckPasswordEqualsConfirmPassword();
		} else {
			this.setState({ inputPasswordError: false });
			this.setState({ inputPasswordErrorMessage: "" });
		}
	}
	ValidateConfirmPassword() {
		if (Functions.isNullOrEmpty(this.state.ConfirmarSenha)) {
			this.setState({ inputConfirmPasswordError: true });
			this.setState({
				inputConfirmPasswordErrorMessage: this.state.CampoObrigatorio,
			});
		} else if (!Functions.isNullOrEmpty(this.state.Senha)) {
			this.CheckPasswordEqualsConfirmPassword();
		} else {
			this.setState({ inputConfirmPasswordError: false });
			this.setState({ inputConfirmPasswordErrorMessage: "" });
		}
	}
	CheckPasswordEqualsConfirmPassword() {
		var validPassword = Functions.isEquals(
			this.state.Senha,
			this.state.ConfirmarSenha
		);
		if (!validPassword) {
			this.setState({ inputPasswordError: true });
			this.setState({ inputConfirmPasswordError: true });
			this.setState({
				inputPasswordErrorMessage: this.state.SenhasDiferentes,
			});
			this.setState({
				inputConfirmPasswordErrorMessage: this.state.SenhasDiferentes,
			});
		} else {
			this.setState({ inputPasswordError: false });
			this.setState({ inputConfirmPasswordError: false });
			this.setState({ inputPasswordErrorMessage: "" });
			this.setState({ inputConfirmPasswordErrorMessage: "" });
		}
	}
	validateEmail() {
		let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (Functions.isNullOrEmpty(this.state.Email)) {
			this.setState({ inputEmailError: true });
			this.setState({ inputEmailErrorMessage: this.state.CampoObrigatorio });
		} else if (reg.test(this.state.Email) === false) {
			this.setState({ inputEmailError: true });
			this.setState({ inputEmailErrorMessage: this.state.EmailInvalido });
		} else {
			this.setState({ inputEmailError: false });
			this.setState({ inputEmailErrorMessage: "" });
		}
	}
	validateFullName() {
		if (Functions.isNullOrEmpty(this.state.NomeCompleto)) {
			this.setState({ inputFullNameError: true });
			this.setState({
				inputFullNameErrorMessage: this.state.CampoObrigatorio,
			});
		} else {
			this.setState({ inputFullNameError: false });
			this.setState({ inputFullNameErrorMessage: "" });
		}
	}
	validateUserName() {
		if (Functions.isNullOrEmpty(this.state.NomeUsuario)) {
			this.setState({ inputUserNameError: true });
			this.setState({
				inputUserNameErrorMessage: this.state.CampoObrigatorio,
			});
		} else {
			this.setState({ inputUserNameError: false });
			this.setState({ inputUserNameErrorMessage: "" });
		}
	}
	validateGenre(label, key) {
		this.setState({ GeneroLabel: label, GeneroKey: key });
		// if(Functions.isEquals(label, "Selecione"))
		// {
		//   this.setState({inputGeneroError: true});
		//   this.setState({inputGeneroErrorMessage: this.state.CampoObrigatorio});
		//   return false;
		// }
		// else
		// {
		//   this.setState({inputGeneroError: false});
		//   this.setState({inputGeneroErrorMessage: ""});

		//   return true;
		// }
	}

	validateIdioma(label, key) {
		this.setState({ IdiomaKey: key, IdiomaLabel: label });
		if (Functions.isEquals(label, "Selecione")) {
			this.setState({ inputIdiomaError: true });
			this.setState({
				inputIdiomaErrorMessage: this.state.CampoObrigatorio,
			});
			return false;
		} else {
			this.setState({ inputIdiomaError: false });
			this.setState({ inputIdiomaErrorMessage: "" });

			return true;
		}
	}

	validateEscolaridade(label, key) {
		this.setState({ EscolaridadeKey: key, EscolaridadeLabel: label });
		// if(Functions.isEquals(label, "Selecione"))
		// {
		//   this.setState({inputEscolaridadeError: true});
		//   this.setState({inputEscolaridadeErrorMessage: this.state.CampoObrigatorio});
		//   return false;
		// }
		// else
		// {
		//   this.setState({inputEscolaridadeError: false});
		//   this.setState({inputEscolaridadeErrorMessage: ""});

		//   return true;
		// }
	}
	RegisterUser() {
		this.setState({ visible: true });
		var valido = true;
		if (Functions.isNullOrEmpty(this.state.Email)) {
			this.setState({ inputEmailError: true });
			this.setState({ inputEmailErrorMessage: this.state.CampoObrigatorio });
			valido = false;
		} else if (!Functions.validateEmail(this.state.Email)) {
			this.setState({ inputEmailError: true });
			this.setState({ inputEmailErrorMessage: this.state.EmailInvalido });
			valido = false;
		}

		if (Functions.isNullOrEmpty(this.state.NomeCompleto)) {
			this.setState({ inputFullNameError: true });
			this.setState({ inputFullNameErrorMessage: "Campo obrigatório." });
			valido = false;
		}
		if (Functions.isNullOrEmpty(this.state.Senha)) {
			this.setState({ inputPasswordError: true });
			this.setState({ inputPasswordErrorMessage: "Campo obrigatório." });
		}
		if (Functions.isNullOrEmpty(this.state.ConfirmarSenha)) {
			this.setState({ inputConfirmPasswordError: true });
			this.setState({
				inputConfirmPasswordErrorMessage: "Campo obrigatório.",
			});
		}

		// if(Functions.isNullOrEmpty(this.state.EscolaridadeKey))
		// {
		//   this.setState({inputEscolaridadeError: true});
		//   this.setState({inputEscolaridadeErrorMessage: "Campo obrigatório."});
		// }

		if (Functions.isNullOrEmpty(this.state.IdiomaKey)) {
			this.setState({ inputIdiomaError: true });
			this.setState({ inputIdiomaErrorMessage: "Campo obrigatório." });
		}

		// if(Functions.isNullOrEmpty(this.state.GeneroKey))
		// {
		//   this.setState({inputGeneroError: true});
		//   this.setState({inputGeneroErrorMessage: "Campo obrigatório."});
		// }

		if (!Functions.isEquals(this.state.Senha, this.state.ConfirmarSenha)) {
			this.setState({ inputPasswordError: true });
			this.setState({ inputConfirmPasswordError: true });
			this.setState({
				inputPasswordErrorMessage:
					"O campo Senha e Confirmar senha devem ser iguais.",
			});
			this.setState({
				inputConfirmPasswordErrorMessage:
					"O campo Senha e Confirmar senha devem ser iguais.",
			});
			valido = false;
		}

		if (valido) {
			var conn = StorageManager.getConnection();
			var Api = Constants.getApi();
			Functions.trustFetch(Api, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					action: "register",
					network: "guardioes",
					email: this.state.Email,
					appcode: this.state.AppCode,
					name: this.state.NomeCompleto,
					password: this.state.Senha,
					picture: this.state.ImageData,
					nickname: this.state.NomeUsuario,
					birthday: this.state.DataNascimento,
					education: this.state.EscolaridadeKey,
					gender: this.state.GeneroKey,
					language: this.state.IdiomaKey,
				}),
			})
				.then((response) => {
					var responseJson = response.json();
					if (
						responseJson.status == "old" ||
						responseJson.status == "new"
					) {
						EventRegister.emit("Authenticated", true);
						this.SetUser();
					} else {
						this.setState({ visible: false });
						alert(
							"Não foi possível realizar seu cadastro. " +
								JSON.stringify(responseJson)
						);
					}
				})
				.catch((error) => {
					this.setState({ visible: false });
					console.error(error);
					alert(
						"Erro ao acessar a API para realizar seu cadastro: " + error
					);
				});
		} else {
			this.setState({ visible: false });
		}
	}
	SetUser() {
		var conn = StorageManager.getConnection();
		conn.transaction((tx) => {
			tx.executeSql(
				"UPDATE GuardianModel SET Name = ?, Email = ?, IsAuthenticated = ?, NameUser = ?, Picture = ?, Password = ?,DataNascimento = ?, Escolaridade = ?,Genero = ?,Idioma = ?, CompletedRegistration = ?, IsAuthenticated = ?, DateAcceptedTermsGuardians=?",
				[
					this.state.NomeCompleto,
					this.state.Email,
					true,
					this.state.NomeUsuario,
					this.state.ImageData,
					this.state.Senha,
					this.state.DataNascimento,
					this.state.EscolaridadeLabel,
					this.state.GeneroLabel,
					this.state.IdiomaKey,
					true,
					true,
					Moment(new Date()).format("DD-MM-YYYY"),
				],
				(_, results) => {
					this.setState({
						isLoggedIn: true,
					});
					this.setState({ visible: false });
					EventRegister.emit("SetProfileImage", {
						name: this.state.NomeCompleto,
						email: this.state.Email,
						image: this.state.ImageData,
						network: "guardioes",
					});
					this.props.navigation.navigate("NewContribution");
				},
				(error) => {
					this.setState({ visible: false });
					alert(this.state.CadastroNaoRealizado);
				}
			);
		});
	}
	selectPhotoTapped() {
		const options = {
			quality: 1.0,
			maxWidth: 500,
			maxHeight: 500,
			title: "Selecione a origem da foto:",
			takePhotoButtonTitle: "Câmera",
			chooseFromLibraryButtonTitle: "Galeria",
			cancelButtonTitle: "CANCELAR",
			storageOptions: {
				skipBackup: true,
			},
		};

		ImagePicker.showImagePicker(options, (response) => {
			console.log("Response = ", response);

			if (response.didCancel) {
				console.log("User cancelled photo picker");
			} else if (response.error) {
				console.log("ImagePicker Error: ", response.error);
			} else if (response.customButton) {
				console.log("User tapped custom button: ", response.customButton);
			} else {
				this.setState({ Continue: false });
				let source = { uri: "data:image/jpeg;base64," + response.data };
				this.setState({
					ImageSource: source,
					ImageData: response.data,
					PhotoTaken: true,
				});
			}
		});
	}
	selectAgreement() {
		let agreement = !this.state.Agreement;
		this.setState({
			Agreement: agreement,
			disabledButtonRegister: !agreement,
		});
	}
	componentWillMount() {
		BackHandler.addEventListener("hardwareBackPress", () => {
			this.props.navigation.navigate("DrawerOpen");
			//this.props.navigation.navigate('NewContribution');
			return true;
		});
		this.listenerLanguage = EventRegister.addEventListener(
			"Language",
			(data) => {
				this.setState({
					CampoObrigatorio: translate.val("CampoObrigatorio"),
					SenhasDiferentes: translate.val("SenhasDiferentes"),
					EmailInvalido: translate.val("EmailInvalido"),
					CadastroNaoRealizado: translate.val("CadastroNaoRealizado"),
					TituloCadastro: translate.val("TituloCadastro"),
					NomeCompletoTexto: translate.val("NomeCompleto"),
					ComoQuerSerChamadoTexto: translate.val("ComoQuerSerChamado"),
					DataNascimentoTexto: translate.val("DataNascimento"),
					EmailTexto: translate.val("Email"),
					GeneroTexto: translate.val("Genero"),
					EscolaridadeTexto: translate.val("Escolaridade"),
					IdiomaTexto: translate.val("Idioma"),
					SenhaTexto: translate.val("Senha"),
					ConfirmarSenhaTexto: translate.val("ConfirmarSenha"),
					Cadastrar: translate.val("Cadastrar"),
					Aguarde: translate.val("Aguarde"),
					TermosUsoTexto: translate.val("TermosUso"),
				});
			}
		);
	}
	render() {
		return (
			<Container style={styles.container}>
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
								Política de participação como guardião
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
								tomadores de decisão.Bem-vindo aos Guardiões da
								Biodiversidade! Antes de criar uma conta no sistema e se
								tornar um Guardião, leia este documento cuidadosamente.
								Como Guardião, você deve concordar com os termos e
								condições desta política de participação. Se não
								concordar com todos os termos e condições aqui
								apresentados, você não poderá criar uma conta. No
								entanto, poderá usar os serviços e recursos que são
								apresentados aos usuários não cadastrados.
							</Label>
							<Text style={styles.TitleTermsOfUse}>
								Licença Pública Creative Commons
							</Text>
							<Label style={styles.TextTermsOfUse}>
								Compartilhar suas fotos e dados associados dá a outras
								pessoas a oportunidade de utilizarem-nas de maneira
								legalizada sem precisar solicitar sua permissão direta,
								sempre que forem respeitados os termos de licença. O
								sistema Guardiões da Biodiversidade adota a licença
								Creative Commons Atribuição-Não Comercial 4.0
								Internacional (CC BY-NC 4.0) para compartilhar suas
								observações com os cientistas e demais pessoas
								interessadas. Portanto, ao se tornar um Guardião, você
								concorda em compartilhar suas observações neste formato.
							</Label>

							<Text style={styles.TitleTermsOfUse}>Dados pessoais</Text>
							<Label style={styles.TextTermsOfUse}>
								Para se cadastrar nos Guardiões da Biodiversidade, você
								deve fornecer alguns dados pessoais mínimos, como nome,e
								e-mail, através do qual o sistema realizará os contatos
								necessários. Se você escolher acessar por uma das redes
								sociais (Google, Facebook, Twitter ou Instagram), a foto
								associada ao seu perfil também será coletada. Apenas seu
								nome e sua foto, se fornecida, serão públicos a qualquer
								pessoa que acessar o sistema e serão utilizados para dar
								os devidos créditos às suas contribuições. Além desses,
								seu e-mail e gênero serão visíveis aos especialistas
								cadastrados para que possam, se necessário, entrar em
								contato com você.
							</Label>

							<Text style={styles.TitleTermsOfUse}>
								Câmera e localização
							</Text>
							<Label style={styles.TextTermsOfUse}>
								O aplicativo solicita acesso à câmera do dispositivo
								porque é necessário que o usuário fotografe as
								interações entre animais e plantas que observa. A
								fotografia é obrigatória, pois tem os objetivos de (1)
								documentar a existência da interação, (2) informar o
								tipo de interação que ocorreu (a exemplo, coleta de
								alimento da flor e construção de ninhos em ocos de
								árvores) e (3) auxiliar os especialistas na
								identificação taxonômica das espécies de animais e
								plantas fotografadas. Quanto à localização do usuário, o
								objetivo é unicamente pela necessidade de registrar a
								ocorrência espacial da interação e espécies
								fotografadas. Os registros de ocorrência espacial das
								interações permitem conhecer a distribuição geográfica
								das espécies, além de serem úteis em projetos de gestão
								de áreas para o manejo e conservação da vida silvestre e
								documentação de espécies novas e raras. Por último, o
								registro espacial das espécies é uma informação útil
								para a identificação taxonômica pelos especialistas.
							</Label>
							<Text style={styles.TitleTermsOfUse}>
								Dados Pessoais: Data nascimento, gênero e escolaridade
							</Text>
							<Label style={styles.TextTermsOfUse}>
								Os Guardiões da Biodiversidade tem por objetivo prover
								um ambiente onde voluntários de projetos de Ciência
								Cidadã e amantes da natureza possam compartilhar suas
								fotos, informações e conhecimento sobre a biodiversidade
								brasileira, com foco na interação animal-planta. Como o
								aplicativo é voltado para o público em geral, obter
								informações sobre data de nascimento, gênero e
								escolaridade são importantes para conhecermos melhor o
								perfil dos usuários e melhorar cada vez mais suas
								experiências com o sistema.
							</Label>
							<Text style={styles.TitleTermsOfUse}>Conta</Text>
							<Label style={styles.TextTermsOfUse}>
								Ao se cadastrar no sistema como Guardião, você é
								responsável por todas as atividades realizadas em sua
								conta e pelo conteúdo publicado. Os Guardiões da
								Biodiversidade poderão remover qualquer conteúdo que
								considerem inapropriado, ou bloquear a conta de usuários
								que publiquem conteúdos inadequados. Você pode e deve
								nos notificar sobre qualquer conteúdo publicado no
								sistema que considere inapropriado ou ilegal. Você
								também deve nos avisar imediatamente sobre o uso não
								autorizado de sua conta ou qualquer outra violação de
								segurança. Guardião pode enviar ao sistema tantas
								observações quanto quiser e também pode excluir
								observações enviadas por ele, se assim desejar, desde
								que os especialistas não tenham ainda identificado os
								espécimes nas fotos enviadas. Observações excluídas não
								ficam mais visíveis aos demais usuários. As observações
								recebem automaticamente a autoria do usuário da conta da
								qual foram enviadas. Se você enviar observações de
								terceiros usando sua conta, fique ciente de que a
								autoria estará em seu nome, não sendo possível
								alterá-la. Assim, se você enviar observações de
								terceiros usando sua conta, recomendamos que você
								obtenha primeiro as autorizações necessárias. A melhor
								opção seria convidar a pessoa a se cadastrar nos
								Guardiões da Biodiversidade para aumentar a nossa
								comunidade! O mesmo acontece com as identificações, ou
								seja, as autorias são atribuídas automaticamente a
								partir das contas das quais foram feitas.
							</Label>
							<Text style={styles.TitleTermsOfUse}>
								Encerramento da conta
							</Text>
							<Label style={styles.TextTermsOfUse}>
								Você pode, a qualquer momento, encerrar a sua conta no
								sistema. Com a conta desativada, você não poderá mais
								enviar observações e fazer identificações. Porém, todas
								as observações e identificações feitas por você no
								sistema serão preservadas e continuarão visíveis para as
								pessoas. Você poderá reativar sua conta entrando em
								contato com a equipe dos Guardiões da Biodiversidade.
							</Label>
							<Text style={styles.TitleTermsOfUse}>
								Uso das informações
							</Text>
							<Label style={styles.TextTermsOfUse}>
								Ao enviar conteúdo para o sistema: Você concede aos
								Guardiões da Biodiversidade o direito de publicá-lo com
								o propósito de divulgar suas observações a qualquer
								pessoa que tenha interesse em acessar o sistema.
								Atualmente, o conteúdo é publicado como observação
								individual e na forma de gráficos, tabelas, listas, mapa
								e fotos. Você concorda que suas observações e
								identificações associadas podem ser usadas por
								cientistas, gestores ambientais, tomadores de decisão,
								entre outros interessados, para subsidiar trabalhos
								relacionados a entender melhor sobre as interações e
								organismos envolvidos, visando a conservação, manejo e
								uso sustentável dos bens naturais
							</Label>
							<Text style={styles.TitleTermsOfUse}>
								Nossas responsabilidades
							</Text>
							<Label style={styles.TextTermsOfUse}>
								Os Guardiões da Biodiversidade se responsabilizam por
								manter a integridade dos dados e o sistema de informação
								online em funcionamento e disponível para acesso aberto,
								realizar procedimentos de rotina de manutenção e backup,
								além de garantir e corrigir eventuais erros do sistema.
							</Label>
							<Text style={styles.TitleTermsOfUse}>Mudanças</Text>
							<Label style={styles.TextTermsOfUse}>
								Os Guardiões da Biodiversidade poderão, no futuro,
								oferecer novos serviços e recursos. Tais serviços e
								recursos estarão sujeitos aos termos e condições desta
								política de participação.
							</Label>
							<Text style={styles.TitleTermsOfUse}>Dúvidas</Text>
							<Label style={styles.TextTermsOfUse}>
								Em caso de dúvidas sobre os termos e condições desta
								política de participação ou uso do sistema, entre em
								contato no fale conosco.
							</Label>
							<Text></Text>
							<Label></Label>
						</ScrollView>
					</Content>
				</Modal>
				<Header>
					<Left>
						<Button
							transparent
							onPress={() => this.props.navigation.navigate("Login")}
						>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Title>{this.state.TituloCadastro}</Title>
					</Body>
					<Right />
				</Header>

				<Content>
					<Form>
						<View style={stylesCamera.container}>
							<TouchableOpacity
								onPress={this.selectPhotoTapped.bind(this)}
							>
								<View style={styles.ImageContainer}>
									<Image
										style={styles.ImageContainer}
										source={this.state.ImageSource}
									/>
								</View>
							</TouchableOpacity>
						</View>
						<View>
							<Item floatingLabel error={this.state.inputFullNameError}>
								<Label style={styles.LabelDefault}>
									{this.state.NomeCompletoTexto}
								</Label>
								<Input
									onChangeText={(text) => {
										this.setState({ NomeCompleto: text });
									}}
									onEndEditing={(event) => this.validateFullName()}
								/>
							</Item>
							{this.state.inputFullNameError ? (
								<Label style={styles.LabelError}>
									{this.state.inputFullNameErrorMessage}
								</Label>
							) : (
								<Label></Label>
							)}
						</View>
						<View>
							<Item floatingLabel error={this.state.inputUserNameError}>
								<Label style={styles.LabelDefault}>
									{this.state.ComoQuerSerChamadoTexto}
								</Label>
								<Input
									onChangeText={(text) => {
										this.setState({ NomeUsuario: text });
									}}
									onEndEditing={(event) => this.validateUserName()}
								/>
							</Item>
							{this.state.inputUserNameError ? (
								<Label style={styles.LabelError}>
									{this.state.inputUserNameErrorMessage}
								</Label>
							) : (
								<Label></Label>
							)}
						</View>
						<View style={{ marginTop: 5, marginLeft: 0 }}>
							<Label style={styles.LabelDataNascimento}>
								{this.state.DataNascimentoTexto}
							</Label>
							<DatePicker
								style={styles.InputDataNascimento}
								customStyles={{
									dateInput: {
										borderLeftWidth: 0,
										borderRightWidth: 0,
										borderTopWidth: 0,
										borderBottomWidth: 0.4,
										alignItems: "flex-start",
									},
									dateText: { fontSize: 16, color: "black" },
								}}
								date={this.state.DataNascimento}
								mode="date"
								format="DD/MM/YYYY"
								minDate="01/01/1900"
								maxDate="31/12/2100"
								confirmBtnText="Confirmar"
								cancelBtnText="Cancelar"
								showIcon={false}
								onDateChange={(date) => {
									this.setState({ DataNascimento: date });
								}}
							/>
						</View>
						<View>
							<Item floatingLabel error={this.state.inputEmailError}>
								<Label style={styles.LabelEmail}>
									{this.state.EmailTexto}
								</Label>
								<Input
									onChangeText={(text) => {
										this.setState({ Email: text });
									}}
									onEndEditing={(event) => this.validateEmail()}
									keyboardType="email-address"
								/>
							</Item>
							{this.state.inputEmailError ? (
								<Label style={styles.LabelError}>
									{this.state.inputEmailErrorMessage}
								</Label>
							) : (
								<Label></Label>
							)}
						</View>
						<View>
							<ModalSelector
								data={generos}
								cancelText="Cancelar"
								initValue={this.state.GeneroTexto}
								optionTextStyle={{ color: "black" }}
								onChange={(option) => {
									this.validateGenre(option.label, option.key);
								}}
							>
								<Item floatingLabel error={this.state.inputGeneroError}>
									<Label style={styles.LabelDefault}>
										{this.state.GeneroTexto}
									</Label>
									<Input
										editable={false}
										value={this.state.GeneroLabel}
										onEndEditing={(event) =>
											this.validateGenre(option.label, option.key)
										}
									/>
								</Item>
								{this.state.inputGeneroError ? (
									<Label style={styles.LabelError}>
										{this.state.inputGeneroErrorMessage}
									</Label>
								) : (
									<Label></Label>
								)}
							</ModalSelector>
						</View>
						<View>
							<ModalSelector
								data={escolaridades}
								cancelText="Cancelar"
								initValue={this.state.EscolaridadeTexto}
								optionTextStyle={{ color: "black" }}
								onChange={(option) => {
									this.validateEscolaridade(option.label, option.key);
								}}
							>
								<Item
									floatingLabel
									error={this.state.inputEscolaridadeError}
								>
									<Label style={styles.LabelDefault}>
										{this.state.EscolaridadeTexto}
									</Label>
									<Input
										editable={false}
										value={this.state.EscolaridadeLabel}
										onEndEditing={(event) =>
											this.validateEscolaridade(
												option.label,
												option.key
											)
										}
									/>
								</Item>
								{this.state.inputEscolaridadeError ? (
									<Label style={styles.LabelError}>
										{this.state.inputEscolaridadeErrorMessage}
									</Label>
								) : (
									<Label></Label>
								)}
							</ModalSelector>
						</View>
						<View>
							<ModalSelector
								data={idiomas}
								cancelText="Cancelar"
								initValue={this.state.IdiomaTexto}
								optionTextStyle={{ color: "black" }}
								onChange={(option) => {
									this.validateIdioma(option.label, option.key);
								}}
							>
								<Item floatingLabel error={this.state.inputIdiomaError}>
									<Label style={styles.LabelDefault}>
										{this.state.IdiomaTexto}{" "}
									</Label>
									<Input
										editable={false}
										value={this.state.IdiomaLabel}
										onEndEditing={(event) =>
											this.validateIdioma(option.label, option.key)
										}
									/>
								</Item>
								{this.state.inputIdiomaError ? (
									<Label style={styles.LabelError}>
										{this.state.inputIdiomaErrorMessage}
									</Label>
								) : (
									<Label></Label>
								)}
							</ModalSelector>
						</View>
						<View>
							<Item floatingLabel error={this.state.inputPasswordError}>
								<Label style={styles.LabelDefault}>
									{this.state.SenhaTexto}
								</Label>
								<Input
									secureTextEntry={this.state.password}
									onChangeText={(text) => {
										this.setState({ Senha: text });
									}}
									onEndEditing={(event) => this.ValidatePassword()}
								/>
							</Item>
							<IconFontAwesome
								name={this.state.icEye}
								style={styles.icon}
								size={23}
								onPress={this.changePwdType}
							/>
							{this.state.inputPasswordError ? (
								<Label style={styles.LabelError}>
									{this.state.inputPasswordErrorMessage}
								</Label>
							) : (
								<Label></Label>
							)}
						</View>
						<View>
							<Item
								floatingLabel
								error={this.state.inputConfirmPasswordError}
							>
								<Label style={styles.LabelDefault}>
									{this.state.ConfirmarSenhaTexto}
								</Label>
								<Input
									secureTextEntry={this.state.password}
									onChangeText={(text) => {
										this.setState({ ConfirmarSenha: text });
									}}
									onEndEditing={(event) =>
										this.ValidateConfirmPassword()
									}
								/>
							</Item>
							{this.state.inputConfirmPasswordError ? (
								<Label style={styles.LabelError}>
									{this.state.inputConfirmPasswordErrorMessage}
								</Label>
							) : (
								<Label></Label>
							)}
						</View>
						<ListItem>
							<CheckBox
								color="#000"
								checked={this.state.Agreement}
								onPress={() => this.selectAgreement()}
							/>
							<Body>
								<Text
									style={styles.LabelDefault}
									onPress={() => {
										this.setState({ modalMap: true });
									}}
								>
									{this.state.ConfirmoAceitarTermosUsoGuardiao}
								</Text>
							</Body>
						</ListItem>

						<Button
							guardioes
							style={styles.ButtonRegister}
							disabled={this.state.disabledButtonRegister}
							onPress={this.RegisterUser}
						>
							<Text style={styles.TextRegister}>
								{this.state.Cadastrar}
							</Text>
						</Button>
					</Form>
					<Spinner
						visible={this.state.visible}
						textContent={this.state.Aguarde}
						textStyle={{ color: "#FFF" }}
					/>
				</Content>
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

export default RegisterUserView;
