import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Grid,
  Row,
  Col,
  Form,
  Input,
  Item,
  Label
} from "native-base";


import {
  StyleSheet,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  TouchableHighlight,
  Modal,
  Alert,
  BackHandler,
  ListView,
  NetInfo
} from "react-native";

import styles from "./styles";
import ImagePicker from "react-native-image-picker";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import DatePicker from 'react-native-datepicker'
import SQLite from "react-native-sqlite-storage";
import StorageManager from "../../storage/StorageManager";
import FormPicker from "../../controls/FormPicker";
import ModalSelector from 'react-native-modal-selector';
import Moment from 'moment';
import Functions from "../../helpers/functions";
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { EventRegister } from 'react-native-event-listeners';
import Spinner from 'react-native-loading-spinner-overlay';
import translate from "../../helpers/translate";
import ImageResizer from 'react-native-image-resizer';
import RNFetchBlob from 'react-native-fetch-blob';
import ProgressiveInput from '../../controls/ProgressiveInput';
import Constants from "../../helpers/constants";

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const B = (props) => <Text style={{fontWeight: 'bold', color: '#cc0033'}}>{props.children}</Text>
const save = require("../../../assets/save.png");
const trash = require("../../../assets/del.png");
const none_1 = require("../../../assets/none_1.png");
const none_2 = require("../../../assets/none_2.png");

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

const ReactPlatform = require("react-native");
const { Platform, Dimensions } = ReactPlatform;
const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1.id !== r2.id,
});
const dsSearchFamilyAnimalia = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1.id !== r2.id,
});

const dsSearchSpeciesPlantae = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1.id !== r2.id,
});
const dsSearchFamilyPlantae = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1.id !== r2.id,
});




class NewContributionView extends React.Component {

  state = {
    visible: false,
    MessageLoading: "",
    ID: 0,
    IdiomaKey: "",
    IdUsuario: "",
    AnimalGroupName: "",
    PlantHabitName: "",
    InteractionName: translate.val('SelecioneInteracao'),
    EventTimeName: "",
    title: translate.val('NovaObservacao'),
    SistemaLocalizacao: translate.val('SistemaLocalizacao'),
    SelecioneOrigemFoto: translate.val('SelecioneOrigemFoto'),
    Camera: translate.val('Camera'),
    Galeria: translate.val('Galeria'),
    Cancelar: translate.val('Cancelar'),
    ErroMensagemIteracao: translate.val('ErroMensagemIteracao'),
    ErroMensagemPlanta: translate.val('ErroMensagemPlanta'),
    ErroMensagemBranco: translate.val('ErroMensagemBranco'),
    ErroMensagemLocalizacao: translate.val('ErroMensagemLocalizacao'),
    ErroMensagem: translate.val('ErroMensagem'),
    SalvandoMensagem: translate.val('SalvandoMensagem'),
    ErroAoSalvar: translate.val('ErroAoSalvar'),
    CarregandoObservacao: translate.val('CarregandoObservacao'),
    Observação: translate.val('Observação'),
    ObservacaoEnviada: translate.val('ObservacaoEnviada'),
    ErroAoCarregar: translate.val('ErroAoCarregar'),
    DesejaExcluir: translate.val('DesejaExcluir'),
    SelecionarGrupoAnimal: translate.val('SelecionarGrupoAnimal'),
    Selecionarlocalizacao: translate.val('Selecionarlocalizacao'),
    InstrucaoLocalizacao: translate.val('InstrucaoLocalizacao'),
    VisualizarFoto: translate.val('VisualizarFoto'),
    FotosInteracao: translate.val('FotosInteracao'),
    InstrucaoFotos: translate.val('InstrucaoFotos'),
    SelecionarFoto: translate.val('SelecionarFoto'),
    PerguntaAnimal: translate.val('PerguntaAnimal'),
    DescricaoFoto: translate.val('DescricaoFoto'),
    FotoPlanta: translate.val('FotoPlanta'),
    HabitoPlanta: translate.val('HabitoPlanta'),
    Localizacao: translate.val('Localizacao'),
    LocalizacaoAtivado: translate.val('LocalizacaoAtivado'),
    AguardandoPrimeiraFoto: translate.val('AguardandoPrimeiraFoto'),
    SelecioneHabito: translate.val('SelecioneHabito'),
    SelecionarManualmente: translate.val('SelecionarManualmente'),
    Pais: translate.val('Pais'),
    Estado: translate.val('Estado'),
    Municipio: translate.val('Municipio'),
    Localidade: translate.val('Localidade'),
    Data: translate.val('Data'),
    Hora: translate.val('Hora'),
    Identificacao: translate.val('Identificacao'),
    CompletarAnimal: translate.val('CompletarAnimal'),
    NomePopular: translate.val('NomePopular'),
    Familia: translate.val('Familia'),
    NomeEspecie: translate.val('NomeEspecie'),
    Observacoes: translate.val('Observacoes'),
    InteracaoAnimalPlanta: translate.val('InteracaoAnimalPlanta'),
    SelecioneTipoInteracao: translate.val('SelecioneTipoInteracao'),
    DescrevaInformacoes: translate.val('DescrevaInformacoes'),
    ObservacoesGerais: translate.val('ObservacoesGerais'),
    Salvar: translate.val('Salvar'),
    Planta: translate.val('Planta'),
    ErroMensagemData: translate.val("ErroMensagemData"),
    ErroMensagemIntervalo: translate.val("ErroMensagemIntervalo"),
    BuscarEspecie: translate.val("BuscarEspecie"),
    BuscarFamilia: translate.val("BuscarFamilia"),
    allowSave: true,
    tookPictureGroup1: false,

    Photo1_Thumbnail: none_1,
    Photo2_Thumbnail: none_1,
    Photo3_Thumbnail: none_1,
    Photo4_Thumbnail: none_1,
    
    tookPictureGroup2: false,

    Photo5_Thumbnail: none_2,
    Photo6_Thumbnail: none_2,
    Photo7_Thumbnail: none_2,
    Photo8_Thumbnail: none_2,

    modalPhoto: false,
    modalPhotoIndex: 0,

    foundPosition: false,
    foundPhotoPosition: false,
    foundGPSPosition: false,
    region: {
      //Centro do país
      latitude: -10.1419,
      longitude: -50.9765,
      latitudeDelta: 30,
      longitudeDelta: 30,
      accuracy: 0,
    },
    modalMap: false,
    modalReady: false,
    modalMarker: {
      //Centro do país
      latitude: -10.1419,
      longitude: -50.9765,
      latitudeDelta: 30,
      longitudeDelta: 30,
      accuracy: 0,
    },
    address: {
      Country: "",
      Stateprovince: "",
      Municipality: "",
      Locality: "",
    },

    OptionsTaxgrp: [],
    Taxgrp: "",

    OptionsHabit: [],
    Habit: "",
    Eventdate: "",
    Verbatimeventdate: "",
    PhotoEventdate: false,
    OptionsEventtime: [],
    Eventtime: "",

    //Identificação Animal
    A_vernacularname: "",
    A_family: "",
    A_scientificname: "",
    A_identificationremarks: "",

    //Identificação Planta
    P_vernacularname: "",
    P_family: "",
    P_scientificname: "",
    P_identificationremarks: "",

    OptionsInteraction: [],
    Interaction: "",
    Eventremarks: "",

    modalSearchAnimalSpecies: false,
    modalSearchPlantSpecies: false,
    modalSearchAnimalFamily: false,
    modalSearchPlantFamily: false,
    value: '',
    dataSource: ds.cloneWithRows([]),
    dataSourceSearchFamilyAnimalia: dsSearchFamilyAnimalia.cloneWithRows([]),
    dataSourceSearchSpeciePlantae: dsSearchSpeciesPlantae.cloneWithRows([]),
    dataSourceSearchFamilyPlantae: dsSearchFamilyPlantae.cloneWithRows([]),
    dataSourceAtual: "",

    styleEventremarks: {height: 15, fontSize: 14, color:'gray',marginTop:5 }
  };

  constructor(props) {
    
    super(props);

    var conn = StorageManager.getConnection();
    conn.executeSql('SELECT 1 FROM Version LIMIT 1').then(() => {

      //Se entrar aqui é pq o banco já está criado
      StorageManager.UpdateDB();
    }).catch((error) => {
      // alert("Received error: ", error)
      StorageManager.restartDB();
      //StorageManager.UpdateDB();
    });
    this.InserirFoto = this.InserirFoto.bind(this);    
    this.onListItemClicked = this.onListItemClicked.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.openModalSearch = this.openModalSearch.bind(this);

  }

