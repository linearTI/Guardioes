import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Body,
  Left,
  Right,
  Icon,
  Text,
  Form, 
  Item,
  Input,
  Label,
  View
} from "native-base";

import {StyleSheet, BackHandler} from "react-native";
import styles from "./styles";
import Functions from "../../helpers/functions";
import Constants from "../../helpers/constants";
import Spinner from 'react-native-loading-spinner-overlay';
import Toast, {DURATION} from 'react-native-easy-toast';
import translate from "../../helpers/translate";

class RecoverPasswordView extends Component
{
  state = { 
    Email: "",
    inputEmailError: false,
    inputEmailErrorMessage: "",
    visible: false,
    buttonDisabled: true,
    Message: "",
    CampoObrigatorio: translate.val("CampoObrigatorio"),
    EmailInvalido: translate.val("EmailInvalido"),
    RecuperarSenhaSucesso: translate.val("RecuperarSenhaSucesso"),
    RecuperarSenhaErro: translate.val("RecuperarSenhaErro"),
    RecuperarSenha: translate.val("RecuperarSenha"),
    EmailTexto: translate.val("Email"),
    Recuperar: translate.val("Recuperar"),
  };
  constructor(props) 
  {    
    super(props);
    this.RecoverPassword = this.RecoverPassword.bind(this);
  }

  validateEmail()
  {
    if(Functions.isNullOrEmpty(this.state.Email))
    {
      this.setState({inputEmailError: true});
      this.setState({inputEmailErrorMessage: this.state.CampoObrigatorio});
      this.setState({buttonDisabled: true});
    }
    else 
    {
      if(Functions.validateEmail(this.state.Email))
      {
        this.setState({inputEmailError: false});
        this.setState({inputEmailErrorMessage: ""}); 
        this.setState({buttonDisabled: false});
      }
      else
      {
        this.setState({inputEmailError: true});
        this.setState({inputEmailErrorMessage: this.state.EmailInvalido});
        this.setState({buttonDisabled: true});
      }      
    }
  }
  RecoverPassword()
  {
    this.setState({visible: true});
    var Api = Constants.getApi();
    Functions.trustFetch(Api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "action":"reset_password",
        "email": this.state.Email 
      }),
    })
    .then((response) => {         
      var responseJson = response.json();
      if(responseJson.status == 'ok')
      {
        this.setState({visible: false});
        this.refs.toast.show(this.state.RecuperarSenhaSucesso, DURATION.LENGTH_LONG);
      } 
      else
      {
        this.setState({visible: false});
        this.refs.toast.show(this.state.RecuperarSenhaErro, DURATION.LENGTH_LONG);
      }
    });         
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
        this.props.navigation.navigate("DrawerOpen");
        //this.props.navigation.navigate('NewContribution');
        return true;
    });
    this.listenerLanguage = EventRegister.addEventListener('Language', (data) => {
      this.setState({
        CampoObrigatorio: translate.val("CampoObrigatorio"),
        EmailInvalido: translate.val("EmailInvalido"),
        RecuperarSenhaSucesso: translate.val("RecuperarSenhaSucesso"),
        RecuperarSenhaErro: translate.val("RecuperarSenhaErro"),
        RecuperarSenha: translate.val("RecuperarSenha"),
        EmailTexto: translate.val("Email"),
        Recuperar: translate.val("Recuperar"),
      });
    });
  }
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('Login')}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Title style={styles.TitleRecoverPassword}>{this.state.RecuperarSenha}</Title>
          <Right />
        </Header>

        <Content>
          <Form >
            <View style={styles.LabelEmail}>
              <Item floatingLabel
                error={this.state.inputEmailError}
              >
                <Label >{this.state.EmailTexto}</Label>
                <Input
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
            <Spinner visible={this.state.visible} textContent={"Aguarde..."} textStyle={{color: '#FFF'}} />
          </Form>
          <Button guardioes style={styles.ButtonRecoverPassword}
              onPress={this.RecoverPassword}
          >
            <Text style={styles.TextRecoverPassword}>{this.state.Recuperar}</Text>
          </Button>
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
    backgroundColor: "#FFF8E1"
  }
});

export default RecoverPasswordView;
