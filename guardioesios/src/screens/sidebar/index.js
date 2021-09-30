import React, { Component } from "react";
import { 
  Image, 
  Alert,
  View, 
  StyleSheet,
  PixelRatio,
  TouchableOpacity,
  AsyncStorage,
  NativeModules
} from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Container,
  Left,
  Right,
  Badge,
  Grid,
  Row,
  Col,
  Button
} from "native-base";
import {
  StackNavigator,
} from 'react-navigation';

import styles from "./style";
import StorageManager from "../../storage/StorageManager";
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginView from "../LoginView";
import Functions from "../../helpers/functions";
import Constants from "../../helpers/constants";
import { EventRegister } from 'react-native-event-listeners';
import SplashScreen from 'react-native-smart-splash-screen';
import Cookie from 'react-native-cookie';
import translate from "../../helpers/translate";

import {GoogleSignin} from 'react-native-google-signin';
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager
} = FBSDK;

const drawerCover = require("../../../assets/drawer-cover.png");
const drawerImage = require("../../../assets/logo-kitchen-sink.png");
const imageProfileDefault =  require("../../../assets/default-user.png");

const App = StackNavigator({
  Login: { screen: LoginView }
});

class SideBar extends Component {
  state = {
    shadowOffsetWidth: 1,
    shadowRadius: 4,
    NomeUsuario: "",
    EmailUsuario: "",
    ImagemUsuario: imageProfileDefault,
    AppCode: "",
    IsAuthenticated: false,
    Network: "",
    currentRoute: "",
    IdiomaKey: "",
    DesejaSair: translate.val("DesejaSair"),
    Nao : translate.val("Nao"),
    Sim : translate.val("Sim"),
    Entrar : translate.val("Entrar"),
    datas: [
      {
        name: translate.val("NovaObservacao"),
        route: "NewContribution",
        icon: "sticky-note",
        bg: "#C5F442",
        colorIcon: "gray"
      },
      {
        name: translate.val("ObservacoesTitulo"),
        route: "MyContributions",
        icon: "list-alt",
        bg: "#C5F442",
        colorIcon: "gray"
      },
      {
        name: translate.val("Ajuda"),
        route: "Help",
        icon: "question-circle",
        bg: "#C5F442",
        colorIcon: "gray"
      },
      {
        name: translate.val("MeuPerfil"),
        route: "Profile",    
        icon: "user",
        bg: "#C5F442",
        colorIcon: "gray"
      },
      {
        name: translate.val("Sair"),
        route: "LogOut",    
        icon: "sign-out",
        bg: "#C5F442",
        colorIcon: "gray"
      }
    ]
  };
  constructor(props) {
    super(props);
    
    this.LogOut = this.LogOut.bind(this);
  }

  componentWillMount() {
    this.listener = EventRegister.addEventListener('SetProfileImage', (data) => {      
      let source = !Functions.isNullOrEmpty(data.image) ? { uri: 'data:image/jpeg;base64,'  + data.image } : imageProfileDefault;
      this.setState({
        NomeUsuario: data.name,
        EmailUsuario: data.email,
        ImagemUsuario: source,
        IsAuthenticated: true,
        Network: data.network
      });       
      this.rebuildMenu();
    });
    this.listenerRoute = EventRegister.addEventListener('SetCurrentRoute', (data) => { 
      this.setState({currentRoute: data});
    });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
    EventRegister.removeEventListener(this.listenerRoute);
    EventRegister.removeEventListener(this.listenerLanguage);
  }

