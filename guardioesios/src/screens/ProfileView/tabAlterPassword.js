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
import DatePicker from 'react-native-datepicker'
import style from "react-native-modal-selector/style";
import styles from "./styles";
import Spinner from 'react-native-loading-spinner-overlay';
import Toast, {DURATION} from 'react-native-easy-toast';
import { EventRegister } from 'react-native-event-listeners';
import translate from "../../helpers/translate";

export default class tabAlterPassword extends Component {

  state = { 
    Continue: true,  
    AppCode: "",
    Senha: "",
    icEye: 'eye-slash',
    IdiomaKey: "",
    ConfirmarSenha: "",
    inputPasswordError: false,
    inputPasswordErrorMessage: "",
    inputConfirmPasswordError: false,
    inputConfirmPasswordErrorMessage: "",
    MessageLoading: translate.val("AtualizandoInformacoes"),
    password:true,
    picture: "",    
    GeneroKey: "",
    EscolaridadeKey: "",
    NomeCompleto: "",
    NomeUsuario: "",
    Email: "",
    AppCode: "",
    DataNascimento: "01/01/1990",
    modalReady: false,
    modalMap: false,
    visible: false,
    EspecialidadesSelecionadas: [],
    Curriculum: "",
    Agreement: true,
    Comments: "",
    AlertPeriod: "",
    Expertises: "",
    CampoObrigatorio: translate.val("CampoObrigatorio"),
    SenhaTexto: translate.val("Senha"),
    ConfirmarSenhaTexto: translate.val("ConfirmarSenha"),
    AlterarTexto: translate.val("Alterar"),
    SenhasDiferentes: translate.val("SenhasDiferentes"),
    SenhaAlteradaSucesso: translate.val("SenhaAlteradaSucesso"),
    ErroAlterarSenha: translate.val("ErroAlterarSenha"),
    ErroAtualizarInformacoes: translate.val("ErroAtualizarInformacoes"),
  };


  componentDidMount()
  {
    this.listenerLanguage = EventRegister.addEventListener('Language', (data) => {
      this.setState({
        MessageLoading: translate.val("AtualizandoInformacoes"),
        CampoObrigatorio: translate.val("CampoObrigatorio"),
        SenhaTexto: translate.val("Senha"),
        ConfirmarSenhaTexto: translate.val("ConfirmarSenha"),
        AlterarTexto: translate.val("Alterar"),
        SenhasDiferentes: translate.val("SenhasDiferentes"),
        SenhaAlteradaSucesso: translate.val("SenhaAlteradaSucesso"),
        ErroAlterarSenha: translate.val("ErroAlterarSenha"),
        ErroAtualizarInformacoes: translate.val("ErroAtualizarInformacoes"),
      });
    });
  }


