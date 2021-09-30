import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  List,
  ListItem,
  Text,
  Thumbnail,
  Left,
  Body,
  Right,
  Grid,
  Row,
  Col,
  CheckBox,
  View,
  Label
} from "native-base";

import {
  Image,
  Alert,
  NetInfo,
  StyleSheet,
  TouchableOpacity,
  BackHandler
} from "react-native";

import Moment from 'moment';
import Toast, {DURATION} from 'react-native-easy-toast';
import styles from "./styles";
import StorageManager from "../../storage/StorageManager";
import Functions from "../../helpers/functions";
import Constants from "../../helpers/constants";
import Spinner from 'react-native-loading-spinner-overlay';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'react-native-fetch-blob';
import { EventRegister } from 'react-native-event-listeners';
import translate from "../../helpers/translate";

const add = require("../../../assets/add.png");
const trash = require("../../../assets/del.png");
const send = require("../../../assets/send.png");
const onInitialNetConnection = isConnected => {
    console.log(`Is initially connected: ${isConnected}`);
    NetInfo.isConnected.removeEventListener(onInitialNetConnection);
};

NetInfo.isConnected.addEventListener(
    'connectionChange',
    onInitialNetConnection
);



class MyContributionsView extends Component {
  state = {
    datas: [],
    networkConnected: true,
    newContribution: false,
    contributionNotSended: false,
    arraySend: [],
    visible: false,
    LoadingText: translate.val("CarregandoObservacoes"),
    MessageTrash: "",
    appCode: "",
    IsAuthenticated: false,
    DesejaRealmenteExcluir: translate.val("DesejaRealmenteExcluir"),
    MsgExcluirObsNaoEnviadas: translate.val("MsgExcluirObsNaoEnviadas"),
    ExcluindoObservacoes: translate.val("ExcluindoObservacoes"),
    ObservacoesExcluidasSucesso: translate.val("ObservacoesExcluidasSucesso"),
    ExcluirObservacoesErro: translate.val("ExcluirObservacoesErro"),
    FazerLoginEnviarObservacoes: translate.val("FazerLoginEnviarObservacoes"),
    ConexaoInternetNaoDisponivel: translate.val("ConexaoInternetNaoDisponivel"),
    EnviandoObservacoes: translate.val("EnviandoObservacoes"),
    CarregandoObservacoes: translate.val("CarregandoObservacoes"),
    ObservacaoSalvaSucesso: translate.val("ObservacaoSalvaSucesso"),
    AnimalTexto: translate.val("Animal"),
    PlantaTexto: translate.val("Planta"),
    NenhumaObservacaoCadastrada: translate.val("NenhumaObservacaoCadastrada"),
    Observacoes: translate.val("ObservacoesTitulo"),
    TodasObservacoesJaEnviadas: translate.val("TodasObservacoesJaEnviadas"),
    ObservacoesEnviadasComSucesso: translate.val("ObservacoesEnviadasComSucesso"),
    EnviarErroObservacao: translate.val("EnviarErroObservacao"),
    ConfirmaEnvio: translate.val("ConfirmaEnvio"),
    Nao : translate.val('Nao'),
    Sim : translate.val('Sim'),
    IdUsuario: "",
    IdiomaKey: "",
    Entrar: translate.val("Entrar"),
    Cancelar: translate.val("Cancelar"),
  };
  constructor(props) {
    super(props);

    var conn = StorageManager.getConnection();

    conn.transaction(tx => {
      tx.executeSql(
          "DELETE FROM ContributionModel WHERE Provisional = 1;",
          [],
          (_, results) => {
          }
      );
    });
    
    conn.transaction(tx => {
        tx.executeSql(
            "SELECT * FROM GuardianModel",
            [],
            (_, results) => {
                if(results.rows.length > 0){
                    let row = results.rows.item(0);
                    this.state.appCode = row.AppCode;
                    this.state.IsAuthenticated = row.IsAuthenticated;
                    this.setState({ 
                      IdiomaKey: row.Idioma,
                      IdUsuario: row.IdUsuario
                    });
                    
                    translate.setLanguage(row.Idioma);
                }
          else {
                  this.state.IdiomaKey = 'pt';

                }
            }
        );
    });
    this.RemoveContribution = this.RemoveContribution.bind(this);
    this.SendContribution = this.SendContribution.bind(this);
  }
  selectListContributions() {
    this.setState({visible: true, LoadingText: this.state.CarregandoObservacoes});
    var conn = StorageManager.getConnection();

    conn.transaction(tx => {
      tx.executeSql(
        "SELECT "  
        + " ContributionModel.Photo_A_Thumbnail, "
        + " ContributionModel.Photo_B_Thumbnail, "
        + " ContributionModel.Photo_C_Thumbnail, "
        + " ContributionModel.Photo_D_Thumbnail, "
        + " ContributionModel.Photo_E_Thumbnail, "
        + " ContributionModel.Photo_F_Thumbnail, "
        + " ContributionModel.Photo_G_Thumbnail, "
        + " ContributionModel.Photo_H_Thumbnail, "
        + " ContributionModel.Sended, "
        + " ContributionModel.IdUsuario, "
        + " ContributionModel.ID, "
        + " ContributionModel.Creation, "
        + " ContributionModel.Latitude, "
        + " ContributionModel.Longitude, "
        + " ContributionModel.Accuracy, "
        + " ContributionModel.Elevation, "
        + " ContributionModel.Country, "
        + " ContributionModel.Stateprovince, "
        + " ContributionModel.Municipality, "
        + " ContributionModel.Locality, "
        + " ContributionModel.Eventdate, "
        + " ContributionModel.Eventtime, "
        + " ContributionModel.Habit, "
        + " ContributionModel.Interaction, "
        + " ContributionModel.P_vernacularname, "
        + " ContributionModel.P_family, "
        + " ContributionModel.P_scientificname, "
        + " ContributionModel.P_identificationremarks, "
        + " ContributionModel.A_vernacularname, "
        + " ContributionModel.Taxgrp, "
        + " ContributionModel.A_family, "
        + " ContributionModel.A_scientificname, "
        + " ContributionModel.A_identificationremarks, "
        + " ContributionModel.Eventremarks, "
        + " AnimalGroup_Language.value AS Animal, " +
        " PlantHabit_Language.value AS Planta " +
        " FROM ContributionModel " +
        " LEFT JOIN AnimalGroup ON (AnimalGroup.key = ContributionModel.Taxgrp) " +
        " LEFT JOIN AnimalGroup_Language ON (AnimalGroup_Language.AnimalGroupId = AnimalGroup.id) " +
        " LEFT JOIN PlantHabit ON (PlantHabit.key = ContributionModel.Habit) " +
        " LEFT JOIN PlantHabit_Language ON (PlantHabit_Language.PlantHabitId = PlantHabit.id) " +
        " LEFT JOIN GuardianModel ON (ContributionModel.IdUsuario = GuardianModel.IdUsuario) " +
        " WHERE " +
        " (AnimalGroup.key IS NULL OR AnimalGroup_Language.LanguageId = ?) AND " +
        " (ContributionModel.IdUsuario IS NULL OR ContributionModel.IdUsuario = GuardianModel.IdUsuario) AND " +
        " (PlantHabit.key IS NULL OR PlantHabit_Language.LanguageId = ?) " +
        " ORDER BY Sended, Creation",
        [this.state.IdiomaKey,this.state.IdiomaKey],
        (tx, results) => {
          var len = results.rows.length;
          var arrayObservacoes = new Array();
          var arrayCheck = new Array();
          var photoLetters = ["A","B","C","D","E","F","G","H"];
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            let img = { uri: ''};
            for(let j = 0; j < photoLetters.length; j++){
              if(!Functions.isNullOrEmpty(row["Photo_"+photoLetters[j]+'_Thumbnail'])){
                img.uri = 'data:image/jpeg;base64,' + row["Photo_"+photoLetters[j]+'_Thumbnail'];
                break;
              }
            }
            let lat = row.Latitude.toString().substring(0,8);
            let long = row.Longitude.toString().substring(0,8);
            let title = Functions.concatenateString(row.Locality, row.Municipality,row.Stateprovince, row.Country);

            arrayObservacoes.push({
              Id: row.ID,
              IdUsuario: row.IdUsuario,
              Latitude: lat,
              Longitude:  long,
              Eventremarks: row.Eventremarks,
              Locality: row.Locality,
              Creation: row.Creation,
              Photo_A: img,
              Municipality: row.Municipality,
              Stateprovince: row.Stateprovince,
              Country: row.Country,
              Animal: row.Animal,
              Planta: row.Planta,
              Index: i,
              Title: title,
              ContributionSended: !!row.Sended,
              Checked: false
            });
          }
          this.setState({datas: arrayObservacoes, visible: false});
        }
      );
    });
  }
  selectCheckBox(id, index) {
      var arrySend = new Array();
      arraySend = this.state.arraySend;

      var temChecked = false;
      var array = new Array();
    for (let i = 0; i < this.state.datas.length; i++) {
        let newItem = {};
        for(var key in this.state.datas[i]){
          if(key == "Checked"){
            newItem["Checked"] = (i != index ? this.state.datas[i].Checked : !this.state.datas[i].Checked);
          }
          else{
            newItem[key] = this.state.datas[i][key];
          }
        }
        array.push(newItem);
      if (i == index) {
        if (array[i].Checked) {
            temChecked = true;
            arraySend.push({
              id: id,
              index: index
            });
          }
        else {
            arraySend.splice(index, 1);
          }
        }
      else {
          if(this.state.datas[i].Checked)
            temChecked = true;

        }
      }

      this.setState({datas: array});
      this.setState({newContribution: temChecked});
      this.CheckedNotSended(array);
  }
  CheckedNotSended(newDatas) {
    var notSended = false;
    for (let i = 0; i < newDatas.length; i++) {
      if(!newDatas[i].ContributionSended && newDatas[i].Checked)
      notSended = true;
    }

    this.setState({contributionNotSended: notSended});
    if(notSended)
      this.setState({MessageTrash: this.state.MsgExcluirObsNaoEnviadas});
    else
      this.setState({MessageTrash: this.state.DesejaRealmenteExcluir});
    
  }
  RemoveContribution = () => {
    Alert.alert(
      '',
      this.state.MessageTrash,
      [
        {text: this.state.Nao, onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: this.state.Sim, onPress: () => this.DeleteContribution()},
      ]
    );
  };

  DeleteContribution() {
    this.setState({visible: true, LoadingText: this.state .ExcluindoObservacoes});
    var conn = StorageManager.getConnection();
    for(let i = 0; i < this.state.arraySend.length; i++){
      conn.transaction(tx => {
        tx.executeSql(
          "DELETE FROM ContributionModel WHERE ID = ?",
          [this.state.arraySend[i].id],
          (_, results) => {
            this.setState({newContribution: false});
            this.refs.toast.show(this.state.ObservacoesExcluidasSucesso, DURATION.LENGTH_LONG);
            this.selectListContributions();
          },
          (error) => {
            alert(this.state.ExcluirObservacoesErro);
          }
        );
      });
    }
    this.setState({visible: false});
  }

  SendContribution() {
    console.log("checking internet connection...");
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected){
        if (this.state.IsAuthenticated) {
            Alert.alert(
              '',
              this.state.ConfirmaEnvio,
              [
                {text: this.state.Nao, onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: this.state.Sim, onPress: () => this.SendContribution_()},
              ]
            );
        }
        else {
          Alert.alert(
            '',
            this.state.FazerLoginEnviarObservacoes,
            [
              {text: this.state.Cancelar, onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: this.state.Entrar, onPress: () => this.props.navigation.navigate('Login')},
            ]
          );
        }
      }
      else {
          alert(this.state.ConexaoInternetNaoDisponivel);
      }
    });

  }

  SendContribution_() {
    this.setState({visible: true, LoadingText: this.state.EnviandoObservacoes});
    var conn = StorageManager.getConnection();
    var linkApi = Constants.getApi();
    var appcode = this.state.appCode;
    var objAjax = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'session_start',
        appcode: appcode
      })
    };

    if(this.state.arraySend.length > 0){
      var filtro = new Array();
      for (let i = 0; i < this.state.arraySend.length; i++) {
          filtro.push(this.state.arraySend[i].id);
      }

      conn.transaction((tx) => {
        tx.executeSql(
          "SELECT"
          + " Photo_A, "
          + " Photo_B, "
          + " Photo_C, "
          + " Photo_D, "
          + " Photo_E, "
          + " Photo_F, "
          + " Photo_G, "
          + " Photo_H, "
          + " ContributionModel.Sended, "
          + " ContributionModel.IdUsuario, "
          + " ContributionModel.ID, "
          + " ContributionModel.Creation, "
          + " ContributionModel.Latitude, "
          + " ContributionModel.Longitude, "
          + " ContributionModel.Accuracy, "
          + " ContributionModel.Elevation, "
          + " ContributionModel.Country, "
          + " ContributionModel.Stateprovince, "
          + " ContributionModel.Municipality, "
          + " ContributionModel.Locality, "
          + " ContributionModel.Eventdate, "
          + " ContributionModel.Eventtime, "
          + " ContributionModel.Habit, "
          + " ContributionModel.Interaction, "
          + " ContributionModel.P_vernacularname, "
          + " ContributionModel.P_family, "
          + " ContributionModel.P_scientificname, "
          + " ContributionModel.P_identificationremarks, "
          + " ContributionModel.A_vernacularname, "
          + " ContributionModel.Taxgrp, "
          + " ContributionModel.A_family, "
          + " ContributionModel.A_scientificname, "
          + " ContributionModel.A_identificationremarks, "
          + " ContributionModel.Eventremarks, "
          + " ContributionModel.Verbatimeventdate "
          + " FROM  ContributionModel WHERE ID IN (" + filtro.join() + ") AND Sended = ?", [false],
          async (tx, results) => {
            var vetorDadosEnvio = new Array();
           
            //Carrega os dados das oservações selecionadas (e que ainda não foram enviadas)
            for (let i = 0; i < results.rows.length; i++) {
                let row = results.rows.item(i);
                let dados = {};
                let photos = new Array();
          
                dados["action"] = "record_data";
                dados["ID"] = row["ID"];
                dados["decimallatitude"] = row["Latitude"];
                dados["decimallongitude"] = row["Longitude"];
                dados["accuracy"] = row["Accuracy"];
                dados["elevation"] = row["Elevation"];
                dados["country"] = row["Country"];
                dados["stateprovince"] = row["Stateprovince"];
                dados["municipality"] = row["Municipality"];
                dados["locality"] = row["Locality"];
                dados["eventdate"] = row["Eventdate"];
                dados["eventtime"] = row["Eventtime"];
                dados["verbatimeventdate"] = row["Verbatimeventdate"];
                dados["habit"] = row["Habit"];
                dados["interaction"] = row["Interaction"];
                dados["p_vernacularname"] = row["P_vernacularname"];
                dados["p_family"] = row["P_family"];
                dados["p_scientificname"] = row["P_scientificname"];
                dados["p_identificationremarks"] = row["P_identificationremarks"];
                dados["a_vernacularname"] = row["A_vernacularname"];
                dados["taxgrp"] = row["Taxgrp"];
                dados["a_family"] = row["A_family"];
                dados["a_scientificname"] = row["A_scientificname"];
                dados["a_identificationremarks"] = row["A_identificationremarks"];
                dados["eventremarks"] = row["Eventremarks"];

              if (Functions.isNullOrEmpty(dados["Country"])) {
                var link = Functions.linkApiLatLon(dados["decimallatitude"], dados["decimallongitude"]);
                await Functions.trustGET(link)
                  .then((response) => response.text())
                  .then((text) => {
                    var info = text.split(';');
                    dados["country"] = info[0];
                    dados["stateprovince"] = info[1];
                    dados["municipality"]  = info[2];
                    dados["locality"] = info[2].trim().toUpperCase() === info[3].trim().toUpperCase() ? "" : info[3];
                    conn.transaction((tx) => {
                      tx.executeSql(
                        //TODO trocar false pra true !!!
                        "UPDATE ContributionModel SET Country = ?, Stateprovince = ?, Municipality = ?, Locality = ?  WHERE ID =? ", [dados["country"], dados["stateprovince"], dados["municipality"],dados["locality"],dados["ID"]],
                        (tx, results) => {
                          // alert(JSON.stringify(results))
                        }
                      );
                    });
                  })
                  .catch((error) => {
                    console.error(error);
                  });
                }

                ["A","B","C","D","E","F","G","H"].map( function(item) {
                  photos.push(row["Photo_"+item]);
                });
                dados["photos"] = photos;
                vetorDadosEnvio.push(dados);
            }

            if(vetorDadosEnvio.length == 0){
              alert(this.state.TodasObservacoesJaEnviadas);
              this.setState({visible: false});
              return;
            }

            let letters = ["A","B","C","D","E","F","G","H"];
            let itensOK = true;
            let itemAtualOK = true;
            let listaErros = new Array();
            //Itera sobre os itens para enviar
            filtro = new Array();
            for(let i = 0; i < vetorDadosEnvio.length; i++){
              itemAtualOK = true;
              //Tenta iniciar um sessão
              objAjax.body = JSON.stringify({action: 'session_start', appcode: appcode});
              let request_session_start = await Functions.trustFetch(linkApi, objAjax)
              .then((response) => {
                return response.json();
              }).catch((error) =>{
                listaErros.push(error);
                itemAtualOK = false;
              });

              if(itemAtualOK){
                if(request_session_start.status == "ok"){
                  //Sessão iniciada
                  let session_id = request_session_start.session_id;

                  //Obtendo o id do registro
                  objAjax.body = JSON.stringify({action: "record_start", session_id: session_id});
                  let request_record_start = await Functions.trustFetch(linkApi, objAjax)
                  .then((response) => {
                    return response.json();
                  }).catch((error) =>{
                      listaErros.push(error);
                      itemAtualOK = false;
                  });
                  if(itemAtualOK){
                    vetorDadosEnvio[i]["record_id"] = request_record_start.record_id;
                    let photosOK = true;
                    //Guarda as fotos num array separado (para não envia-las na action record_start) - Comentado, pois as fotos não são mais pegas no primeiro select
                    var photosEnviar = vetorDadosEnvio[i]["photos"];
                    delete vetorDadosEnvio[i]["photos"];
                    //Enviando os dados do registro
                    objAjax.body= JSON.stringify(vetorDadosEnvio[i]);
                    let request_record_data = await Functions.trustFetch(linkApi, objAjax)
                    .then((response) => {
                      return response.json();
                    }).catch((error) =>{
                      listaErros.push(error);
                      itemAtualOK = false;
                    });
                    if(itemAtualOK){
                      let imageAnimal = false;
                      let imagePlant  = false;
                      if (request_record_data.status == "ok") {
                        //Dados enviados. Agora enviar as fotos
                        for (let j = 0; j < photosEnviar.length; j++) {
                          if (!Functions.isNullOrEmpty(photosEnviar[j])) {
                            let data = "";
                            let imageExist = await RNFetchBlob.fs.exists(photosEnviar[j])
                            .then((exist) => {
                                return exist;
                            })
                            .catch(() => {

                            });
                            if (imageExist) {
                              if(j <= 3)
                                imageAnimal = true;
                              else
                                imagePlant = true;

                              let image = await RNFetchBlob.fs.readFile(photosEnviar[j],'base64')
                              .then((ifstream) => {
                                return ifstream;
                              });
  
                              objAjax.body= JSON.stringify({
                                "action":"record_image",
                                "record_id": vetorDadosEnvio[i]["record_id"],
                                "number": j,
                                "data": image
                              });
                              let request_record_image = await Functions.trustFetch(linkApi, objAjax)
                              //let request_record_image = await Functions.trustFetch("http://192.168.200.26/Guardioes/api/TesteGuardioes/", objAjax)
                              .then((response) => {
                                itemAtualOK = true;
                                return response.json();
                              }).catch((error) =>{
                                listaErros.push("Falhou enviar: " + error);
                                itemAtualOK = false;
                                photosOK = false;
                              });
  
                              if(itemAtualOK){
                                if(request_record_image.status != "ok"){
                                  photosOK = false;
                                }
                              }
                              else{
                                listaErros.push("Algum erro desconhecido");
                                itemAtualOK = false;
                                itensOK = false;
                              } 
                            }
                            //fecha if que verifica se o aquivo existe 
                          }
                          // fim if photo vazio
                            
                        }//fecha for
                        //Verifico se encontrou ao menos uma foto de cada
                        // alert(imageAnimal && imagePlant);
                        if (imageAnimal && imagePlant) {
                          filtro.push(vetorDadosEnvio[i]["ID"])
                          photosOK = true;
                        }
                        else {
                          photosOK = false;
                        }

                        if(photosOK){
                          //Todas as imagens gravadas com sucesso. Finalizar
                          objAjax.body = JSON.stringify({action: "record_save", record_id: vetorDadosEnvio[i]["record_id"]});
                          let request_record_save = await Functions.trustFetch(linkApi, objAjax)
                          .then((response) => {
                            return response.json();
                          }).catch((error) =>{
                            listaErros.push(error);
                            itemAtualOK = false;
                          });
                          if(itemAtualOK){
                            if(request_record_save.status == "ok"){
                              objAjax.body = JSON.stringify({action: "session_stop", session_id: session_id});
                              let request_session_stop = await Functions.trustFetch(linkApi, objAjax)
                              .then((response) => {
                                return response.json();
                              }).catch((error) =>{
                                listaErros.push(error);
                                itemAtualOK = false;
                              });
                              if(itemAtualOK){
                                if(request_session_stop.status != "ok"){
                                  //Resposta de finalizar sessão diferente de ok
                                  itensOK = false;
                                }
                              }
                              else{
                                //Falhou a request finalizar sessão
                                itensOK = false;
                              }
                            }
                            else{
                              //Reposta de finalizar salvar diferente de ok
                              itensOK = false;
                            }
                          }
                          else{
                            //Falhou a request de finalizar salvar
                            itensOK = false;
                          }
                        }
                        else{
                          //Se alguma foto falhou, o item falhou tambem
                          itensOK = false;
                        }
                      }
                      else{
                        //Respota de gravar o registro diferente de ok
                        itensOK = false;
                      }
                    }
                    else{
                      //Falhou a request de gravar o registro
                      itensOK = false;
                    }
                  }
                  else{
                    //Falhou a request de obter o id do registro
                    itensOK = false;
                  }
                }
                else{
                  //Resposta de iniciar sessão diferente de ok
                  itensOK = false;
                }
              }
              else{
                //Falhou a request de iniciar sessão
                itensOK = false;
              }
            }
            if(itensOK){
              this.setState({newContribution: false});
              this.refs.toast.show(this.state.ObservacoesEnviadasComSucesso, DURATION.LENGTH_LONG);
              conn.transaction((tx) => {
              tx.executeSql(
                //TODO trocar false pra true !!!
                "UPDATE ContributionModel SET Sended = ? WHERE ID IN (" + filtro.join() + ")", [true],
                (tx, results) => {
                    this.setState({arraySend: new Array()});
                    this.selectListContributions();
                });
              });
            }
            else {
              //TODO como exibir msgs de erro ? Log ?
              alert(this.state.EnviarErroObservacao);
            }

            this.setState({visible: false});
          });
        });
    }
  }

  componentDidMount() {
    var conn = StorageManager.getConnection();       
    if (this.props.navigation.state.params != undefined && this.props.navigation.state.params.inserted) {
      this.props.navigation.state.params.inserted = false;
      this.refs.toast.show(this.state.ObservacaoSalvaSucesso, DURATION.LENGTH_LONG);
    }

    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate("DrawerOpen");
      return true;
    });

    this.listenerLanguage = EventRegister.addEventListener('Language', (data) => {
      this.setState({
        DesejaRealmenteExcluir: translate.val("DesejaRealmenteExcluir"),
        MsgExcluirObsNaoEnviadas: translate.val("MsgExcluirObsNaoEnviadas"),
        ExcluindoObservacoes: translate.val("ExcluindoObservacoes"),
        ObservacoesExcluidasSucesso: translate.val("ObservacoesExcluidasSucesso"),
        ExcluirObservacoesErro: translate.val("ExcluirObservacoesErro"),
        FazerLoginEnviarObservacoes: translate.val("FazerLoginEnviarObservacoes"),
        ConexaoInternetNaoDisponivel: translate.val("ConexaoInternetNaoDisponivel"),
        EnviandoObservacoes: translate.val("EnviandoObservacoes"),
        CarregandoObservacoes: translate.val("CarregandoObservacoes"),
        ObservacaoSalvaSucesso: translate.val("ObservacaoSalvaSucesso"),
        AnimalTexto: translate.val("Animal"),
        PlantaTexto: translate.val("Planta"),
        NenhumaObservacaoCadastrada: translate.val("NenhumaObservacaoCadastrada"),
        Observacoes: translate.val("ObservacoesTitulo"),
        TodasObservacoesJaEnviadas: translate.val("TodasObservacoesJaEnviadas"),
        ObservacoesEnviadasComSucesso: translate.val("ObservacoesEnviadasComSucesso"),
        EnviarErroObservacao: translate.val("EnviarErroObservacao"),
        ConfirmaEnvio: translate.val("ConfirmaEnvio"),
        Nao : translate.val('Nao'),
        Sim : translate.val('Sim'),
        Entrar: translate.val("Entrar"),
        Cancelar: translate.val("Cancelar"),
      });
    });

    this.selectListContributions();

    this.listenerAuthenticated = EventRegister.addEventListener('Authenticated', (data) => {
      this.selectListContributions();
    });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listenerAuthenticated);
    //EventRegister.removeEventListener(this.listenerLanguage);
  }

  render() {
    const button = this.state.contributionNotSended ? (
      <Right>
        <Button transparent onPress={() =>
          this.RemoveContribution()
        }>
          <IconFontAwesome
            name="trash"
            style={styles.iconAdd}
            size={30}
          />
        </Button>
        <Button transparent onPress={() =>
          this.SendContribution()
          } >
          <IconFontAwesome
            name="paper-plane"
            style={styles.iconAdd}
            size={30}
          />
        </Button>
      </Right>
    ) 
    : (
      <Right>
        <Button transparent onPress={() =>
          this.RemoveContribution()
        }>
          <IconFontAwesome
            name="trash"
            style={styles.iconAdd}
            size={30}
          />
        </Button>
      </Right>
    );

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
            <Title>{this.state.Observacoes}</Title>
          </Body>
          {
            !this.state.newContribution?
              <Right>
                <Button transparent onPress={() => {
                      EventRegister.emit('SetCurrentRoute', "NewContribution");
                      this.props.navigation.navigate('NewContribution');
                    }
                  } >
                  <IconFontAwesome
                    name="plus-square"
                    style={styles.iconAdd}
                    size={30}
                  />
                </Button>
              </Right>
            :
              button
          }
        </Header>

        <Content>
            {
              this.state.datas.length == 0 ? <Text style={styles.MessageNoNoteRecorded}>{this.state.NenhumaObservacaoCadastrada}</Text> : <Text></Text>
            }
            <View style={{ flex: 1 }}>
              <List
                dataArray={this.state.datas}
                renderRow={data =>

                    <Card style={styles.cardStyle}>
                      <CardItem bordered>
                        <Left>
                          <Body>
                            <View style={{flex: 1, flexDirection: "row"}}>
                              <View style={{width:"95%", alignContent: "flex-start"}}>
                                <Text onPress={() => {
                                    EventRegister.emit('SetCurrentRoute', "NewContribution");
                                    this.props.navigation.navigate('NewContribution', {id: data.Id});
                                  }}
                                  onPress={() => this.selectCheckBox(data.Id, data.Index)}
                                  style={styles.TituloObservacao}
                                >
                                {data.Title}
                                </Text>
                              </View>
                              <Right style={{width:"5%"}}>
                              {
                                data.ContributionSended &&
                                <IconFontAwesome name="paper-plane" style={styles.icon} size={15}/>
                              }
                              </Right>
                            </View>
                          </Body>
                        </Left>
                      </CardItem>
                      <CardItem>
                        <Body>
                          <View style={{flex: 1, flexDirection: "row"}}>

                            <CheckBox
                              color="#cc9933"
                              style={styles.StyleCheckbox}
                              onPress={() => this.selectCheckBox(data.Id, data.Index)}
                              checked={data.Checked}
                              size={70}
                            />

                          <TouchableOpacity
                            style={{marginRight:70}}
                            onPress={() => {
                              EventRegister.emit('SetCurrentRoute', "NewContribution");
                              this.props.navigation.navigate('NewContribution', {id: data.Id});
                            }}
                          >
                              <Label  style={styles.LabelInfo} note>{this.state.AnimalTexto}: {data.Animal} </Label>
                              {!Functions.isNullOrEmpty(data.Planta) &&
                                <Label style={styles.LabelInfo}  note>{this.state.PlantaTexto}: {data.Planta}</Label>
                              }
                              <Label note style={styles.LabelDefault}>
                                {data.Creation}
                              </Label>
                          </TouchableOpacity>
                          <Right>
                            <TouchableOpacity
                              onPress={() => {
                                EventRegister.emit('SetCurrentRoute', "NewContribution");
                                this.props.navigation.navigate('NewContribution', {id: data.Id});
                              }}
                            >
                              <Thumbnail square size={70} source={data.Photo_A} style={styles.ImageContainer} />
                            </TouchableOpacity>
                          </Right>
                          </View>
                      </Body>
                    </CardItem>
                  </Card>
                }
              />
              <Spinner visible={this.state.visible} textContent={this.state.LoadingText} textStyle={{color: '#FFF'}} />
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

export default MyContributionsView;
