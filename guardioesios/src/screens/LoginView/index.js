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
  Label
} from "native-base";

import {
  StackNavigator,
} from 'react-navigation';

import {
  StyleSheet,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  Platform, AsyncStorage,
} from "react-native";


import Spinner from 'react-native-loading-spinner-overlay';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import StorageManager from "../../storage/StorageManager";
import InstagramButton from "../../controls/InstagramButton";
import { EventRegister } from 'react-native-event-listeners';
import RNFetchBlob from 'react-native-fetch-blob';
import Toast, {DURATION} from 'react-native-easy-toast';
import styles from "./styles";
import Functions from "../../helpers/functions";
import Constants from "../../helpers/constants";
import translate from "../../helpers/translate";
import TwitterButton from "../../controls/TwitterButton";

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
  LoginManager
} = FBSDK;

class LoginView extends React.Component {

  state = {
    user: null,
    visible: false,
    icEye: 'eye-slash',
    password: true,
    inputEmailError: false,
    inputEmailErrorMessage: "",
    inputPasswordError: false,
    inputPasswordErrorMessage: "",
    Senha: "",
    Network:"",
    Nome:"",
    Email:"",
    IdNetwork:"",
    AppCode: "",
    urlpicture: "",
    IdUsuario: "",
    Login: translate.val('Login'),
    EsqueceuSenha: translate.val('EsqueceuSenha'),
    AcessarCom: translate.val('AcessarCom'),
    NovoCadastro: translate.val('NovoCadastro'),
    ErroLogin: translate.val('ErroLogin'),
    CampoObrigatorio: translate.val('CampoObrigatorio'),
    LabelEmail: translate.val('Email'),
    LabelSenha: translate.val('Senha'),
    Entrar: translate.val('Entrar'),
    LoginInstagram: translate.val('LoginInstagram'),
    ErroLoginNaoFoiPossivel: translate.val('ErroLoginNaoFoiPossivel'),
    EmailInvalido: translate.val('EmailInvalido'),
    ErroAPI: translate.val('ErroAPI'),
    NaoFoiPossivelLogar: translate.val('NaoFoiPossivelLogar'),
  };