  componentDidMount() 
  {    
    this.listenerLanguage = EventRegister.addEventListener('Language', (data) => {
      this.setState({
        DesejaSair: translate.val("DesejaSair"),
        Nao : translate.val("Nao"),
        Sim : translate.val("Sim"),
        Entrar : translate.val("Entrar"),
        datas: [
          {
            name: translate.val("NovaObservacao"),
            route: "NewContribution",
            icon: "sticky-note",
            bg: "#C5F442",
            colorIcon: "gray"
          },
          {
            name: translate.val("ObservacoesTitulo"),
            route: "MyContributions",
            icon: "list-alt",
            bg: "#C5F442",
            colorIcon: "gray"
          },
          {
            name: translate.val("Ajuda"),
            route: "Help",
            icon: "question-circle",
            bg: "#C5F442",
            colorIcon: "gray"
          },
          {
            name: translate.val("MeuPerfil"),
            route: "Profile",    
            icon: "user",
            bg: "#C5F442",
            colorIcon: "gray"
          },
          {
            name: translate.val("Sair"),
            route: "LogOut",    
            icon: "sign-out",
            bg: "#C5F442",
            colorIcon: "gray"
          }
        ]
      });
    });
    var conn = StorageManager.getConnection();
    conn.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM GuardianModel",
        [],
        (_, results) => {                            
            if(results.rows.length > 0){              
                let row = results.rows.item(0);              
                this.setState({
                  NomeUsuario: row.Name,
                  EmailUsuario: row.Email,
                  ImagemUsuario: !Functions.isNullOrEmpty(row.Picture) ? { uri: 'data:image/jpeg;base64,' + row.Picture } : imageProfileDefault,
                  AppCode: row.AppCode,
                  IsAuthenticated: row.IsAuthenticated,
                  Network: row.Network,
                  IdiomaKey: row.Idioma         
                });
                translate.setLanguage(row.Idioma);
                this.rebuildMenu();
                
                if(!row.Welcome)
                {
                  this.props.navigation.navigate('Presentation');
                }
                  
            }  
            else
            {
              translate.setLanguage("pt");
              this.rebuildMenu();
            }      
        }                
      );
    }).catch((error) => {
      console.log("database not ready yet");
    });  

    SplashScreen.close({
      animationType: SplashScreen.animationType.none,
      duration: 850,
      delay: 500,
    });  
   
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
    }
    catch(err) {
      console.log("Play services error", err.code, err.message);
    }
  }

  rebuildMenu(){
    let newArrayLinks = new Array();
    for(let i = 0; i < this.state.datas.length; i++){
        newArrayLinks.push({
          name: this.state.datas[i].name,
          route:  this.state.datas[i].route,    
          icon:  this.state.datas[i].icon,
          bg:  this.state.datas[i].bg,
          colorIcon:  this.state.datas[i].colorIcon
        });
    }
    this.setState({                  
      datas: newArrayLinks
    });
  }

  LogOut(){
    
    Alert.alert(
      '',
      this.state.DesejaSair,
      [
        {text: this.state.Nao, onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: this.state.Sim, onPress: () => {
          
          var conn = StorageManager.getConnection();
          conn.transaction(tx => {
            var appCode = Functions.generateAppCode();            
            tx.executeSql("DELETE FROM GuardianModel;");
            //inserindo um novo usuário no banco apenas com o appcode... quando o usuário realizar o login sera preenchido o restante das informações.
            tx.executeSql("INSERT INTO GuardianModel (AppCode, Name, Email, IsAuthenticated,CompletedRegistration, Idioma) VALUES (?,?,?,?,?,?);",
              [appCode, '','',false,false, 'pt'],
              (_, results) => {     
                let Network = this.state.Network;                       
                this.setState({
                  NomeUsuario: '',
                  EmailUsuario: '',
                  ImagemUsuario: imageProfileDefault,
                  AppCode: appCode,
                  IsAuthenticated: false,
                  Network: ''
                });                
                this.rebuildMenu();    
                //alert(Network);
                switch(Network){
                  case "gmail":{
                    GoogleSignin.revokeAccess()
                    .then(() => {
                    })
                    .catch((err) => {
                    });
                    break;
                  }
                  case "facebook":{
                    LoginManager.logOut();
                    break;
                  }
                  case "instagram":{
                    Cookie.clear().then(() => {
                      //TODO limpar o token, se ele for salvo.
                      //this.setState({ token: null })
                    })
                    break;
                  }
                  default:{
                    break;
                  }
                }
                this.props.navigation.navigate('Login');
              },
              (error) => {          
                alert("Erro ao sair: "+ JSON.stringify(error));
              }               
            );
            translate.setLanguage('pt');
          }).catch((error) => {
            console.log("database not ready yet");
          });  
        }},
      ]
    );  
    
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <View style={styles.drawerCover} >
            <Grid style={{alignContent:"flex-start", alignItems: "flex-start"}}>
              <Row>
                <Col style={{alignItems: 'flex-start'}}>
                  <Image square style={styles.drawerImage} source={this.state.ImagemUsuario} />
                </Col>
                {
                  this.state.NomeUsuario != "" ?
                    <Col style={{alignItems: 'flex-start', flexDirection: 'row'}}>
                      <View style={styles.teste}>
                        <Text style={styles.textInfoName}>{this.state.NomeUsuario}</Text>
                        <Text style={styles.textInfoEmail}>{this.state.EmailUsuario}</Text>
                      </View>
                    </Col>
                  :
                    <Col style={{alignItems: 'flex-start'}}>
                      <Text 
                        style={styles.textLogin}
                        onPress={() => navigate('Login')}
                      >
                        {this.state.Entrar}
                      </Text>
                    </Col>
                  }
                </Row>
              </Grid>
            </View>
            

            <List
            dataArray={this.state.datas}
            renderRow={data =>
              ((data.route != "Profile" && data.route != "LogOut") || this.state.IsAuthenticated || !Functions.isNullOrEmpty(this.state.Network)) &&
              <ListItem
                button
                noBorder
                onPress={() =>{ 
                    if(data.route != "LogOut")
                    {
                      if(this.state.currentRoute == data.route){
                        EventRegister.emit("Reload");
                      }
                      this.setState({currentRoute: data.route});                      
                      this.props.navigation.navigate(data.route);
                    }
                    else
                    {
                      this.LogOut()
                    }
                  }
                }
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: data.colorIcon, fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
            />
          
        </Content>
      </Container>
    );
  }
}
const stylesCamera = StyleSheet.create({
 
  container: {    
    alignItems: "flex-start",
    backgroundColor: "#FFF8E1",
    alignContent:"flex-start"
  },

  ImageContainer: {
    borderRadius: 10,
    width: 120,
    height: 120
  },

  MapContainer: {
    width: '95%',
    height: 250,
    borderColor: "#9B9B9B",
    borderWidth: 1 / PixelRatio.get(),
    alignContent: "center"
  },

  ModalMapContainer: {
    width: '95%',
    height: '95%',
    borderColor: "#9B9B9B",
    borderWidth: 1 / PixelRatio.get(),
    alignContent: "center"
  },

  sectionTitleRow: {
    height: 28,
    marginTop: 12
  }

});
export default SideBar;