  constructor(props){
    super(props);

    this.UpdateUser = this.UpdateUser.bind(this);
    this.ValidatePassword = this.ValidatePassword.bind(this);
    this.ValidateConfirmPassword = this.ValidateConfirmPassword.bind(this);
    this.CheckPasswordEqualsConfirmPassword = this.CheckPasswordEqualsConfirmPassword.bind(this);

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
              IdiomaKey: row.IdiomaKey
            });
            this.getInfoUser();
          }        
        }
      );
    });
    translate.setLanguage(this.state.IdiomaKey);
  }
  componentWillMount() {
    translate.setLanguage(this.state.IdiomaKey);
    this.listenerLanguage = EventRegister.addEventListener('Language', (data) => {
      this.setState({
        CampoObrigatorio: translate.val("CampoObrigatorio"),
        MessageLoading: translate.val("AtualizandoInformacoes"),
        SenhaTexto: translate.val("Senha"),
        ConfirmarSenhaTexto: translate.val("ConfirmarSenha"),
        AlterarTexto: translate.val("Alterar"),
        SenhasDiferentes: translate.val("SenhasDiferentes"),      
        SenhaAlteradaSucesso: translate.val("SenhaAlteradaSucesso"),
        ErroAlterarSenha: translate.val("ErroAlterarSenha"),  
        ErroAtualizarInformacoes: translate.val("ErroAtualizarInformacoes"),
      });
    });
  }
  // componentWillUnmount() {
  //   EventRegister.removeEventListener(this.listener);
  //   EventRegister.removeEventListener(this.listenerLanguage);
  // }  
  getInfoUser()
  {
    
    let Api = Constants.getApi();
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
      let dataNascimento = responseJson.birth_day + "/" + responseJson.birth_month + "/" + responseJson.birth_year;

      this.setState({
        DataNascimento: dataNascimento,
        Email: responseJson.email,
        NomeCompleto: responseJson.name,
        NomeUsuario: responseJson.nickname,
        GeneroKey: responseJson.gender,
        IdiomaKey: responseJson.language,
        EscolaridadeKey: responseJson.education,
        Comments: responseJson.comments,
        Agreement: Boolean(responseJson.agreement),
        Expertises: responseJson.expertise,
        Curriculum: responseJson.curriculum,
        AlertPeriod: responseJson.alertPeriod,
        picture: responseJson.picture
      });

      this.setState({visible: false});

    })    
    .catch((error) =>{
      this.setState({visible: false});
      console.error(error);
      alert(error);
    });
  }

  changePwdType = () => {
    let newState;
    if (this.state.password) {
        newState = {
          icEye: 'eye',
          password: false
        }
    } else {
        newState = {
          icEye: 'eye-slash',
          password: true
        }
    }
    this.setState(newState)
  };

  ValidatePassword()
  {
    if(Functions.isNullOrEmpty(this.state.Senha))
    {
      this.setState({inputPasswordError: true});
      this.setState({inputPasswordErrorMessage: this.state.CampoObrigatorio});
    }
    else if(!Functions.isNullOrEmpty(this.state.ConfirmarSenha))
    {
      this.CheckPasswordEqualsConfirmPassword();
    }
    else
    {
      this.setState({inputPasswordError: false});
      this.setState({inputPasswordErrorMessage: ""});
    }
  }

  ValidateConfirmPassword()
  {
    if(Functions.isNullOrEmpty(this.state.ConfirmarSenha)) 
    {
      this.setState({inputConfirmPasswordError: true});
      this.setState({inputConfirmPasswordErrorMessage: this.state.CampoObrigatorio});
    }
    else if(!Functions.isNullOrEmpty(this.state.Senha))
    {
      this.CheckPasswordEqualsConfirmPassword();
    }
    else
    {
      this.setState({inputConfirmPasswordError: false});
      this.setState({inputConfirmPasswordErrorMessage: ""});
    }
  }

  CheckPasswordEqualsConfirmPassword()
  {
    var validPassword = Functions.isEquals(this.state.Senha, this.state.ConfirmarSenha);
    if(!validPassword)
    {
      this.setState({inputPasswordError: true});
      this.setState({inputConfirmPasswordError: true});
      this.setState({inputPasswordErrorMessage: this.state.SenhasDiferentes});
      this.setState({inputConfirmPasswordErrorMessage:  this.state.SenhasDiferentes});
    }
    else
    {
      this.setState({inputPasswordError: false});
      this.setState({inputConfirmPasswordError: false});
      this.setState({inputPasswordErrorMessage: ""});
      this.setState({inputConfirmPasswordErrorMessage: ""});
    }
    return validPassword;
  }

  UpdateUser()
  {
    
    var valid = true;
    if(Functions.isNullOrEmpty(this.state.Senha))
    {
      this.setState({inputPasswordError: true});
      this.setState({inputPasswordErrorMessage: this.state.CampoObrigatorio});
      valid=false;
    } 

    if(Functions.isNullOrEmpty(this.state.ConfirmarSenha)) 
    {
      this.setState({inputConfirmPasswordError: true});
      this.setState({inputConfirmPasswordErrorMessage: this.state.CampoObrigatorio});
      valid = false;
    }

    if(valid)
    {
      var validPassword = Functions.isEquals(this.state.Senha, this.state.ConfirmarSenha);
      if(!validPassword)
      {
        this.setState({inputPasswordError: true});
        this.setState({inputConfirmPasswordError: true});
        this.setState({inputPasswordErrorMessage:  this.state.SenhasDiferentes});
        this.setState({inputConfirmPasswordErrorMessage:  this.state.SenhasDiferentes});
      }
      else
      {
        this.setState({visible: true});
        let dataNascimento = this.state.DataNascimento.split('/');
        var Api = Constants.getApi();        
        Functions.trustFetch(Api, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'update_profile',
            appcode: this.state.AppCode,
            birth_day:dataNascimento[0],
            birth_month:dataNascimento[1],
            birth_year:dataNascimento[2],
            name:this.state.NomeCompleto,
            nickname:this.state.NomeUsuario,
            education:this.state.EscolaridadeKey,
            language: this.state.IdiomaKey,
            gender: this.state.GeneroKey,
            email: this.state.Email,
            picture: this.state.picture,
            agreement: this.state.Agreement,
            curriculum: this.state.Curriculum,
            comments: this.state.Comments,
            expertise: this.state.Expertises,
            alert_period: this.state.AlertPeriod,
            password: this.state.Senha

          }),
        })
        .then((response) => {
          let responseJson = response.json();
          if(responseJson.status == "ok")
          {
            var conn = StorageManager.getConnection();
            conn.transaction(tx => {
              tx.executeSql(
                'UPDATE GuardianModel SET Password=? WHERE AppCode=?',
                [this.state.Senha, this.state.AppCode], 
                (_, results) => 
                {
                  this.setState({
                    isLoggedIn: true,
                    Senha: "",
                    ConfirmarSenha: ""
                  });
                  this.setState({visible: false});
                  this.refs.toast.show(this.state.SenhaAlteradaSucesso, DURATION.LENGTH_LONG);
                },
                (error) => 
                {
                  this.setState({visible: false});       
                  this.refs.toast.show(this.state.ErroAlterarSenha, DURATION.LENGTH_LONG);     
                }
              );
            });
          }
          else
          {
            this.setState({visible: false});       
            alert(this.state.ErroAtualizarInformacoes);
          }
        }).catch((error) =>{
          this.setState({visible: false});       
          alert(this.state.ErroAtualizarInformacoes);
        });
      }
    }    
  }
  render() {
    
    return (
      <Container>
      <Content padder style={{ marginTop: 0 }}>
        <Form>
          <View>
            <Item floatingLabel
              error={this.state.inputPasswordError}
            >
              <Label>{this.state.SenhaTexto}</Label>
              <Input secureTextEntry={this.state.password} 
                value={this.state.Senha}
                onChangeText={(text) => {                                    
                  this.setState({Senha: text});
                }}
                onEndEditing={ (event) => this.ValidatePassword() }
              />
            </Item>
            <IconFontAwesome 
              name={this.state.icEye}
              style={styles.icon}
              size={23}
              onPress={this.changePwdType}
            />
            {
              this.state.inputPasswordError ?
                <Label style={styles.LabelError}>{this.state.inputPasswordErrorMessage}</Label>
              :
                <Label></Label>
            }      
          </View>
          <View>
            <Item floatingLabel
              error={this.state.inputConfirmPasswordError}
            >
              <Label>{this.state.ConfirmarSenhaTexto}</Label>
              <Input secureTextEntry={this.state.password} 
                value={this.state.ConfirmarSenha}
                onChangeText={(text) => {                                    
                  this.setState({ConfirmarSenha: text});
                }}
                onEndEditing={ (event) => this.ValidateConfirmPassword() }
              />
            </Item>
            {
              this.state.inputConfirmPasswordError ?
                <Label style={styles.LabelError}>{this.state.inputConfirmPasswordErrorMessage}</Label>
              :
                <Label></Label>
            }   
          </View>
          <Button guardioes style={styles.ButtonRegister}
            onPress={this.UpdateUser}
          >
            <Text style={styles.TextSavePassword}>
              {this.state.AlterarTexto}
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
