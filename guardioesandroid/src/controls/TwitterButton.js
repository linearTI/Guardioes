import React, { Component } from "react"

const ReactDimensions = require("react-native");
const { Dimensions } = ReactDimensions;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

import {
  Text,
  Button,
  Icon
} from "native-base";

import {
  AppRegistry,
  StyleSheet,
  View,
  Alert,
  NativeModules,
  TouchableOpacity,
  AsyncStorage,
  Platform
} from "react-native"

import StorageManager from "../storage/StorageManager";
import Functions from "../helpers/functions";
import Constants from "../helpers/constants";
import { EventRegister } from 'react-native-event-listeners';
import RNFetchBlob from 'react-native-fetch-blob';

const { RNTwitterSignIn } = NativeModules

export default class TwitterButton extends Component {
  state = {
    isLoggedIn: false,
    Network: "",
    IdNetwork: "",
    Email: "",
    Nome: "",
    AppCode: "",
    urlpicture: ""
  }

  constructor(props) {
    super(props);
    var conn = StorageManager.getConnection();
    conn.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM GuardianModel",
        [],
        (_, results) => {
          if (results.rows.length > 0) {
            let row = results.rows.item(0);
            this.state.AppCode = row.AppCode;
          }
        }
      );
    });
  }

  _twitterSignIn = () => {
    RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY(), Constants.TWITTER_CONSUMER_SECRET())
    RNTwitterSignIn.logIn()
      .then(loginData => {
        console.log(loginData)
        const { authToken, authTokenSecret } = loginData
        if (authToken && authTokenSecret) {
          this.setState({
            Nome: loginData.userName,
            Email: loginData.email,
            IdNetwork: loginData.userID,
            Network: "twitter",
            urlpicture: "https://twitter.com/" + loginData.userName + "/profile_image?size=bigger"
          });
          this.Login();
        }
      })
      .catch(error => {
        alert("Não foi possível realizar seu login, por favor tente novamente.");
        console.log(error);
      }
      )
  }

  SetUser(name, email, network, idNetwork, completedRegistration) {
    var conn = StorageManager.getConnection();
    conn.transaction(tx => {
      tx.executeSql(
        'UPDATE GuardianModel SET Name = ?, Email = ?, Network = ?, IdNetwork = ?, IsAuthenticated = ?,CompletedRegistration = ?',
        [name, email, network, idNetwork, !Functions.isNullOrEmpty(email), completedRegistration],
        (_, results) => {
          this.setState({
            isLoggedIn: true
          });
          EventRegister.emit('ExternalLoginDone');
          EventRegister.emit('Authenticated', !Functions.isNullOrEmpty(email));
        },
        (error) => {
          alert("Não foi possível realizar seu login, por favor tente novamente.");
        }
      );
    });
  }

  Login() {
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

    if (!Functions.isNullOrEmpty(this.state.Email)) {
      Functions.trustFetch(api, objAjax).then((response) => {
        var responseJson = response.json();
        if (responseJson.status == "old" || responseJson.status == "new") {
          this.SetUser(this.state.Nome, this.state.Email, this.state.Network, this.state.IdNetwork, false);
        }
        else {
          alert("Não foi possível realizar login.");
        }
      })
        .catch((error) => {
          console.error(error);
          alert(error);
        });
    }
    else {
      this.SetUser(this.state.Nome, this.state.Email, this.state.Network, false);
    }

    //Pegando a imagem
    //Comentado devido a problemas para pegar a imagem
    EventRegister.emit('SetProfileImage', { name: this.state.Nome, email: this.state.Email, network: "twitter" });
    // RNFetchBlob.fetch('GET', this.state.urlpicture)
    // .then((res) => {
    //   let imageData = res.base64();
    //   var conn = StorageManager.getConnection();
    //   conn.transaction(tx => {
    //     tx.executeSql('UPDATE GuardianModel SET Picture = ?', [imageData]);
    //   });
    //   EventRegister.emit('SetProfileImage', {name: this.state.Nome, email: this.state.Email, image: imageData, network: "twitter" });
    // })
    // .catch((errorMessage, statusCode) => {
    //   alert("erro ao pegar a imagem: " + errorMessage);
    // });
  }

  async saveKey(name, email, picture) {

    try {
      this.props.navigation.navigate('NewContribution');
    }
    catch (error) {
      console.log("Error saving data" + error);
    }
  }
  // login() {
  //   const { navigate } = this.props.navigation;
  //   navigate('NewContribution');
  // };
  handleLogout = () => {
    console.log("logout")
    RNTwitterSignIn.logOut()
    this.setState({
      isLoggedIn: false
    })
  }

  render() {
    const { isLoggedIn } = this.state
    return (
      <View style={{ flex: 1 }}>
        {isLoggedIn
          ?
          <Text></Text>
          :
          <Button onPress={() => { this._twitterSignIn(); }} style={styles.loginTwitter}>
            <Icon name="logo-twitter" size={8} color="white" style={styles.icon}>
              <Text style={styles.textoLogin}>  Login com Twitter</Text>
            </Icon>
          </Button>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    marginLeft: 10
  },
  loginTwitter: {
    width: 230,
    height: 35,
    backgroundColor: "#0084b4",
    marginTop: 10,
    left: Platform.OS === "android" ? deviceWidth / 6.5 : deviceWidth / 6.5,
  },
  textoLogin:
  {
    fontFamily: Platform === "android" ? "Roboto_medium" : "System",
    fontSize: 16,
    color: "#fff"
  }
})