  constructor(props) {
    super(props);
    this.RealizarLogin = this.RealizarLogin.bind(this);
    this.ValidatePassword = this.ValidatePassword.bind(this);
    this.Login = this.Login.bind(this);

    var conn = StorageManager.getConnection();    
    conn.transaction(tx => {
        tx.executeSql(
            "SELECT * FROM GuardianModel",
            [],
            (_, results) => {
                if(results.rows.length > 0){
                    let row = results.rows.item(0);
                    this.state.AppCode = row.AppCode;                    
                }        
            }
        );
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

  validateEmail()
  {
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
    }
  }

  async getKey() 
  {
    try 
    {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      alert("Value: " + value);
    }
    catch (error) 
    {
      console.log("Error retrieving data" + error);
    }
  }

  handleGoToLogin() 
  {
    this.props.navigator.push({
      title: this.state.Login,
      component: LoginView
    })
  }

  componentWillMount() {
    this.listener = EventRegister.addEventListener('ExternalLoginDone', (data) => {            
      this.props.navigation.navigate('NewContribution');
    });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);    
  }

  componentDidMount() 
  {
    this._setupGoogleSignin();
  }

  async _setupGoogleSignin() 
  {
    try 
    {
      if(Platform.OS === "android")
      {
        GoogleSignin.hasPlayServices({ autoResolve: true });
        GoogleSignin.configure({
          webClientId: Constants.GoogleSigninWebClientId(),
          offlineAccess: false,
          forceConsentPrompt: true
        });
       
      }
      else
      {
        GoogleSignin.configure({
          iosClientId:Constants.GoogleSigninIosClientId(),
          webClientId: Constants.GoogleSigninWebClientId(),
          offlineAccess: false,
          forceConsentPrompt: true
        });
      }
      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
      this.setState({user});
    }
    catch(err) {
      console.log("Play services error", err.code, err.message);
    }
  }

  _GoogleSignin() 
  {
    this.setState({visible: true});
    GoogleSignin.signIn()
    .then((user) => {

      this.setState({
        Nome: user.givenName,
        Email: user.email,
        IdNetwork: user.id,
        Network: "gmail",
        urlpicture: user.photo
      });      
      
      this.Login();
    })
    .catch((err) => {      
      alert(this.state.ErroLoginNaoFoiPossivel + ":" + JSON.stringify(err));
      this.setState({visible: false});
      console.log('WRONG SIGNIN', err);
    })
    .done();    
  }

  _GoogleSignOut() 
  {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
      this.setState({user: null});
    })
    .done();
  }

  SetUser(name, email, network, idNetwork, completedRegistration, idomaKey,IdUsuario)
  {
    this.setState({visible: true});
    var conn = StorageManager.getConnection();    
    conn.transaction(tx => {
      tx.executeSql(
        'UPDATE GuardianModel SET Name = ?, Email = ?, Network = ?, IdNetwork = ?, IsAuthenticated = ?,CompletedRegistration = ?, Password=?, Idioma = ?, IdUsuario = ?',
        [name, email, network, idNetwork, !Functions.isNullOrEmpty(email),completedRegistration,this.state.Senha, idomaKey, IdUsuario], 
        (_, results) => 
        {          
          this.setState({
            isLoggedIn: true,
            IdUsuario: IdUsuario
          });

          conn.transaction(tx => {
            tx.executeSql(
              'UPDATE ContributionModel SET IdUsuario = ? WHERE IdUsuario IS NULL',
              [IdUsuario], 
              (_, results) => 
              {          
                
              },
              (error) => {
                alert(this.state.ErroLoginNaoFoiPossivel + ".");
              }
            );
          });
          
          this.setState({visible: false});          
          EventRegister.emit('Authenticated', !Functions.isNullOrEmpty(email));
          this.props.navigation.navigate('MyContributions');          
        },
        (error) => {
          this.setState({visible: false});
          alert(this.state.ErroLoginNaoFoiPossivel + ".");
        }
      );
    });    
   

  }


  async RealizarLogin()
  {
    var loginIsNullOrEmpty = false;
    var emailIsValid = false;
    this.setState({visible: true});
    if(Functions.isNullOrEmpty(this.state.Email))
    {
      this.setState({inputEmailError: true});
      this.setState({inputEmailErrorMessage: this.state.CampoObrigatorio});
      loginIsNullOrEmpty = true;
    }
    
    if(Functions.isNullOrEmpty(this.state.Senha))
    {
      this.setState({inputPasswordError: true});
      this.setState({inputPasswordErrorMessage: this.state.CampoObrigatorio});
      loginIsNullOrEmpty = true;
    }

    if(!loginIsNullOrEmpty)
    {
      if(Functions.validateEmail(this.state.Email))
      {
        emailIsValid = true;
        this.setState({inputEmailError: false});
        this.setState({inputEmailErrorMessage: ""});
      }
      else
      {
        this.setState({inputEmailError: true});
        this.setState({inputEmailErrorMessage: this.state.EmailInvalido});
      }
    }

    
    if(emailIsValid)
    {      
      var Api = Constants.getApi();
      Functions.trustFetch(Api, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'login',
          email: this.state.Email,
          appcode: this.state.AppCode,
          password: this.state.Senha
        }),
      })
      .then((response) => {         
        var responseJson = response.json();
        if(responseJson.status == "ok")
        {          
          this.state.IdUsuario = responseJson.uid;
          //Pegar nome, email e imagem
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
              this.SetUser(responseJson.name, responseJson.email, this.state.Network, this.state.IdNetwork, false, responseJson.language, this.state.IdUsuario);
              var conn = StorageManager.getConnection();    
              conn.transaction(tx => {
                tx.executeSql('UPDATE GuardianModel SET Picture = ?', [responseJson.picture]);
              });
              EventRegister.emit('SetProfileImage', {name: responseJson.name, email: responseJson.email, image: responseJson.picture, network: this.state.Network });
          });          
        }
        else
        {
          this.setState({visible: false});
          this.refs.toast.show(this.state.ErroLogin, DURATION.LENGTH_LONG);
        }
      })      
      .catch((error) =>{
        this.setState({visible: false});
        console.error(error);
        alert(this.state.ErroAPI + error);
      });
    }
    else
    {
      this.setState({visible: false});
    }
  }

  Login()
  {    
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
        name: this.state.Nome,
      }),
    };

    if(!Functions.isNullOrEmpty(this.state.Email)){
        Functions.trustFetch(api, objAjax).then((response) => {      
          var responseJson = response.json();  
          if(responseJson.status == "old" || responseJson.status == "new")
          {
            this.SetUser(this.state.Nome, this.state.Email, this.state.Network, this.state.IdNetwork, false, 'pt', response.uid);
          }
          else
          {
            this.setState({visible: false});
            alert(this.state.NaoFoiPossivelLogar);
          }
        })    
        .catch((error) =>{
          this.setState({visible: false});
          console.error(error);
          alert(this.state.ErroAPI + error);
        });
    }
    else{
      //Sem e-mail disponível, então não chama a API
      this.SetUser(this.state.Nome, this.state.Email, this.state.Network, this.state.IdNetwork, false);
    }    

    RNFetchBlob.fetch('GET', this.state.urlpicture)              
    .then((res) => {  
      let imageData = res.base64();      
      var conn = StorageManager.getConnection();    
      conn.transaction(tx => {
        tx.executeSql('UPDATE GuardianModel SET Picture = ?', [imageData]);
      });
      EventRegister.emit('SetProfileImage', {name: this.state.Nome, email: this.state.Email, image: imageData, network: this.state.Network });
    })              
    .catch((errorMessage, statusCode) => {
      alert("erro ao obter a imagem: " + errorMessage);
    });
  }
  
  ValidatePassword()
  {
    if(Functions.isNullOrEmpty(this.state.Senha))
    {
      this.setState({inputPasswordError: true});
      this.setState({inputPasswordErrorMessage: this.state.CampoObrigatorio});
    }
    else
    {
      this.setState({inputPasswordError: false});
      this.setState({inputPasswordErrorMessage: ""});
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
          <Button transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>{this.state.Entrar}</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <View style={{ flex: 1 }}>
            <Form>
              <View>
                <Item floatingLabel
                  error={this.state.inputEmailError}
                >
                  <Label>{this.state.LabelEmail}</Label>
                  <Input
                    value={this.state.Email}
                    autoCapitalize = 'none'
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
              <Item floatingLabel
                error={this.state.inputPasswordError}
              >
                <Label>{this.state.LabelSenha}</Label>
                <Input 
                  secureTextEntry={this.state.password} 
                  autoCapitalize = 'none'
                  onChangeText={(text) => {                                    
                    this.setState({Senha: text});
                  }}
                  onEndEditing={ (event) => this.ValidatePassword() }
                />
              </Item>
              {
                this.state.inputPasswordError ?
                  <Label style={styles.LabelError}>{this.state.inputPasswordErrorMessage}</Label>
                :
                  <Label></Label>
              }
              <IconFontAwesome 
                name={this.state.icEye}
                style={styles.icon}
                size={23}
                onPress={this.changePwdType}
              />
            </Form>
            
            <Text style={styles.TextRecoverPassword} onPress={() => this.props.navigation.navigate('RecoverPassword')}>
              {this.state.EsqueceuSenha}
            </Text>
            <Button guardioes style={styles.ButtonLogin}
              onPress={this.RealizarLogin}
            >
              <Text style={styles.TextLogin}>{this.state.Entrar}</Text>
            </Button>
            <Text style={styles.TextoOutroLogin}>{this.state.AcessarCom}</Text>
          
            <GoogleSigninButton
              style={styles.buttonCommonGoogle}
              size={GoogleSigninButton.Size.Standard}
              color={GoogleSigninButton.Color.Light}
              onPress={this._GoogleSignin.bind(this)}
            />
            <LoginButton
              style={styles.buttonCommonFacebook}
              readPermissions={["public_profile","email"]}              
              onLoginFinished={
                (error, result) => {
                  if (error) 
                  {
                    alert(this.state.ErroLoginNaoFoiPossivel);
                    console.log("login has error: " + result.error);
                  } 
                  else if (result.isCancelled) 
                  {
                    alert(this.state.ErroLoginNaoFoiPossivel);
                    console.log("login is cancelled.");
                  } 
                  else 
                  {
                    this.setState({visible: true});
                    AccessToken.getCurrentAccessToken().then((data) => {
                      const { accessToken } = data;                      
                      fetch('https://graph.facebook.com/me?fields=email,name,picture.type(large),friends&access_token=' + accessToken)
                      .then((response) => response.json())
                      .then((json) => {
                        this.setState({
                          Nome: json.name,
                          //TODO pegar e-mail pelo Facebook. Nem sempre está vindo
                          Email: json.email,
                          IdNetwork: json.id,
                          Network: "facebook",
                          urlpicture: json.picture.data.url
                        });                                                
                        this.Login();
                      })
                      .catch(() => {
                        alert('ERROR GETTING DATA FROM FACEBOOK');
                        this.setState({visible: false});
                      })
                    })
                  }
                }
              }
            />
            <TwitterButton ref='twitterButton'/>

            <Button style={[styles.buttonInstagram, styles.buttonCommonInstagram]} onPress={()=> this.refs.instagramLogin.show()} >
              <IconFontAwesome name="instagram" size={20} color="white" style={stylesButtons.icon}>&nbsp;&nbsp;
                <Text style={stylesButtons.textoLogin}>{this.state.LoginInstagram}</Text>
              </IconFontAwesome>
            </Button>

            <InstagramButton
              ref='instagramLogin'
              clientId={Constants.InstagramClientId()}
              scopes={['basic']}
              onLoginSuccess={(token) => {
                    this.setState({visible: true});
                    fetch('https://api.instagram.com/v1/users/self/?access_token=' + token)
                    .then((response) => response.json())
                    .then((json) => {                        
                      this.setState({
                        Nome: json.data.full_name,
                        //TODO pegar e-mail pelo instagram
                        Email: "",
                        IdNetwork: json.data.id,
                        Network: "instagram",
                        urlpicture: json.data.profile_picture
                      });                                                
                      this.Login();
                    })
                    .catch(() => {
                      alert('ERROR GETTING DATA FROM INSTAGRAM');
                      //this.setState({visible: false});
                    });
              }}
              onLoginFailure={(data) => console.log(data)}
            />
            <Text 
              style={{marginTop:25, marginLeft:15, marginBottom:20,textDecorationLine: 'underline'}}
              onPress={()=> this.props.navigation.navigate('RegisterUser')}>{this.state.NovoCadastro}</Text>   
            <Spinner visible={this.state.visible} textContent={"Realizando login..."} textStyle={{color: '#FFF'}} />
          </View>
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

const stylesButtons = StyleSheet.create({
  icon: {
    marginLeft:10
  },
  textoLogin:
  {
    fontFamily: Platform === "android" ?  "Roboto_medium" :  "System",
    fontSize: 16,
  }
});
export default LoginView;