  componentWillMount() {
    var conn = StorageManager.getConnection();      
    
    this.state.IdiomaKey = translate.getLanguage(this.state.IdiomaKey);
    this.initialSetup();

    this.listener = EventRegister.addEventListener('DBReady', (data) => {
      conn.transaction(tx => {
        tx.executeSql(
            "SELECT * FROM GuardianModel",
            [],
            (_, results) => {
              if(results.rows.length > 0){
                let row = results.rows.item(0);
                translate.setLanguage(row.Idioma);
                this.setState({ 
                  IdUsuario: row.IdUsuario
                });
                if(!row.Welcome)
                  this.props.navigation.navigate('Presentation');
              }
            }
        );
      });
    });
    
    this.listenerLanguage = EventRegister.addEventListener('Language', (data) => {
      this.setState({
        InteractionName: translate.val('SelecioneInteracao'),
        title: translate.val('NovaObservacao'),
        SistemaLocalizacao: translate.val('SistemaLocalizacao'),
        SelecioneOrigemFoto: translate.val('SelecioneOrigemFoto'),
        Camera: translate.val('Camera'),
        Galeria: translate.val('Galeria'),
        Cancelar: translate.val('Cancelar'),
        ErroMensagemIteracao: translate.val('ErroMensagemIteracao'),
        ErroMensagemPlanta: translate.val('ErroMensagemPlanta'),
        ErroMensagemBranco: translate.val('ErroMensagemBranco'),
        ErroMensagemLocalizacao: translate.val('ErroMensagemLocalizacao'),
        ErroMensagem: translate.val('ErroMensagem'),
        SalvandoMensagem: translate.val('SalvandoMensagem'),
        ErroAoSalvar: translate.val('ErroAoSalvar'),
        CarregandoObservacao: translate.val('CarregandoObservacao'),
        Observação: translate.val('Observação'),
        ObservacaoEnviada: translate.val('ObservacaoEnviada'),
        ErroAoCarregar: translate.val('ErroAoCarregar'),
        DesejaExcluir: translate.val('DesejaExcluir'),
        SelecionarGrupoAnimal: translate.val('SelecionarGrupoAnimal'),
        Selecionarlocalizacao: translate.val('Selecionarlocalizacao'),
        InstrucaoLocalizacao: translate.val('InstrucaoLocalizacao'),
        VisualizarFoto: translate.val('VisualizarFoto'),
        FotosInteracao: translate.val('FotosInteracao'),
        InstrucaoFotos: translate.val('InstrucaoFotos'),
        SelecionarFoto: translate.val('SelecionarFoto'),
        PerguntaAnimal: translate.val('PerguntaAnimal'),
        DescricaoFoto: translate.val('DescricaoFoto'),
        FotoPlanta: translate.val('FotoPlanta'),
        HabitoPlanta: translate.val('HabitoPlanta'),
        Localizacao: translate.val('Localizacao'),
        LocalizacaoAtivado: translate.val('LocalizacaoAtivado'),
        AguardandoPrimeiraFoto: translate.val('AguardandoPrimeiraFoto'),
        SelecioneHabito: translate.val('SelecioneHabito'),
        SelecionarManualmente: translate.val('SelecionarManualmente'),
        ErroMensagemData: translate.val("ErroMensagemData"),
        ErroMensagemIntervalo: translate.val("ErroMensagemIntervalo"),
        Pais: translate.val('Pais'),
        Estado: translate.val('Estado'),
        Municipio: translate.val('Municipio'),
        Localidade: translate.val('Localidade'),
        Data: translate.val('Data'),
        Hora: translate.val('Hora'),
        Identificacao: translate.val('Identificacao'),
        CompletarAnimal: translate.val('CompletarAnimal'),
        NomePopular: translate.val('NomePopular'),
        Familia: translate.val('Familia'),
        NomeEspecie: translate.val('NomeEspecie'),
        Observacoes: translate.val('Observacoes'),
        InteracaoAnimalPlanta: translate.val('InteracaoAnimalPlanta'),
        SelecioneTipoInteracao: translate.val('SelecioneTipoInteracao'),
        DescrevaInformacoes: translate.val('DescrevaInformacoes'),
        ObservacoesGerais: translate.val('ObservacoesGerais'),
        Salvar: translate.val('Salvar'),
        Sim: translate.val('Sim'),
        Nao: translate.val('Nao'),
        BuscarEspecie: translate.val("BuscarEspecie"),
        BuscarFamilia: translate.val("BuscarFamilia")
      });
    });
    this.listenerReload = EventRegister.addEventListener("Reload", (data) => {

      var actualHour = new Date().getHours();
      var index = parseInt(actualHour / 2) * 2;
      var newEventtime = Functions.pad(index, 2) + '' + Functions.pad(index + 2, 2);
      var newEventTimeName = Functions.pad(index, 2) + ' h - ' + Functions.pad(index + 2, 2) + ' h';

      this.setState({
          visible: false,
          MessageLoading: "",
          ID: 0,
          AnimalGroupName: "",
          PlantHabitName: "",
          allowSave: true,
          tookPictureGroup1: false,
          tookPictureGroup2: false,

          Photo1_Thumbnail: none_1,
          Photo2_Thumbnail: none_1,
          Photo3_Thumbnail: none_1,
          Photo4_Thumbnail: none_1,
          Photo5_Thumbnail: none_2,
          Photo6_Thumbnail: none_2,
          Photo7_Thumbnail: none_2,
          Photo8_Thumbnail: none_2,

          modalPhoto: false,
          modalPhotoIndex: 0,

          foundPosition: false,
          foundGPSPosition: false,
          region: {
            //Centro do país
            latitude: -10.1419,
            longitude: -50.9765,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
            accuracy: 0,
          },
          modalMap: false,
          modalReady: false,
          modalMarker: {
            //Centro do país
            latitude: -10.1419,
            longitude: -50.9765,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
            accuracy: 0,
          },
          address: {
            Country: "",
            Stateprovince: "",
            Municipality: "",
            Locality: "",
          },

          Taxgrp: "",

          Habit: "",
          Eventdate: "",
          Verbatimeventdate: "",
          Eventtime: "",

          //Identificação Animal
          A_vernacularname: "",
          A_family: "",
          A_scientificname: "",
          A_identificationremarks: "",

          //Identificação Planta
          P_vernacularname: "",
          P_family: "",
          P_scientificname: "",
          P_identificationremarks: "",

          Interaction: "",
          Eventremarks: "",
      });
    });

  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
    EventRegister.removeEventListener(this.listenerReload);
    EventRegister.removeEventListener(this.listenerLanguage);
  }

