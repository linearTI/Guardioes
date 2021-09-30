import React, { Component } from "react";

import { 
  Content, Card, CardItem, Text, Body,
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
  InputGroup
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
} from "react-native";

import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import StorageManager from "../../storage/StorageManager";
import ImagePicker from "react-native-image-picker";
import ModalSelector from 'react-native-modal-selector';
import Functions from "../../helpers/functions";
import Constants from "../../helpers/constants";
import DatePicker from "react-native-datepicker";
import style from "react-native-modal-selector/style";
import styles from "./styles";
import Spinner from 'react-native-loading-spinner-overlay';
import Toast, {DURATION} from 'react-native-easy-toast';
import { EventRegister } from 'react-native-event-listeners';
import translate from "../../helpers/translate";
import Moment from 'moment';

const imgUser = require("../../../assets/default-user.png");
export default class tabProfile extends Component {
  state = { 
    Continue: true,
    ImageSource: imgUser,    
    ImageData: "",
    GeneroLabel: "",
    GeneroKey: "",
    Generos: translate.valGeneros(), 
    Escolaridades: translate.valEscolaridades(), 
    EscolaridadeLabel: "",
    EscolaridadeKey: "",
    IdiomaLabel: "",
    IdiomaKey: "",
    NomeCompleto: "",
    NomeUsuario: "",
    Email: "",
    AppCode: "",
    DataNascimento: "01/01/1990",
    inputEmailError: false,
    inputEmailErrorMessage: "",
    inputFullNameError: false,
    inputFullNameErrorMessage: "",
    inputUserNameError: false,
    inputUserNameErrorMessage: "",
    inputEscolaridadeError: false,
    inputEscolaridadeErrorMessage: "",
    inputGeneroError: false,
    inputGeneroErrorMessage: "",
    inputIdiomaError: false,
    inputIdiomaErrorMessage: "",
    CompletedRegistration: false,
    AlertPeriod: "",
    Comments: "",
    Agreement: 0,
    Curriculum: "",
    IsAuthenticated: false,
    Network: "",
    IdNetwork: "",
    visible: true,
    Expertises: "",
    MessageLoading: translate.val("BuscandoInformacoes"),
    Password: "",
    CampoObrigatorio: translate.val("CampoObrigatorio"),
    EmailInvalido: translate.val("EmailInvalido"),
    ErroAtualizarInformacoes: translate.val("ErroAtualizarInformacoes"),
    ErroAtualizarInformacoesApi: translate.val("ErroAtualizarInformacoesApi"),
    ErroCarregarPerfilApi: translate.val("ErroCarregarPerfilApi"),
    NomeCompletoTexto: translate.val("NomeCompleto"),
    ComoQuerSerChamadoTexto: translate.val("ComoQuerSerChamado"),
    DataNascimentoTexto: translate.val("DataNascimento"),
    EmailTexto: translate.val("Email"),
    GeneroTexto: translate.val("Genero"),
    EscolaridadeTexto: translate.val("Escolaridade"),
    IdiomaTexto: translate.val("Idioma"),
    SalvarTexto: translate.val("Salvar"),
    InformacoesAtualizadasSucesso: translate.val("InformacoesAtualizadasSucesso"),
    IdiomaList: translate.valIdiomas(),
    TermosUsoLidoAceitoGuardiao: translate.val("TermosUsoLidoAceitoGuardiao"),
    DataTermosUsoLidoAceitoGuardiao: ""

  };
  
  constructor(props){
    super(props);
    this.UpdateUser = this.UpdateUser.bind(this);
    var conn = StorageManager.getConnection();    
    conn.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM GuardianModel",
        [],
        (_, results) => {
          if(results.rows.length > 0){            
            let row = results.rows.item(0);
            this.setState({
              AppCode: row.AppCode,
              CompletedRegistration: row.CompletedRegistration,
              IsAuthenticated: row.IsAuthenticated,
              NomeCompleto: row.Name,
              Network: row.Network,
              Password: row.Password,
              IdNetwork: row.IdNetwork
            });
            if(!Functions.isNullOrEmpty(row.Picture)){
              this.setState({                
                ImageSource: { uri: 'data:image/jpeg;base64,' + row.Picture },
                ImageData: row.Picture
              });
            }      
            
            if(!Functions.isNullOrEmpty(row.Idioma)){
              for(let idioma of this.state.IdiomaList){
                if(Functions.isEquals(idioma.key, row.Idioma))
                {
                  this.setState({
                    IdiomaLabel: idioma.label,
                    IdiomaKey: idioma.key
                  });
                  translate.setLanguage(idioma.key);
                }
              }
            }
            this.getInfoUser();
          }        
        }
      );
    });
  }
  componentWillMount() {
    translate.setLanguage(this.state.IdiomaKey);
    this.listenerLanguage = EventRegister.addEventListener('Language', (data) => {
      this.setState({
        CampoObrigatorio: translate.val("CampoObrigatorio"),
        MessageLoading: translate.val("BuscandoInformacoes"),
        EmailInvalido: translate.val("EmailInvalido"),
        ErroAtualizarInformacoes: translate.val("ErroAtualizarInformacoes"),
        ErroAtualizarInformacoesApi: translate.val("ErroAtualizarInformacoesApi"),
        ErroCarregarPerfilApi: translate.val("ErroCarregarPerfilApi"),
        ErroCarregarPerfilApi: translate.val("ErroCarregarPerfilApi"),
        NomeCompletoTexto: translate.val("NomeCompleto"),
        ComoQuerSerChamadoTexto: translate.val("ComoQuerSerChamado"),
        DataNascimentoTexto: translate.val("DataNascimento"),
        EmailTexto: translate.val("Email"),
        GeneroTexto: translate.val("Genero"),
        EscolaridadeTexto: translate.val("Escolaridade"),
        IdiomaTexto: translate.val("Idioma"),
        SalvarTexto: translate.val("Salvar"),
        InformacoesAtualizadasSucesso: translate.val("InformacoesAtualizadasSucesso"),
        Generos: translate.valGeneros(), 
        Escolaridades: translate.valEscolaridades(), 
        IdiomaList: translate.valIdiomas(),
        TermosUsoLidoAceitoGuardiao: translate.val("TermosUsoLidoAceitoGuardiao")
      });
    });
  }
  // componentWillUnmount() {
  //   EventRegister.removeEventListener(this.listener);
  //   EventRegister.removeEventListener(this.listenerLanguage);
  // }  
  getInfoUser()
  {
  
    if(!this.state.IsAuthenticated){
      this.setState({visible: false});
      return;
    }
    translate.setLanguage(this.state.IdiomaKey);

    var Api = Constants.getApi();

    Functions.trustFetch(Api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'profile',
        appcode: this.state.AppCode
      }),
    })
    .then((response) => {           
      var responseJson = response.json();
      let picture = responseJson.picture;
      let dataNascimento = responseJson.birth_day + "/" + responseJson.birth_month + "/" + responseJson.birth_year;
      let labelIdioma;
      let keyIdioma;
      let labelGenero;
      let keyGenero;
      let labelEscolaridade;
      let keyEscolaridade;
      //alert(JSON.stringify(this.state.IdiomaList));
      for(let idioma of this.state.IdiomaList){
        if(Functions.isEquals(idioma.key, responseJson.language))
        {
          labelIdioma = idioma.label;
          keyIdioma = idioma.key;
        }        
      }

      for(let escolaridade of this.state.Escolaridades){
        if(Functions.isEquals(escolaridade.key, responseJson.education))
        {
          labelEscolaridade = escolaridade.label;
          keyEscolaridade = escolaridade.key;
        }
      }

      for(let genero of this.state.Generos){
        if(Functions.isEquals(genero.key, responseJson.gender))
        {
          labelGenero = genero.label;
          keyGenero = genero.key;
        }
      }

      if(Functions.isEquals(dataNascimento, "//"))
        dataNascimento = "01/01/1990";
      
      if(Functions.isNullOrEmpty(picture)){
        var conn = StorageManager.getConnection();
        this.setState({visible: true});
        conn.transaction(tx => {
          tx.executeSql(
            "SELECT Picture FROM GuardianModel",
            [],
            (_, results) => {
              let imageData = "";
              this.setState({visible: false});
              if(results.rows.length > 0 && !Functions.isNullOrEmpty(results.rows.item(0).Picture)){
                picture = { uri: 'data:image/jpeg;base64,' + results.rows.item(0).Picture };
                imageData = results.rows.item(0).Picture;
              }        
              else{
                picture = imgUser;
              }
              this.setState({                
                ImageSource: picture,
                ImageData: imageData
              });
            }
          );
        });
      } 
      else{                
        this.setState({                
          ImageSource: {uri: 'data:image/jpeg;base64,' + picture},
          ImageData: picture
        });
      }         
  
      this.setState({
        DataNascimento: dataNascimento,
        Email: responseJson.email,
        NomeCompleto: responseJson.name,
        NomeUsuario: responseJson.nickname,
        GeneroLabel: labelGenero,
        EscolaridadeLabel: labelEscolaridade,
        IdiomaLabel: labelIdioma,
        GeneroKey: keyGenero,
        IdiomaKey: keyIdioma,
        EscolaridadeKey: keyEscolaridade,
        Comments: responseJson.comments,
        Agreement: responseJson.agreement,
        Expertises: responseJson.expertise,
        Curriculum: responseJson.curriculum,
        AlertPeriod: responseJson.alert_period,
        CampoObrigatorio: translate.val("CampoObrigatorio"),
        MessageLoading: translate.val("BuscandoInformacoes"),
        EmailInvalido: translate.val("EmailInvalido"),
        ErroAtualizarInformacoes: translate.val("ErroAtualizarInformacoes"),
        ErroAtualizarInformacoesApi: translate.val("ErroAtualizarInformacoesApi"),
        ErroCarregarPerfilApi: translate.val("ErroCarregarPerfilApi"),
        ErroCarregarPerfilApi: translate.val("ErroCarregarPerfilApi"),
        NomeCompletoTexto: translate.val("NomeCompleto"),
        ComoQuerSerChamadoTexto: translate.val("ComoQuerSerChamado"),
        DataNascimentoTexto: translate.val("DataNascimento"),
        EmailTexto: translate.val("Email"),
        GeneroTexto: translate.val("Genero"),
        EscolaridadeTexto: translate.val("Escolaridade"),
        IdiomaTexto: translate.val("Idioma"),
        SalvarTexto: translate.val("Salvar"),
        InformacoesAtualizadasSucesso: translate.val("InformacoesAtualizadasSucesso"),
        TermosUsoLidoAceitoGuardiao: translate.val("TermosUsoLidoAceitoGuardiao"),
        DataTermosUsoLidoAceitoGuardiao: Moment(response.Date).format('DD/MM/YYYY')
      });
      
      this.setState({visible: false});
    })    
    .catch((error) =>{
      this.setState({visible: false});      
      alert(this.state.ErroCarregarPerfilApi + error);
    });
  }

  validateEmail()
  {
    let correto = false;
    if(Functions.isNullOrEmpty(this.state.Email))
    {
      this.setState({inputEmailError: true});
      this.setState({inputEmailErrorMessage: this.state.CampoObrigatorio});
    }
    else if(!Functions.validateEmail(this.state.Email))
    {
      this.setState({inputEmailError: true});
      this.setState({inputEmailErrorMessage: this.state.EmailInvalido});
    }
    else
    {
      this.setState({inputEmailError: false});
      this.setState({inputEmailErrorMessage: ""});
      correto = true;
    }
    return correto;
  }

  validateFullName()
  {
    if(Functions.isNullOrEmpty(this.state.NomeCompleto))
    {
      this.setState({inputFullNameError: true});
      this.setState({inputFullNameErrorMessage: this.state.CampoObrigatorio});
      return false;
    }
    else
    {
      this.setState({inputFullNameError: false});
      this.setState({inputFullNameErrorMessage: ""});
      return true;
    }    
  }

  validateUserName()
  {
    if(Functions.isNullOrEmpty(this.state.NomeUsuario))
    {
      this.setState({inputUserNameError: true});
      this.setState({inputUserNameErrorMessage: this.state.CampoObrigatorio});
      return false;
    }
    else
    {
      this.setState({inputUserNameError: false});
      this.setState({inputUserNameErrorMessage: ""});
      return true;
    }
  }
  
  validateGenre(label, key)
  {
    this.setState({GeneroLabel:label, GeneroKey:key}); 
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

  validateIdioma(label, key)
  {
    this.setState({IdiomaKey:key, IdiomaLabel:label})
    if(Functions.isEquals(label, "Selecione"))
    {
      this.setState({inputIdiomaError: true});
      this.setState({inputIdiomaErrorMessage: this.state.CampoObrigatorio});
      return false;
    }
    else
    {
      this.setState({inputIdiomaError: false});
      this.setState({inputIdiomaErrorMessage: ""});
      
      return true;
    }
  }

  validateEscolaridade(label, key)
  {
    this.setState({EscolaridadeKey:key, EscolaridadeLabel:label})
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

  UpdateUser()
  {
    let valid = true;
    // this.setState({visible: true});
    if(!this.validateEmail())
    {
      valid = false;
    }

    if(!this.validateFullName())
    {
      valid = false;
    }
    if(!this.validateUserName())
    {
      valid = false;
    }

    // if(!this.validateGenre(this.state.GeneroLabel, this.state.GeneroKey))
    // {
    //   valid = false;
    // }

    if(!this.validateIdioma(this.state.IdiomaLabel, this.state.IdiomaKey))
    {
      valid = false;
    }

    // if(!this.validateEscolaridade(this.state.EscolaridadeLabel, this.state.EscolaridadeKey))
    // {
    //   valid = false;
    // }


    if(valid)
    {
      if(this.state.IsAuthenticated)
      {
        this.callUpdateAPI();
      } 
      else
      {
        this.setState({visible: true});
        var api = Constants.getApi();
        var objAjax = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'register',
            network: this.state.Network,
            netid: this.state.IdNetwork,
            email: this.state.Email,
            appcode: this.state.AppCode,
            name: this.state.NomeCompleto,
          }),
        };
  
        Functions.trustFetch(api, objAjax).then((response) => {      
          var responseJson = response.json();      
          if(responseJson.status == "old" || responseJson.status == "new")
          {
            EventRegister.emit('Authenticated', true);
            this.callUpdateAPI();            
          }
          else
          {
            this.setState({visible: false});       
            this.refs.toast.show(this.state.ErroAtualizarInformacoes, DURATION.LENGTH_LONG);     
          }
        })    
        .catch((error) =>{
          this.setState({visible: false});
          console.error(error);
          alert(error);
        });
      }
    }
    else
    {
      this.setState({visible: false});       
      this.refs.toast.show(this.state.ErroAtualizarInformacoes, DURATION.LENGTH_LONG);     
    }
  }

  callUpdateAPI(){
    let retorno;
    this.setState({visible: true});
    let dataNascimento = this.state.DataNascimento.split('/');
    var Api = Constants.getApi();
    
    this.setState({MessageLoading: translate.val("AtualizandoInformacoes")});    
    Functions.trustFetch(Api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'update_profile',
        appcode: this.state.AppCode,
        language: this.state.IdiomaKey,
        birth_day:dataNascimento[0],
        birth_month:dataNascimento[1],
        birth_year:dataNascimento[2],
        name:this.state.NomeCompleto,
        nickname:this.state.NomeUsuario,
        education:this.state.EscolaridadeKey,
        gender: this.state.GeneroKey,
        email: this.state.Email,
        picture: this.state.ImageData,
        agreement: this.state.Agreement,
        curriculum: this.state.Curriculum,
        comments: this.state.Comments,
        expertise: this.state.Expertises,
        password: this.state.Password,
        alert_period: this.state.AlertPeriod
      }),
    })
    .then((response) => {
      let responseJson = response.json();
      if(Functions.isNullOrEmpty(JSON.stringify(responseJson)))
      {
        alert("Erro ao ler o retorno da API.");
      }
      else if(responseJson.status == "ok")
      {
        var conn = StorageManager.getConnection();
        conn.transaction(tx => {
          tx.executeSql(
            'UPDATE GuardianModel SET  Name=?, Email=?,  NameUser=?, Picture=?, DataNascimento=?, Escolaridade=?, Genero=?, Idioma=?, Password=?, CompletedRegistration=?, IsAuthenticated = ? WHERE AppCode=?',
            [this.state.NomeCompleto,this.state.Email, this.state.NomeUsuario, this.state.ImageData, this.state.DataNascimento, this.state.EscolaridadeLabel, this.state.GeneroLabel, this.state.IdiomaKey, this.state.Password, true, true, this.state.AppCode], 
            (_, results) => 
            {
              this.setState({
                isLoggedIn: true
              });
              this.setState({visible: false});
              this.setState({IsAuthenticated: true});
              this.refs.toast.show(this.state.InformacoesAtualizadasSucesso, DURATION.LENGTH_LONG);
              EventRegister.emit('SetProfileImage', {name: this.state.NomeCompleto, email: this.state.Email, image: this.state.ImageData, network: this.state.Network });
              translate.setLanguage(this.state.IdiomaKey);
            },
            (error) => 
            {
              this.setState({visible: false});       
              this.refs.toast.show(this.state.ErroAtualizarInformacoes, DURATION.LENGTH_LONG);     
            }
          );
        });
        // alert(this.state.InformacoesAtualizadasSucesso);
      }
      else
      {
        this.setState({visible: false});       
        this.refs.toast.show(this.state.ErroAtualizarInformacoes, DURATION.LENGTH_LONG);     
      }
    })
    .catch((error) =>{
      this.setState({visible: false});       
      alert("retorno: " + JSON.stringify(error));     
    });
    
  }
  selectPhotoTapped() 
  {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      title: "Selecione a origem da foto:",
      takePhotoButtonTitle: "Câmera",
      chooseFromLibraryButtonTitle: "Galeria",
      cancelButtonTitle: "CANCELAR",
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: 'data:image/jpeg;base64,' + response.data };   
        this.setState({
          ImageSource: source,
          ImageData: response.data
        });
      }
    });
  }
  render() {
    return (
      <Container>

        <Content padder>
          <Form>
            <View style={stylesCamera.container}>
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                  <View style={styles.ImageContainer}>
                    { this.state.ImageSource === null ? <Text></Text> :
                      <Image style={styles.ImageContainer} source={this.state.ImageSource} />
                    }                
                  </View>
                </TouchableOpacity>
            </View>
            <View>
              <Item floatingLabel
                error={this.state.inputFullNameError}
              >
                <Label style={styles.LabelDefault}>{this.state.NomeCompletoTexto}</Label>
                <Input 
                  value={this.state.NomeCompleto}
                  onChangeText={(text) => {                                    
                    this.setState({NomeCompleto: text});
                  }}
                  onEndEditing={ (event) => this.validateFullName() }
                />
              </Item>
              {
                this.state.inputFullNameError ?
                  <Label style={styles.LabelError}>{this.state.inputFullNameErrorMessage}</Label>
                :
                  <Label></Label>
              }
            </View>
            <View>
              <Item floatingLabel
                error={this.state.inputUserNameError}
              >
                <Label style={styles.LabelDefault}>{this.state.ComoQuerSerChamadoTexto}</Label>
                <Input 
                  value={this.state.NomeUsuario}
                  onChangeText={(text) => {                                    
                    this.setState({NomeUsuario: text});
                  }}
                  onEndEditing={ (event) => this.validateUserName() }
                />
              </Item> 
              {
                this.state.inputUserNameError ?
                  <Label style={styles.LabelError}>{this.state.inputUserNameErrorMessage}</Label>
                :
                  <Label></Label>
              }
            </View>
            <View>
              <Label style={styles.LabelDataNascimento}>{this.state.DataNascimentoTexto}</Label>
              <DatePicker
                style={styles.InputDataNascimento}
                customStyles={{
                  dateInput:{borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomWidth: 0.4, alignItems: 'flex-start'},
                  dateText: { fontSize: 16, color: "black" }
                }}
                date={this.state.DataNascimento}
                mode="date"
                format="DD/MM/YYYY"
                minDate="01/01/1900"
                maxDate="31/12/2100"
                confirmBtnText="Confirmar"
                cancelBtnText="Cancelar"
                showIcon={false}
                onDateChange={(date) => {this.setState({DataNascimento: date})}}
              />
            </View>
            <View>
              <Item floatingLabel
                error={this.state.inputEmailError}
              >
                <Label style={styles.LabelEmail}>{this.state.EmailTexto}</Label>
                <Input
                  editable={!this.state.IsAuthenticated}
                  value={this.state.Email}
                  onChangeText={(text) => {                                    
                    this.setState({Email: text});
                  }}
                  onEndEditing={ (event) => this.validateEmail() }
                  keyboardType='email-address'
                />
              </Item>
              {
                this.state.inputEmailError ?
                  <Label style={styles.LabelError}>{this.state.inputEmailErrorMessage}</Label>
                :
                  <Label></Label>
              }
            </View>
            <View>
              <ModalSelector
                  data={this.state.Generos}
                  cancelText="Cancelar"
                  initValue="54"                      
                  optionTextStyle={{color: "black"}}
                  onChange={option => { this.validateGenre(option.label, option.key) }}>   
                  <Item floatingLabel
                    error={this.state.inputGeneroError}
                  >
                    <Label style={styles.LabelDefault}>{this.state.GeneroTexto}</Label>
                    <Input 
                      editable={false}
                      value={this.state.GeneroLabel}
                      onEndEditing={ (event) => this.validateGenre(option.label, option.key) }
                    />
                  </Item>     
                  {
                    this.state.inputGeneroError ?
                      <Label style={styles.LabelError}>{this.state.inputGeneroErrorMessage}</Label>
                    :
                      <Label></Label>
                  }              
              </ModalSelector>
            </View>   
            <View>
              <ModalSelector
                  data={this.state.Escolaridades}
                  cancelText="Cancelar"
                  initValue="Escolaridade"     
                  optionTextStyle={{color: "black"}}                 
                  onChange={option => { this.validateEscolaridade(option.label,option.key) }}>   
                  <Item floatingLabel
                    error={this.state.inputEscolaridadeError}
                  >
                    <Label style={styles.LabelDefault}>{this.state.EscolaridadeTexto}</Label>
                    <Input 
                      editable={false}
                      value={this.state.EscolaridadeLabel}
                      onEndEditing={ (event) =>  this.validateEscolaridade(option.label,option.key)  }  
                    />
                  </Item>    
                  {
                    this.state.inputEscolaridadeError ?
                      <Label style={styles.LabelError}>{this.state.inputEscolaridadeErrorMessage}</Label>
                    :
                      <Label></Label>
                  }               
              </ModalSelector>
            </View>   
            <View>
              <ModalSelector
                  data={this.state.IdiomaList}
                  cancelText="Cancelar"
                  initValue="Idioma"     
                  optionTextStyle={{color: "black"}}                 
                  onChange={option => { this.validateIdioma(option.label,option.key)    }}>   
                  <Item floatingLabel
                    error={this.state.inputIdiomaError}
                  >
                    <Label style={styles.LabelDefault}>{this.state.IdiomaTexto}</Label>
                    <Input 
                      editable={false}
                      value={this.state.IdiomaLabel}
                      onEndEditing={ (event) =>  this.validateIdioma(option.label,option.key)  }
                    />
                  </Item> 
                  {
                    this.state.inputIdiomaError ?
                      <Label style={styles.LabelError}>{this.state.inputIdiomaErrorMessage}</Label>
                    :
                      <Label></Label>
                  }                   
              </ModalSelector>
            </View>

            <Label style={styles.LabelTermosUso}>{this.state.TermosUsoLidoAceitoGuardiao} {this.state.DataTermosUsoLidoAceitoGuardiao}</Label>

            <Button guardioes style={styles.ButtonRegister}
              onPress={this.UpdateUser}
            >
              <Text style={styles.TextSaveUser}>
                {this.state.SalvarTexto}
              </Text>
            </Button>
          </Form>
          <Spinner visible={this.state.visible} textContent={this.state.MessageLoading} textStyle={{color: '#FFF'}} />
            
        </Content>
        <Toast
          ref="toast"
          style={{backgroundColor:'black'}}
          position='top'
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{color:'white'}}
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
  }
});