  componentDidMount() {
    if(!this.state.foundPhotoPosition){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            foundPosition: true,
            foundGPSPosition: true,
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
              accuracy: position.coords.accuracy
            },
            modalMarker: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
              accuracy: position.coords.accuracy
            },
          });
          this.findAddress(position.coords.latitude, position.coords.longitude);
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
      );

    }

    BackHandler.addEventListener('hardwareBackPress', () => {
      if(this.state.ID > 0)
      {
        this.props.navigation.navigate('MyContributions');
        return true;
      }
      else
      {
        this.props.navigation.navigate("DrawerOpen");
        return true;
      }
    });

    //Se for edição
    if (this.props.navigation.state.params != undefined && this.props.navigation.state.params.id > 0) {
      var id = this.props.navigation.state.params.id;
      this.props.navigation.state.params.id = undefined;
      this.setState({ ID: id, visible: true, MessageLoading: this.state.CarregandoObservacao });
      
      var conn = StorageManager.getConnection();

      conn.transaction(tx => {
        tx.executeSql(
            "SELECT * FROM GuardianModel",
            [],
            (_, results) => {
              if(results.rows.length > 0){
                let row = results.rows.item(0);
                translate.setLanguage(row.Idioma);
                this.setState({ 
                  IdUsuario: row.IdUsuario
                });
                this.state.IdiomaKey = row.Idioma;
              }
              else
              {                
                this.state.IdiomaKey = "pt";
              }
            }
        );
      });

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
          + " ContributionModel.Verbatimeventdate, "
          + " ContributionModel.PhotoEventdate, "
          + " AnimalGroup_Language.value AS AnimalGroupName, " +
          " PlantHabit_Language.value AS PlantHabitName, " +
          " EventTime.Name AS EventTimeName, " +
          " AnimalPlantInteraction_Language.value AS InteractionName " +
          " FROM ContributionModel " +
          " LEFT JOIN AnimalGroup ON (AnimalGroup.key = ContributionModel.Taxgrp) " +
          " LEFT JOIN AnimalGroup_Language ON (AnimalGroup_Language.AnimalGroupId = AnimalGroup.id) " +
          " LEFT JOIN PlantHabit ON (PlantHabit.key = ContributionModel.Habit) " +
          " LEFT JOIN PlantHabit_Language ON (PlantHabit_Language.PlantHabitId = PlantHabit.id) " +
          " LEFT JOIN EventTime ON (EventTime.Code = ContributionModel.Eventtime) " +
          " LEFT JOIN AnimalPlantInteraction ON (AnimalPlantInteraction.key = ContributionModel.Interaction) " +
          " LEFT JOIN AnimalPlantInteraction_Language ON (AnimalPlantInteraction_Language.AnimalPlantInteractionId = AnimalPlantInteraction.id) " +
          " WHERE ContributionModel.ID = ? " +
          "       AND (AnimalGroup.key IS NULL OR AnimalGroup_Language.LanguageId = ?) " +
          "       AND (PlantHabit.key IS NULL OR PlantHabit_Language.LanguageId = ?) " +
          "       AND (AnimalPlantInteraction.key IS NULL OR AnimalPlantInteraction_Language.LanguageId = ?) ",
          [id, this.state.IdiomaKey, this.state.IdiomaKey, this.state.IdiomaKey],
          (tx, results) => {

            if(results.rows.length > 0){
                let row = results.rows.item(0);
                var newState = {};

                newState["AnimalGroupName"] = row.AnimalGroupName;
                newState["PlantHabitName"] = row.PlantHabitName;
                newState["InteractionName"] = row.InteractionName;
                newState["EventTimeName"] = row.EventTimeName;

                newState["allowSave"] = !row.Sended;
                if (newState["allowSave"]) {
                  newState["title"] = this.state.Observação;
                } else {
                  newState["title"] = this.state.ObservacaoEnviada;
                }

                newState["tookPictureGroup1"] = false;
                newState["tookPictureGroup2"] = false;

                ["A", "B", "C", "D", "E", "F", "G", "H"].map(function (letter, index) {
                  if (!Functions.isNullOrEmpty(row["Photo_" + letter + "_Thumbnail"])) {
                    newState["Photo" + (index + 1) + "_Thumbnail"] =  { uri: 'data:image/jpeg;base64,' + row["Photo_" + letter + "_Thumbnail"]};
                    if (index <= 3) {
                      newState["tookPictureGroup1"] = true;
                    }
                    else {
                      newState["tookPictureGroup2"] = true;
                    }
                  }
                  else {
                    newState["Photo" + (index + 1) + "_Thumbnail"] = index <= 3 ? none_1 : none_2;
                  }
                });


                newState["foundPosition"] = true;
                newState["region"] = {
                  latitude: row.Latitude,
                  longitude: row.Longitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                  accuracy: row.Accuracy,
                };
                newState["modalMarker"] = {
                  latitude: row.Latitude,
                  longitude: row.Longitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                  accuracy: 0,
                };
                newState["address"] = {
                  Country: row.Country,
                  Stateprovince: row.Stateprovince,
                  Municipality: row.Municipality,
                  Locality: row.Locality,
                };
                newState["Taxgrp"] = row.Taxgrp;
                newState["Habit"] = row.Habit;
                newState["Eventdate"] =row.Eventdate;
                newState["Eventtime"] = row.Eventtime;
                newState["Verbatimeventdate"] = row.Verbatimeventdate;
                //Identificação Animal
                newState["A_vernacularname"] = row.A_vernacularname;
                newState["A_family"] = row.A_family;
                newState["A_scientificname"] = row.A_scientificname;
                newState["A_identificationremarks"] = row.A_identificationremarks;

                //Identificação Planta
                newState["P_vernacularname"] = row.P_vernacularname;
                newState["P_family"] = row.P_family;
                newState["P_scientificname"] = row.P_scientificname;
                newState["P_identificationremarks"] = row.P_identificationremarks;

                newState["Interaction"] = row.Interaction;
                newState["Eventremarks"] = row.Eventremarks;
                newState["PhotoEventdate"] = row.PhotoEventdate;

                //Tradução

                newState["title"] =  translate.val("NovaObservacao");
                newState["SistemaLocalizacao"] =  translate.val('SistemaLocalizacao');
                newState["SelecioneOrigemFoto"] =  translate.val('SelecioneOrigemFoto');
                newState["Camera"] =  translate.val('Camera');
                newState["Galeria"] =  translate.val('Galeria');
                newState["Cancelar"] =  translate.val('Cancelar');
                newState["ErroMensagemIteracao"] =  translate.val('ErroMensagemIteracao');
                newState["ErroMensagemPlanta"] =  translate.val('ErroMensagemPlanta');
                newState["ErroMensagemBranco"] =  translate.val('ErroMensagemBranco');
                newState["ErroMensagemLocalizacao"] =  translate.val('ErroMensagemLocalizacao');
                newState["ErroMensagem"] =  translate.val('ErroMensagem');
                newState["SalvandoMensagem"] =  translate.val('SalvandoMensagem');
                newState["ErroAoSalvar"] =  translate.val('ErroAoSalvar');
                newState["CarregandoObservacao"] =  translate.val('CarregandoObservacao');
                newState["Observação"] =  translate.val('Observação');
                newState["ObservacaoEnviada"] =  translate.val('ObservacaoEnviada');
                newState["ErroAoCarregar"] =  translate.val('ErroAoCarregar');
                newState["DesejaExcluir"] =  translate.val('DesejaExcluir');
                newState["SelecionarGrupoAnimal"] =  translate.val('SelecionarGrupoAnimal');
                newState["Selecionarlocalizacao"] =  translate.val('Selecionarlocalizacao');
                newState["InstrucaoLocalizacao"] =  translate.val('InstrucaoLocalizacao');
                newState["VisualizarFoto"] =  translate.val('VisualizarFoto');
                newState["FotosInteracao"] =  translate.val('FotosInteracao');
                newState["InstrucaoFotos"] =  translate.val('InstrucaoFotos');
                newState["SelecionarFoto"] =  translate.val('SelecionarFoto');
                newState["PerguntaAnimal"] =  translate.val('PerguntaAnimal');
                newState["DescricaoFoto"] =  translate.val('DescricaoFoto');
                newState["FotoPlanta"] =  translate.val('FotoPlanta');
                newState["HabitoPlanta"] =  translate.val('HabitoPlanta');
                newState["Localizacao"] =  translate.val('Localizacao');
                newState["ErroMensagemData"] =  translate.val("ErroMensagemData");
                newState["ErroMensagemIntervalo"] = translate.val("ErroMensagemIntervalo");
                newState["LocalizacaoAtivado"] =  translate.val('LocalizacaoAtivado');
                newState["AguardandoPrimeiraFoto"] =  translate.val('AguardandoPrimeiraFoto');
                newState["SelecioneHabito"] =  translate.val('SelecioneHabito');
                newState["SelecionarManualmente"] =  translate.val('SelecionarManualmente');
                newState["Pais"] =  translate.val('Pais');
                newState["Estado"] =  translate.val('Estado');
                newState["Municipio"] =  translate.val('Municipio');
                newState["Localidade"] =  translate.val('Localidade');
                newState["Data"] =  translate.val('Data');
                newState["Hora"] =  translate.val('Hora');
                newState["Identificacao"] =  translate.val('Identificacao');
                newState["CompletarAnimal"] =  translate.val('CompletarAnimal');
                newState["NomePopular"] =  translate.val('NomePopular');
                newState["Familia"] =  translate.val('Familia');
                newState["NomeEspecie"] =  translate.val('NomeEspecie');
                newState["Observacoes"] =  translate.val('Observacoes');
                newState["InteracaoAnimalPlanta"] =  translate.val('InteracaoAnimalPlanta');
                newState["SelecioneTipoInteracao"] =  translate.val('SelecioneTipoInteracao');
                newState["DescrevaInformacoes"] =  translate.val('DescrevaInformacoes');
                newState["ObservacoesGerais"] =  translate.val('ObservacoesGerais');
                newState["Salvar"] =  translate.val('Salvar');
                newState["Sim"] =  translate.val('Sim');
                newState["Nao"] =  translate.val('Nao');
                newState["BuscarEspecie"] = translate.val("BuscarEspecie");
                newState["BuscarFamilia"] = translate.val("BuscarFamilia");
                newState["modalSearchAnimalSpecies"] = false;
                newState["modalSearchPlantSpecies"] = false;
                newState["modalSearchAnimalFamily"] = false;
                newState["modalSearchPlantFamily"] = false;
                this.setState(newState);
              }
              this.setState({ visible: false });
            },
            (error) => {
              this.setState({ visible: false });
              alert(this.state.ErroAoCarregar + JSON.stringify(error));
            }
          );
      });
    }

    if (this.props.navigation.state.params != undefined && this.props.navigation.state.params.welcome == 1) {
      var conn = StorageManager.getConnection();
      conn.transaction(tx => {
        tx.executeSql(
          'UPDATE GuardianModel SET  Welcome=?',
          [true], 
          (_, results) => 
          {
            //translate.setLanguage(this.state.IdiomaKey);
            this.initialSetup();
          },
          (error) => 
          {
            
          }
        );
      });
    }
  }


  updateStyleEventremarks(height){
    var new_style = { padding: 3, height: height + 10, fontSize: 16, color: "gray" };
    if(!Functions.isNullOrEmpty(this.state.Eventremarks)){
      new_style["color"] = "black";
    }
    this.setState({ styleEventremarks: new_style });
  }

  inputStyle(value){
      var new_style = { padding: 3, height: 40, fontSize: 16, color: "gray" };

      if(!Functions.isNullOrEmpty(value)){
        new_style["color"] = "black";
        new_style["fontSize"] = 18;
      }

      return new_style;
  }

  initialSetup() {
    var conn = StorageManager.getConnection();
    
    conn.transaction(tx => {
      tx.executeSql(
        "SELECT AnimalGroup.key AS Code, AnimalGroup_Language.value AS Name " +
        " FROM AnimalGroup " +
        " INNER JOIN AnimalGroup_Language ON (AnimalGroup_Language.AnimalGroupId = AnimalGroup.id) " +
        " WHERE LanguageId = ? " +
        " ORDER BY AnimalGroup.key ",
        [this.state.IdiomaKey],
        (_, results) => {
          var groups = new Array();
          for (let i = 0; i < results.rows.length; i++) {
            group = results.rows.item(i);
            groups.push({
              key: i,
              label: group.Name,
              value: group.Code,
            });
          }
          this.setState({ OptionsTaxgrp: groups });
        }
      );

      tx.executeSql(
        " SELECT PlantHabit.key AS Code, PlantHabit_Language.value AS Name" +
        " FROM PlantHabit " +
        " INNER JOIN PlantHabit_Language ON (PlantHabit_Language.PlantHabitId = PlantHabit.id) " +
        " WHERE LanguageId = ? " +
        " ORDER BY PlantHabit.id ",
        [this.state.IdiomaKey],
        (_, results) => {
          var habits = new Array();
          for (let i = 0; i < results.rows.length; i++) {
            habit = results.rows.item(i);
            habits.push({
              key: i,
              label: habit.Name,
              value: habit.Code,
            });
          }
          this.setState({ OptionsHabit: habits });
        }
      );

      tx.executeSql(
        "SELECT * FROM EventTime",
        [],
        (_, results) => {
          var times = new Array();
          for (let i = 0; i < results.rows.length; i++) {
            itemTime = results.rows.item(i);
            times.push({
              key: i,
              label: itemTime.Name,
              value: itemTime.Code,
            });
          }
          this.setState({ OptionsEventtime: times });
        }
      );

      tx.executeSql(
        "SELECT AnimalPlantInteraction.key AS Code, AnimalPlantInteraction_Language.value AS Name " +
        " FROM AnimalPlantInteraction " +
        " INNER JOIN AnimalPlantInteraction_Language ON (AnimalPlantInteraction_Language.AnimalPlantInteractionId = AnimalPlantInteraction.id) " +
        " WHERE LanguageId = ? " +
        " ORDER BY AnimalPlantInteraction.id ",
        [this.state.IdiomaKey],
        (_, results) => {
          var interactions = new Array();
          for (let i = 0; i < results.rows.length; i++) {
            let interaction = results.rows.item(i);
            interactions.push({
              key: i,
              label: interaction.Name,
              value: interaction.Code,
            });
          }
          this.setState({ OptionsInteraction: interactions });
        }
      );
    });


  }

  selectPhoto1 = () => {
    this.selectPhotoTapped("1");
  };
  selectPhoto2 = () => {
    this.selectPhotoTapped("2");
  };
  selectPhoto3 = () => {
    this.selectPhotoTapped("3");
  };
  selectPhoto4 = () => {
    this.selectPhotoTapped("4");
  };
  selectPhoto5 = () => {
    this.selectPhotoTapped("5");
  };
  selectPhoto6 = () => {
    this.selectPhotoTapped("6");
  };
  selectPhoto7 = () => {
    this.selectPhotoTapped("7");
  };
  selectPhoto8 = () => {
    this.selectPhotoTapped("8");
  };

  selectPhotoTapped(selectedPhoto) {
    const options = {
      quality: 1.0,
      title: this.state.SelecioneOrigemFoto,
      takePhotoButtonTitle: this.state.Camera,
      chooseFromLibraryButtonTitle: this.state.Galeria,
      cancelButtonTitle: this.state.Cancelar,
      storageOptions: {
        skipBackup: true
      }
    };
    
    ImagePicker.showImagePicker(options, (response) => {
      this.setState({ visible: true});
      if (response.didCancel) {
        this.setState({ visible: false});
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        this.setState({ visible: false});
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        this.setState({ visible: false});
        console.log('User tapped custom button: ', response.customButton);
      }
      else 
      {
        
        let group = "1";
        if (selectedPhoto > 4) {
          group = "2";
        }
        tookPicture = {};
        tookPicture["tookPictureGroup" + group] = true;;
        this.setState(tookPicture);

        let photoData = '';
        if(Platform.OS === "android" )
        {
          photoData = response.path;
        }
        else
        {
          let uri = response.uri;
          uri = uri.split('file:///');
          photoData = uri[1];
        }
        if(this.state.Verbatimeventdate == "" && response.timestamp != undefined)
        {
          this.setState({Verbatimeventdate: response.timestamp});
        }
        let latitude = response.latitude;
        let longitude = response.longitude;
        let dateHour = response.timestamp;
        let Thumbnail = "";
        var sourceFoto = {};
       
        ImageResizer.createResizedImage('data:image/jpeg;base64,' + response.data, 500, 500,'JPEG', 100).then((resizedImageUri) => {
          RNFetchBlob.fs.readFile(resizedImageUri.path, 'base64')
          .then((dataImage) => {
            Thumbnail = dataImage;
            let source = { uri: resizedImageUri.uri };
            sourceFoto["Photo" + selectedPhoto + "_Thumbnail"] = source;
            this.setState(sourceFoto);
            this.InserirFoto(selectedPhoto, photoData, Thumbnail);
          });
        }).catch((err) => {
          this.setState({ visible: false });
          alert(JSON.stringify(err));
        });
        if (!this.state.foundPhotoPosition) 
        {
          if (latitude === undefined || longitude === undefined) 
          {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;

                this.setState({
                  foundPhotoPosition: true,
                  foundPosition: true,
                  region: {
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                    accuracy: position.coords.accuracy
                  },
                  modalMarker: {
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                    accuracy: 0
                  }
                });

                this.findAddress(latitude, longitude);
              },
              (error) => { this.setState({ message: error.message }); },
              { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
            );
          }
          else 
          {
            this.setState({
              foundPhotoPosition: true,
              foundPosition: true,
              region: {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
                accuracy: 0
              }
              ,
              modalMarker: {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
                accuracy: 0
              }
            });
            this.findAddress(latitude, longitude);
          }
        }
        if(!Functions.isNullOrEmpty(dateHour) && !this.state.PhotoEventdate)
        {
          dateHour =  Moment(response.timestamp).format('DD/MM/YYYY HH:mm:ss'); 
          dateHour = dateHour.split(" ");
          let hora = dateHour[1].split(":");
          var index = parseInt(hora[0] / 2) * 2;
          var newEventtime = Functions.pad(index, 2) + '' + Functions.pad(index + 2, 2);
          var newEventTimeName = Functions.pad(index, 2) + ' h - ' + Functions.pad(index + 2, 2) + ' h';
  
          this.setState({
            PhotoEventdate: true,
            Eventdate:  Moment(response.timestamp).format('DD/MM/YYYY'),
            Eventtime: newEventtime,
            EventTimeName: newEventTimeName
          });
        }
      }
    });
  }

  InserirFoto(index, photoData, Thumbnail)
  {
    var photoLetters = ["A","B","C","D","E","F","G","H"];
    var conn = StorageManager.getConnection();

    var sqlcommand = "";
    
    var input = [
      false, //sendend
      true, // provisorio
      photoData, //foto original
      Thumbnail, //foto Thumbnail
    ];
    if(this.state.ID > 0 )
    {
      input.push(this.state.IdUsuario, this.state.ID);
      sqlcommand = "UPDATE ContributionModel SET "
                  + "Sended = ?, "
                  + "Provisional = ?, "
                  + "Photo_"+ photoLetters[index-1] +" = ?,  "
                  + " Photo_" + photoLetters[index-1] + "_Thumbnail = ?,  "
                  + " IdUsuario = ?  "
                  + "WHERE ID = ? ; ";
    }
    else
    {
      input.push(this.state.IdUsuario, this.state.Eventdate, this.state.Eventtime, Moment(new Date()).format('DD/MM/YYYY HH:mm:ss'));
      sqlcommand = "INSERT INTO ContributionModel ("
                  + "Sended, "
                  + "Provisional, "
                  + "Photo_"+ photoLetters[index-1] +",  "
                  + "Photo_" + photoLetters[index-1] + "_Thumbnail, "
                  + "IdUsuario, "
                  + 'Eventdate, '
                  + 'Eventtime, '
                  + "Creation)"
                  + "VALUES (?, ?, ?, ?, ?, ?,?,?);";
    }
    
    conn.transaction(tx => {
      tx.executeSql(
        sqlcommand,
        input,
        (_, results) => {
          this.setState({ visible: false });
          if(this.state.ID <= 0 )
          {
            this.setState({ID: results.insertId });
          }
        },
        (error) => {
          this.setState({ visible: false });
          alert(this.state.ErroAoSalvar + JSON.stringify(error));
        }
      );
    });
    return "Photo_" + photoLetters[index-1];

  }

  findAddress(latitude, longitude) {
    return fetch("https://guardioes.cria.org.br/infoxy/lat/" + latitude + "/long/" + longitude)
      .then((response) => response.text())
      .then((text) => {
        var info = text.split(';');
        infoAddress = {
          Country: info[0],
          Stateprovince: info[1],
          Municipality: info[2],
          Locality: info[2].trim().toUpperCase() === info[3].trim().toUpperCase() ? "" : info[3],
        };
        this.setState({ address: infoAddress });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  SaveContribution() {

    var errorMessages = new Array();
    if (!this.state.tookPictureGroup1) {
      errorMessages.push(this.state.ErroMensagemIteracao);
    }
    if (!this.state.tookPictureGroup2) {
      errorMessages.push(this.state.ErroMensagemPlanta);
    }
    if (this.state.Taxgrp == "") {
      errorMessages.push(this.state.ErroMensagemBranco);
    }
    if (!this.state.foundPosition && !this.state.foundGPSPosition) {
      errorMessages.push(this.state.ErroMensagemLocalizacao);
    }   
    
    if (Functions.isNullOrEmpty(this.state.Eventdate)) {
      errorMessages.push(this.state.ErroMensagemData);
    }   
    if (Functions.isNullOrEmpty(this.state.Eventtime)) {
      errorMessages.push(this.state.ErroMensagemIntervalo);
    }   

    if (errorMessages.length > 0) {
      Alert.alert(
        this.state.ErroMensagem,
        errorMessages.join("\n"),
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      );
    }
    else {
      this.setState({ visible: true, MessageLoading: this.state.SalvandoMensagem });
      var conn = StorageManager.getConnection();

      var sqlcommand = "";

      var input = [
        this.state.region.latitude,
        this.state.region.longitude,
        this.state.region.accuracy,
        0, //TODO pegar altitude
        this.state.address.Country,
        this.state.address.Stateprovince,
        this.state.address.Municipality,
        this.state.address.Locality,
        this.state.Habit,
        this.state.Interaction,
        this.state.P_vernacularname,
        this.state.P_family,
        this.state.P_scientificname,
        this.state.P_identificationremarks,
        this.state.A_vernacularname,
        this.state.Taxgrp,
        this.state.A_family,
        this.state.A_scientificname,
        this.state.A_identificationremarks,
        this.state.Eventremarks, 
        this.state.IdUsuario,
        false, //campo provisorio,
        this.state.Eventdate, 
        this.state.Verbatimeventdate,
        this.state.Eventtime, 
        this.state.PhotoEventdate
      ];
      // alert("aloka: " + JSON.stringify(input));
      //Edição: temos o campo ID
      input.push(this.state.ID);
      sqlcommand = " UPDATE ContributionModel SET"
        + " Latitude = ?,"
        + " Longitude = ?,"
        + " Accuracy = ?,"
        + " Elevation = ?,"
        + " Country = ?,"
        + " Stateprovince = ?,"
        + " Municipality = ?,"
        + " Locality = ?,"
        + " Habit = ?,"
        + " Interaction = ?,"
        + " P_vernacularname = ?,"
        + " P_family = ?,"
        + " P_scientificname = ?,"
        + " P_identificationremarks = ?,"
        + " A_vernacularname = ?,"
        + " Taxgrp = ?,"
        + " A_family = ?,"
        + " A_scientificname = ?,"
        + " A_identificationremarks = ?,"
        + " Eventremarks = ?,"         
        + " IdUsuario = ?, "
        + " Provisional = ?, "
        + " Eventdate = ?, "
        + " Verbatimeventdate = ?, "
        + " EventTime = ?, "
        + " PhotoEventdate = ?"
        + " WHERE ID = ?;";

      conn.transaction(tx => {
        tx.executeSql(
          sqlcommand,
          input,
          (_, results) => {
            this.setState({ visible: false });
            this.props.navigation.navigate('MyContributions', { inserted: true });
          },
          (error) => {
            this.setState({ visible: false });
            alert(this.state.ErroAoSalvar + JSON.stringify(error));
          }
        );
      });
    }
  }

  async openModalSearch(abriModal){
    let isConnected = await NetInfo.isConnected.fetch().then(isConnected => {
      return isConnected;
    }); 
    if(isConnected)
    {
      if(abriModal == "dsSearchSpecieAnimalia")
      {
        this.setState({
          modalSearchAnimalSpecies: true,
          dataSourceAtual: "dsSearchSpecieAnimalia"
        });
      }
      else if(abriModal == "dsSearchFamilyAnimalia")
      {
        this.setState({
          modalSearchAnimalFamily: true,
          dataSourceAtual: "dsSearchFamilyAnimalia"
        });
      }
      else if(abriModal == "dsSearchSpeciePlantae")
      {
        this.setState({
          modalSearchPlantSpecies: true,
          dataSourceAtual: "dsSearchSpeciePlantae"
        });
      }
      else
      {
        this.setState({
          modalSearchPlantFamily: true,
          dataSourceAtual: "dsSearchFamilyPlantae"
        });
      }
      
    }
  }

  async _onChangeTextSearchFamilyAnimalia(text) {
    this.setState({isLoading: true, value: text,  A_family: text});
    setTimeout(async() => {
      let Api = Constants.getApiAutoComplete();
      Api = Api + "kingdom=animalia&family=" + text;
      var objAjax = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify("")
      };
      alert("Api: " + Api);

      await Functions.trustFetch(Api, objAjax)
      .then((response) => {
        let resp = response.json();
        this.setState({
          isLoading: false,
          dataSourceSearchFamilyAnimalia: dsSearchFamilyAnimalia.cloneWithRows(resp.results),
          dataSourceAtual: "dsSearchFamilyAnimalia"
        });
      })
      .catch((error) =>{
        console.error("Erro: " + error);
      });
    }, 5000);
  }

  async _onChangeText(text) {
    this.setState({isLoading: true, value: text,  A_scientificname: text});
    setTimeout(async() => {
      let Api = Constants.getApiAutoComplete();
      Api = Api + "kingdom=animalia&sciname=" + text;
      var objAjax = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify("")
      };
      await Functions.trustFetch(Api, objAjax)
      .then((response) => {
        let resp = response.json();
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(resp.results),
          dataSourceAtual: "dsSearchSpecieAnimalia"
        });
      })
      .catch((error) =>{
        console.error("Erro: " + error);
      });
    }, 5000);
  }

  async _onChangeTextSearchFamilyPlantae(text) {
    this.setState({isLoading: true, value: text,  P_family: text});
    setTimeout(async() => {
      let Api = Constants.getApiAutoComplete();
      Api = Api + "kingdom=plantae&family=" + text;
      var objAjax = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify("")
      };
      await Functions.trustFetch(Api, objAjax)
      .then((response) => {
        let resp = response.json();
        this.setState({
          isLoading: false,
          dataSourceSearchFamilyPlantae: dsSearchFamilyPlantae.cloneWithRows(resp.results),
          dataSourceAtual: "dsSearchFamilyPlantae"
        });
      })
      .catch((error) =>{
        console.error("Erro: " + error);
      });
    }, 5000);
  }

  async _onChangeTextSearchSpeciesPlantae(text) {
    this.setState({isLoading: true, value: text,  P_scientificname: text});
    setTimeout(async() => {
      let Api = Constants.getApiAutoComplete();
      Api = Api + "kingdom=plantae&sciname=" + text;
      var objAjax = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify("")
      };
      await Functions.trustFetch(Api, objAjax)
      .then((response) => {
        let resp = response.json();
        this.setState({
          isLoading: false,
          dataSourceSearchSpeciePlantae: dsSearchSpeciesPlantae.cloneWithRows(resp.results),
          dataSourceAtual: "dsSearchSpeciePlantae"
        });
      })
      .catch((error) =>{
        console.error("Erro: " + error);
      });
    }, 5000);
  }

  renderRow(prediction) {
    return (
      <TouchableOpacity
        onPress={() => this.onListItemClicked(prediction)}
        style={stylesSearch.listItem}
      >
        <Text>{prediction.value}</Text>
      </TouchableOpacity>
    );
  }

  onInputCleared() {

    if(this.state.dataSourceAtual == "dsSearchSpecieAnimalia")
    {
      this.setState({
        value: '',
        isLoading: false,
        dataSource: ds.cloneWithRows([]),
      });
    }
    else if(this.state.dataSourceAtual == "dsSearchFamilyAnimalia")
    {
      this.setState({
        value: '',
        isLoading: false,
        dataSourceSearchFamilyAnimalia: dsSearchFamilyAnimalia.cloneWithRows([]),
      });
    }
    else if(this.state.dataSourceAtual == "dsSearchSpeciePlantae")
    {
      this.setState({
        value: '',
        isLoading: false,
        dataSourceSearchSpeciePlantae: dsSearchSpeciesPlantae.cloneWithRows([]),
      });
    }
    else
    {
      this.setState({
        value: '',
        isLoading: false,
        dataSourceSearchFamilyPlantae: dsSearchFamilyPlantae.cloneWithRows([]),
      });
    }
  }

  renderSeparator() {
    return <View style={stylesSearch.listItemSeparator} />;
  }

  onListItemClicked(prediction) {
    //alert("prediction: " + JSON.stringify(prediction));

    if(this.state.dataSourceAtual == "dsSearchSpecieAnimalia")
    {
      this.setState({
        modalSearchAnimalSpecies: false,
        dataSource: ds.cloneWithRows([]),
        isLoading: false,
        A_scientificname: prediction.value
      });
    }
    else if(this.state.dataSourceAtual == "dsSearchFamilyAnimalia")
    {
      this.setState({
        modalSearchAnimalFamily: false,
        dataSourceSearchFamilyAnimalia: dsSearchFamilyAnimalia.cloneWithRows([]),
        isLoading: false,
        A_family: prediction.value
      });
    }
    else if(this.state.dataSourceAtual == "dsSearchSpeciePlantae")
    {
      this.setState({
        modalSearchPlantSpecies: false,
        dataSourceSearchSpeciePlantae: dsSearchSpeciesPlantae.cloneWithRows([]),
        isLoading: false,
        P_scientificname: prediction.value
      });
    }
    else
    {
      this.setState({
        modalSearchPlantFamily: false,
        dataSourceSearchFamilyPlantae: dsSearchFamilyPlantae.cloneWithRows([]),
        isLoading: false,
        P_family: prediction.value
      });
    }
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Title style={styles.TitleNew}>{this.state.title}</Title>
          <Right></Right>
        </Header>
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
              <Button transparent onPress={() => {
                this.setState({ modalReady: false });
                this.setState({ modalMap: false });
              }}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Title style={styles.TitleNew}>{this.state.Selecionarlocalizacao}</Title>
            <Right>
              <Button transparent onPress={() => {

                this.setState({
                  foundPosition: true,
                  region: {
                    latitude: this.state.modalMarker.latitude,
                    longitude: this.state.modalMarker.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                    accuracy: 0
                  }
                });

                this.findAddress(this.state.modalMarker.latitude, this.state.modalMarker.longitude);
                this.setState({ modalMap: false });
              }}>
                <IconFontAwesome
                  name="check-square"
                  style={styles.iconSave}
                  size={30}
                />
              </Button>
            </Right>
          </Header>
          <Label style={styles.ObservacaoMapa}><B>Obs:</B>{this.state.InstrucaoLocalizacao}</Label>
          <MapView
            region={this.state.modalMarker}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            style={{
              flex: 1
            }}
          >
            <MapView.Marker draggable
              coordinate={this.state.modalMarker}
              onDragEnd={(e) => this.setState({
                modalMarker:
                  {
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                    accuracy: 0
                  }
              })}
            />
          </MapView>

        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalPhoto}
          onRequestClose={() => {
            this.setState({ modalPhoto: false });
          }}
        >
          <Header>
            <Left>
              <Button transparent onPress={() => {
                this.setState({ modalPhoto: false });
              }}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>{this.state.VisualizarFoto}</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => {

                Alert.alert(
                  '',
                  this.state.DesejaExcluir,
                  [
                    { text: this.state.Nao, onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    {
                      text: this.state.Sim, onPress: () => {

                        //TODO LIMPAR NO BANCO
                        var tookPictureGroup = false;
                        var cleanPhoto = {};
                        cleanPhoto["modalPhoto"] = false;
                        if (this.state.modalPhotoIndex <= 4) {
                          // alert("Aloka: " + this.state.modalPhotoIndex);
                          // this.state["Photo" + this.state.modalPhotoIndex  + "_Thumbnail"] = none_1;

                          if(this.state.modalPhotoIndex  == 1)
                          {
                            this.setState({
                              "Photo1_Thumbnail": none_1
                            });

                          }
                          else if(this.state.modalPhotoIndex  == 2)
                          {
                            this.setState({
                              "Photo2_Thumbnail": none_1
                            });
                          } 
                          else if(this.state.modalPhotoIndex  == 3)
                          {
                            this.setState({
                              "Photo3_Thumbnail": none_1
                            });
                          } 
                          else
                          {
                            this.setState({
                              "Photo4_Thumbnail": none_1
                            });
                          } 

                          cleanPhoto["Photo" + this.state.modalPhotoIndex + "_Thumbnail"] = none_1;
                          for (let i = 1; i <= 4; i++) {
                            if (i != this.state.modalPhotoIndex && this.state["Photo" + i + "_Thumbnail"] != none_1) {
                              tookPictureGroup = true;
                            }
                          }
                          cleanPhoto["tookPictureGroup1"] = tookPictureGroup;
                          this.setState(cleanPhoto);
                        }
                        else
                        {

                          if(this.state.modalPhotoIndex  == 1)
                          {
                            this.setState({
                              "Photo5_Thumbnail": none_2
                            });

                          }
                          else if(this.state.modalPhotoIndex  == 2)
                          {
                            this.setState({
                              "Photo6_Thumbnail": none_2
                            });
                          } 
                          else if(this.state.modalPhotoIndex  == 3)
                          {
                            this.setState({
                              "Photo7_Thumbnail": none_2
                            });
                          } 
                          else
                          {
                            this.setState({
                              "Photo8_Thumbnail": none_2
                            });
                          } 

                          cleanPhoto["Photo" + this.state.modalPhotoIndex + "_Thumbnail"] = none_2;
                          for (let i = 5; i <= 8; i++) {
                            if (i != this.state.modalPhotoIndex && this.state["Photo" + i + "_Thumbnail"] != none_2) {
                              tookPictureGroup = true;
                            }
                          }
                          cleanPhoto["tookPictureGroup2"] = tookPictureGroup;
                          this.setState(cleanPhoto);
                        }
                        // cleanPhoto["Photo" + this.state.modalPhotoIndex + "_Thumbnail"] = "";
                        // this.setState(cleanPhoto);
                      }
                    },
                  ]
                );
              }}
              >

                <IconFontAwesome
                  name="trash"
                  style={styles.iconTrash}
                  size={30}
                />
              </Button>
            </Right>
          </Header>
          <Image source={this.state.modalPhoto_Source} style={{ flex: 1 }} />
        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalSearchAnimalSpecies}
          onRequestClose={() => {
            this.setState({ modalSearchAnimalSpecies: false });
          }}
        >
          <Header>
            <Left>
              <Button transparent onPress={() => {
                this.setState({ modalSearchAnimalSpecies: false });
              }}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>{this.state.BuscarEspecie}</Title>
            </Body>
            <Right>
              <Button transparent
                onPress={() => {
                  this.setState({ modalSearchAnimalSpecies: false })
                }}
              >
                <IconFontAwesome
                  name="check-square"
                  style={styles.iconSave}
                  size={30}
                />
              </Button>
            </Right>
          </Header>
          <ProgressiveInput
            value={this.state.A_scientificname}
            isLoading={this.state.visible}
            onChangeText={this._onChangeText.bind(this)}
            style={{marginTop: 5}}
          />
          <View style={stylesSearch.listViewContainer}>
            <ListView
              enableEmptySections
              style={stylesSearch.listView}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
              renderSeparator={this.renderSeparator}
            />
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalSearchAnimalFamily}
          onRequestClose={() => {
            this.setState({ modalSearchAnimalFamily: false });
          }}
        >
          <Header>
            <Left>
              <Button transparent onPress={() => {
                this.setState({ modalSearchAnimalFamily: false });
              }}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>{this.state.BuscarFamilia}</Title>
            </Body>
            <Right>
              <Button transparent
                onPress={() => {
                  this.setState({ modalSearchAnimalFamily: false })
                }}
              >
                <IconFontAwesome
                  name="check-square"
                  style={styles.iconSave}
                  size={30}
                />
              </Button>
            </Right>
          </Header>
          <ProgressiveInput
            value={this.state.A_family}
            isLoading={this.state.visible}
            onChangeText={this._onChangeTextSearchFamilyAnimalia.bind(this)}
            style={{marginTop: 5}}
          />
          <View style={stylesSearch.listViewContainer}>
            <ListView
              enableEmptySections
              style={stylesSearch.listView}
              dataSource={this.state.dataSourceSearchFamilyAnimalia}
              renderRow={this.renderRow}
              renderSeparator={this.renderSeparator}
            />
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalSearchPlantSpecies}
          onRequestClose={() => {
            this.setState({ modalSearchPlantSpecies: false });
          }}
        >
          <Header>
            <Left>
              <Button transparent onPress={() => {
                this.setState({ modalSearchPlantSpecies: false });
              }}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>{this.state.BuscarEspecie}</Title>
            </Body>
            <Right>
              <Button transparent
                onPress={() => {
                  this.setState({ modalSearchPlantSpecies: false })
                }}
              >
                <IconFontAwesome
                  name="check-square"
                  style={styles.iconSave}
                  size={30}
                />
              </Button>
            </Right>
          </Header>
          <ProgressiveInput
            value={this.state.P_scientificname}
            isLoading={this.state.visible}
            onChangeText={this._onChangeTextSearchSpeciesPlantae.bind(this)}
            style={{marginTop: 5}}
          />
          <View style={stylesSearch.listViewContainer}>
            <ListView
              enableEmptySections
              style={stylesSearch.listView}
              dataSource={this.state.dataSourceSearchSpeciePlantae}
              renderRow={this.renderRow}
              renderSeparator={this.renderSeparator}
            />
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalSearchPlantFamily}
          onRequestClose={() => {
            this.setState({ modalSearchPlantFamily: false });
          }}
        >
          <Header>
            <Left>
              <Button transparent onPress={() => {
                this.setState({ modalSearchPlantFamily: false });
              }}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>{this.state.BuscarFamilia}</Title>
            </Body>
            <Right>
              <Button transparent
                onPress={() => {
                  this.setState({ modalSearchPlantFamily: false })
                }}
              >
                <IconFontAwesome
                  name="check-square"
                  style={styles.iconSave}
                  size={30}
                />
              </Button>
            </Right>
          </Header>
          <ProgressiveInput
            value={this.state.P_family}
            isLoading={this.state.visible}
            onChangeText={this._onChangeTextSearchFamilyPlantae.bind(this)}
            style={{marginTop: 5}}
          />
          <View style={stylesSearch.listViewContainer}>
            <ListView
              enableEmptySections
              style={stylesSearch.listView}
              dataSource={this.state.dataSourceSearchFamilyPlantae}
              renderRow={this.renderRow}
              renderSeparator={this.renderSeparator}
            />
          </View>
        </Modal>

        <Content padder>

          <Form>
          <Grid style={{ alignContent: "flex-start", alignItems: "flex-start", marginLeft: 10, marginTop:20 }}>
            <Row style={styles.sectionTitleRow}>
              <Text style={{ color: "green", fontSize: 20 }}>{this.state.FotosInteracao}</Text>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Text style={{ color: "gray" }}>{this.state.InstrucaoFotos}</Text>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={this.selectPhoto1}
                  onLongPress={() => {
                    if (this.state.Photo1_Thumbnail != "") {
                      this.setState({ modalPhoto_Source: this.state.Photo1_Thumbnail, modalPhoto: true, modalPhotoIndex: 1 });
                    }
                  }}>
                  <View style={stylesCamera.ImageContainerAnimal}>

                    {this.state.Photo1_Thumbnail === null ? <Text>{this.state.SelecionarFoto}</Text> :
                      <Image style={stylesCamera.ImageContainerAnimal} source={this.state.Photo1_Thumbnail} />
                    }
                  </View>
                </TouchableOpacity>
              </Col>
              <Col style={{ alignItems: 'flex-start', marginLeft: 5 }}>
                <TouchableOpacity onPress={this.selectPhoto2}
                  onLongPress={() => {
                    if (this.state.Photo2_Thumbnail != "") {
                      this.setState({ modalPhoto_Source: this.state.Photo2_Thumbnail, modalPhoto: true, modalPhotoIndex: 2 });
                    }
                  }}>
                  <View style={stylesCamera.ImageContainerAnimal}>
                    {this.state.Photo2_Thumbnail === null ? <Text>{this.state.SelecionarFoto}</Text> :
                      <Image style={stylesCamera.ImageContainerAnimal} source={this.state.Photo2_Thumbnail} />
                    }
                  </View>
                </TouchableOpacity>
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={this.selectPhoto3}
                  onLongPress={() => {
                    if (this.state.Photo3_Thumbnail != "") {
                      this.setState({ modalPhoto_Source: this.state.Photo3_Thumbnail, modalPhoto: true, modalPhotoIndex: 3 });
                    }
                  }}>
                  <View style={stylesCamera.ImageContainerAnimal}>
                    {this.state.Photo3_Thumbnail === null ? <Text>{this.state.SelecionarFoto}</Text> :
                      <Image style={stylesCamera.ImageContainerAnimal} source={this.state.Photo3_Thumbnail} />
                    }
                  </View>
                </TouchableOpacity>
              </Col>
              <Col style={{ alignItems: 'flex-start', marginLeft: 5 }}>
                <TouchableOpacity onPress={this.selectPhoto4}
                  onLongPress={() => {
                    if (this.state.Photo4_Thumbnail != "") {
                      this.setState({ modalPhoto_Source: this.state.Photo4_Thumbnail, modalPhoto: true, modalPhotoIndex: 4 });
                    }
                  }}>
                  <View style={stylesCamera.ImageContainerAnimal}>
                    {this.state.Photo4_Thumbnail === null ? <Text>{this.state.SelecionarFoto}</Text> :
                      <Image style={stylesCamera.ImageContainerAnimal} source={this.state.Photo4_Thumbnail} />
                    }
                  </View>
                </TouchableOpacity>
              </Col>
            </Row>
            <Row style={styles.sectionTitleRow}>
              <Text style={{ color: "green", fontSize: 20 , marginTop:20}}>{this.state.PerguntaAnimal}</Text>
            </Row>
            <Row>
              <Content>
                <View style={{ flex: 1, justifyContent: 'space-around'}}>
                  <ModalSelector
                    data={this.state.OptionsTaxgrp}
                    cancelText= {this.state.Cancelar}
                    initValue={this.state.SelecionarGrupoAnimal}
                    optionTextStyle={{color: "black"}}
                    onChange={option => { this.setState({ AnimalGroupName: option.label, Taxgrp: option.value }) }}>
                    <Item>
                      <Input
                        style={{ marginBottom:7}}
                        editable={false}
                        placeholder={this.state.SelecionarGrupoAnimal}
                        value={this.state.AnimalGroupName}
                      />
                    </Item>
                  </ModalSelector>
                </View>
              </Content>
            </Row>
            <Row style={styles.sectionTitleRow}>
              <Text style={{ color: "green", fontSize: 20, marginTop:20 }}>{this.state.FotoPlanta}</Text>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Text style={{ color: "gray" }}>{this.state.DescricaoFoto}</Text>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={this.selectPhoto5}
                  onLongPress={() => {
                    if (this.state.Photo5_Thumbnail != "") {
                      this.setState({ modalPhoto_Source: this.state.Photo5_Thumbnail, modalPhoto: true, modalPhotoIndex: 5 });
                    }
                  }}>
                  <View style={stylesCamera.ImageContainer}>
                    {this.state.Photo5_Thumbnail === null ? <Text>{this.state.SelecionarFoto}</Text> :
                      <Image style={stylesCamera.ImageContainer} source={this.state.Photo5_Thumbnail} />
                    }
                  </View>
                </TouchableOpacity>
              </Col>
              <Col style={{ alignItems: 'flex-start', marginLeft: 5 }}>
                <TouchableOpacity onPress={this.selectPhoto6}
                  onLongPress={() => {
                    if (this.state.Photo6_Thumbnail != "") {
                      this.setState({ modalPhoto_Source: this.state.Photo6_Thumbnail, modalPhoto: true, modalPhotoIndex: 6 });
                    }
                  }}>
                  <View style={stylesCamera.ImageContainer}>
                    {this.state.Photo6_Thumbnail === null ? <Text>{this.state.SelecionarFoto}</Text> :
                      <Image style={stylesCamera.ImageContainer} source={this.state.Photo6_Thumbnail} />
                    }
                  </View>
                </TouchableOpacity>
              </Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={this.selectPhoto7}
                  onLongPress={() => {
                    if (this.state.Photo7_Thumbnail != "") {
                      this.setState({ modalPhoto_Source: this.state.Photo7_Thumbnail, modalPhoto: true, modalPhotoIndex: 7 });
                    }
                  }}>
                  <View style={stylesCamera.ImageContainer}>
                    {this.state.Photo7_Thumbnail === null ? <Text>{this.state.SelecionarFoto}</Text> :
                      <Image style={stylesCamera.ImageContainer} source={this.state.Photo7_Thumbnail} />
                    }
                  </View>
                </TouchableOpacity>
              </Col>
              <Col style={{ alignItems: 'flex-start', marginLeft: 5 }}>
                <TouchableOpacity onPress={this.selectPhoto8}
                  onLongPress={() => {
                    if (this.state.Photo8_Thumbnail != "") {
                      this.setState({ modalPhoto_Source: this.state.Photo8_Thumbnail, modalPhoto: true, modalPhotoIndex: 8 });
                    }
                  }}>
                  <View style={stylesCamera.ImageContainer}>
                    {this.state.Photo8_Thumbnail === null ? <Text>{this.state.SelecionarFoto}</Text> :
                      <Image style={stylesCamera.ImageContainer} source={this.state.Photo8_Thumbnail} />
                    }
                  </View>
                </TouchableOpacity>
              </Col>
            </Row>
            <Row style={styles.sectionTitleRow}>
              <Text style={{ color: "green", fontSize: 20, marginTop:20}}>{this.state.HabitoPlanta}</Text>
            </Row>
            <Row>
              <Content>
                <View style={{ flex: 1, justifyContent: 'space-around'}}>
                  <ModalSelector
                    data={this.state.OptionsHabit}
                    cancelText={this.state.Cancelar}
                    initValue={this.state.SelecioneHabito}
                    optionTextStyle={{color: "black"}}
                    onChange={option => { this.setState({ PlantHabitName: option.label, Habit: option.value }) }}>
                    <Item>
                      <Input
                        style={{ marginBottom:7}}
                        editable={false}
                        placeholder={this.state.SelecioneHabito}
                        value={this.state.PlantHabitName}
                      />
                    </Item>
                  </ModalSelector>
                </View>
              </Content>
            </Row>
            <Row style={styles.sectionTitleRow}>
              <Text style={{ color: "green", fontSize: 20, marginTop:20 }}>{this.state.Localizacao}</Text>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Text style={{ color: "gray" }}>{this.state.LocalizacaoAtivado}</Text>
            </Row>
            <Row style={{ height: 25, marginTop: 10, alignContent: "center" }}>
              <Button full light style={{ marginBottom: 20, width: "95%", backgroundColor: '#D3D3D3' }}
                onPress={() => {
                  this.setState({ modalMap: true });
                }}
              >
                <Text>{this.state.SelecionarManualmente}</Text>
              </Button>
            </Row>
            <Row style={{ marginTop: 30, alignContent: "center" }}>

              {this.state.foundPosition === false ? <Text style={{ height: "100%", width: "100%", color:'gray' }}>{this.state.AguardandoPrimeiraFoto}</Text> :
                <View style={stylesCamera.MapContainer}>
                  <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                    showsUserLocation={true}
                    region={this.state.region}
                  >
                    <MapView.Marker
                      coordinate={this.state.region}
                    />
                  </MapView>
                </View>
              }
            </Row>

            {this.state.foundPosition &&
              <Row style={styles.sectionTitleRow}>
                <Text style={{ color: "green", fontSize: 15, marginTop:10 }}>{this.state.Pais}: <Label style={{ color: "gray" }}>{this.state.address.Country}</Label></Text>
              </Row>
            }
            {this.state.foundPosition &&
              <Row style={styles.sectionTitleRow}>
                <Text style={{ color: "green", fontSize: 15 }}>{this.state.Estado}:  <Label style={{ color: "gray" }}>{this.state.address.Stateprovince}</Label> </Text>
              </Row>
            }
            {this.state.foundPosition &&
              <Row style={styles.sectionTitleRow}>
                <Text style={{ color: "green", fontSize: 15 }}>{this.state.Municipio}: <Label style={{ color: "gray" }}>{this.state.address.Municipality}</Label> </Text>
              </Row>
            }
          </Grid>

          {this.state.foundPosition &&
            <View style={{ marginLeft: 10, marginTop:20}}>
              <Label  style={{ color: "green"}}>{this.state.Localidade}</Label>
              <TextInput

                onChangeText={(text) => {
                  var actualAddress = {
                    Country: this.state.address.Country,
                    Stateprovince: this.state.address.Stateprovince,
                    Municipality: this.state.address.Municipality,
                    Locality: text,
                  };
                  this.setState({ address: actualAddress });
                }}
                value={this.state.address.Locality}
              />
            </View>
          }

          <View>
            <Label style={{ marginTop: 10, marginLeft: 10, fontSize: 16  }}>{this.state.Data}</Label>
            <DatePicker
              style={styles.InputData}
              customStyles={{
                dateInput:{borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomWidth: 0.4, alignItems: 'flex-start'},
                dateText: { fontSize: 16, color: "black" }
              }}
              date={this.state.Eventdate}
              mode="date"
              placeholder="Selecione uma data"
              format="DD/MM/YYYY"
              minDate="01/01/1900"
              maxDate="31/12/2100"
              confirmBtnText="Confirmar"
              cancelBtnText="Cancelar"
              showIcon={false}
              onDateChange={(date) => {
                this.setState({ Eventdate:  Moment( new Date(date.substr(6, 4), parseInt(date.substr(3, 2)) - 1, date.substr(0, 2))).format('DD/MM/YYYY')  });
                if(!this.state.PhotoEventdate){
                  var verbatimeventdate = this.state.Eventdate + " " + this.state.Eventtime ;
                  this.setState({ Verbatimeventdate: verbatimeventdate });
                }
              }}
            />
          </View>
          <View>
            <Label style={{ marginTop: 10, marginLeft: 10, fontSize: 16  }}>{this.state.Hora}</Label>
            <ModalSelector
              data={this.state.OptionsEventtime}
              cancelText="Cancelar"
              initValue={this.state.Eventtime}
              optionTextStyle={{color: "black"}}
              onChange={option => { 
                this.setState({ EventTimeName: option.label, Eventtime: option.value }) 
                if(!this.state.PhotoEventdate){
                  var verbatimeventdate = this.state.Eventdate + " " + option.value ;
                  this.setState({ Verbatimeventdate: verbatimeventdate });
                }
              }}>
              <Item floatingLabel>
                <Input
                  style={styles.InputData}
                  editable={false}
                  value={this.state.EventTimeName} />
              </Item>
            </ModalSelector>
          </View>

          <Text style={{ color: "green", fontSize: 20, marginLeft: 10 , marginTop:20 }}>{this.state.Identificacao}</Text>
          <Text style={{ color: "gray", marginLeft: 10  }}>{this.state.CompletarAnimal}</Text>
          <Text style={{ color: "green", fontSize: 20, marginLeft: 10, marginTop:20  }}>{this.state.Animal}</Text>
          <View>
            <Item floatingLabel>
              <Label>{this.state.NomePopular}</Label>
              <Input
                onChangeText={(text) => {
                  this.setState({ A_vernacularname: text });
                }}
                value={this.state.A_vernacularname} />
            </Item>
          </View>
          <View>
            <Item floatingLabel>
              <Label>{this.state.NomeEspecie}</Label>
              <Input
                onChangeText={(text) => {
                  this.setState({ A_scientificname: text });
                }}
                onFocus={ () => this.openModalSearch("dsSearchSpecieAnimalia")}
                value={this.state.A_scientificname} />
            </Item>
          </View>      
          <View>
            <Item floatingLabel>
              <Label>{this.state.Familia}</Label>
              <Input
                onChangeText={(text) => {
                  this.setState({ A_family: text });
                }}
                onFocus={ () => this.openModalSearch("dsSearchFamilyAnimalia")}
                value={this.state.A_family} />
            </Item>
          </View>
          <View>
            <Item floatingLabel>
              <Label>{this.state.Observacoes}</Label>
              <Input
                onChangeText={(text) => {
                  this.setState({ A_identificationremarks: text });
                }}
                value={this.state.A_identificationremarks} />
            </Item>
          </View>
          <Text style={{ color: "green", fontSize: 20, marginLeft: 10, marginTop:20  }}>{this.state.Planta}</Text>
          <View>
            <Item floatingLabel>
              <Label>{this.state.NomePopular}</Label>
              <Input
                onChangeText={(text) => {
                  this.setState({ P_vernacularname: text });
                }}
                value={this.state.P_vernacularname} />
            </Item>
          </View>
          <View>
            <Item floatingLabel>
              <Label>{this.state.NomeEspecie}</Label>
              <Input
                onChangeText={(text) => {
                  this.setState({ P_scientificname: text });
                }}
                onFocus={ () => this.openModalSearch("dsSearchSpeciePlantae")}
                value={this.state.P_scientificname} />
            </Item>
          </View>     
          <View>
            <Item floatingLabel>
              <Label>{this.state.Familia}</Label>
              <Input
                onChangeText={(text) => {
                  this.setState({ P_family: text });
                }}
                onFocus={ () => this.openModalSearch("dsSearchFamilyPlantae")}
                value={this.state.P_family} />
            </Item>
          </View>
          <View>
            <Item floatingLabel>
              <Label>{this.state.Observacoes}</Label>
              <Input
                onChangeText={(text) => {
                  this.setState({ P_identificationremarks: text });
                }}
                value={this.state.P_identificationremarks} />
            </Item>
          </View>

          <View>
            <Text style={{ color: "green", fontSize: 20, marginLeft: 10, marginTop:20  }}>{this.state.InteracaoAnimalPlanta}</Text>
            <ModalSelector
              data={this.state.OptionsInteraction}
              cancelText={this.state.Cancelar}
              initValue={this.state.SelecioneTipoInteracao}
              optionTextStyle={{color: "black"}}
              onChange={option => { this.setState({ InteractionName: option.label, Interaction: option.value }) }}>
              <Item>
                <Input
                  style={{ marginBottom:7}}
                  editable={false}
                  value={this.state.InteractionName}
                />
              </Item>
            </ModalSelector>
          </View>
          <Text style={{ color: "green", fontSize: 20, marginLeft: 10, marginTop:20  }}>{this.state.ObservacoesGerais}</Text>
          <View>
            <Item>
              <Input
                multiline={true}
                onChangeText={(text) => {
                  this.setState({ Eventremarks: text });
                  if(!Functions.isNullOrEmpty(text)){
                    var newstyle = this.state.styleEventremarks;
                    newstyle["color"] = "black";
                    this.setState({ styleEventremarks: newstyle });
                  }
                }}
                placeholder={this.state.DescrevaInformacoes}
                onContentSizeChange={(e) => this.updateStyleEventremarks(e.nativeEvent.contentSize.height)}
                value={this.state.Eventremarks} 
              />
            </Item>
          </View>
          </Form>
          {
            this.state.allowSave &&
            <Button guardioes
              style={styles.ButtonSaveContribution}
              onPress={() => this.SaveContribution()}
            >
              <Text style={styles.TextSaveContribution}>
                {this.state.Salvar}
              </Text>
            </Button>
          }
          <Spinner visible={this.state.visible} textContent={this.state.MessageLoading} textStyle={{color: '#FFF'}} />
        </Content>
        </Container>
    );
  }
}

const stylesCamera = StyleSheet.create({

  container: {
    alignItems: "flex-start",
    backgroundColor: "#FFF8E1",
    alignContent: "flex-start"
  },

  ImageContainer: {
    borderRadius: 10,
    width: 120,
    height: 120
  },

  ImageContainerAnimal: {
    borderRadius: 10,
    width: 120,
    height: 104
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
    marginTop: 20
  }

});

const stylesSearch = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  map: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  progressiveInput: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  listViewContainer: {
    flex: 0,
  },
  listView: {
    backgroundColor: 'white',
    margin: 10,
  },
  listItem: {
    padding: 10,
  },
  listItemSeparator: {
    borderWidth: 0.5,
    borderColor: 'lightgrey',
  },
});
export default NewContributionView;
