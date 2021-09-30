import React, { Component } from "react";
import { Image, Dimensions,BackHandler,Linking, View } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Text,
  Label,
  Thumbnail,
  Left,
  Right,
  List, 
  ListItem, 
  Separator,
  Body
} from "native-base";

import styles from "./styles";
import { EventRegister } from 'react-native-event-listeners';
import translate from "../../helpers/translate";
import StorageManager from "../../storage/StorageManager";
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

const deviceWidth = Dimensions.get("window").width;
const logo = require("../../../assets/logo.png");
const cardImage = require("../../../assets/drawer-cover.png");

class HelpView extends Component {
  state = {
    IdiomaKey: '',
    Titulo: translate.val('Ajuda'),
    TextoAjuda1 : translate.val('TextoAjuda1'),
    TextoAjuda2 : translate.val('TextoAjuda2'),
    TextoAjuda3 : translate.val('TextoAjuda3'),
    TextoAjuda4 : translate.val('TextoAjuda4'),
    TextoAjuda5 : translate.val('TextoAjuda5'),
    TextoLinkSiteGuardioes : translate.val('TextoLinkSiteGuardioes'),
    TituloComoRegistrarObservacao : translate.val('TituloComoRegistrarObservacao'),
    TextoComoRegistrarObservacao : translate.val('TextoComoRegistrarObservacao'),
    TextoComoRegistrarObservacao2 : translate.val('TextoComoRegistrarObservacao2'),
    TituloAjudaFotosInteracao : translate.val('TituloAjudaFotosInteracao'),
    TextoAjudaFotosInteracao : translate.val('TextoAjudaFotosInteracao'),
    TituloAjudaQueAnimalEhEsse : translate.val('TituloAjudaQueAnimalEhEsse'),
    TextoAjudaQueAnimalEhEsse : translate.val('TextoAjudaQueAnimalEhEsse'),
    TituloAjudaFotosPlanta : translate.val('TituloAjudaFotosPlanta'),
    TextoAjudaFotosPlanta : translate.val('TextoAjudaFotosPlanta'),
    TituloAjudaLocalizacao : translate.val('TituloAjudaLocalizacao'),
    TextoAjudaLocalizacao : translate.val('TextoAjudaLocalizacao'),
    TituloAjudaIdentificacao : translate.val('TituloAjudaIdentificacao'),
    TextoAjudaIdentificacao : translate.val('TextoAjudaIdentificacao'),
    TituloHabitoPlanta : translate.val('TituloHabitoPlanta'),
    TextoHabitoPlanta : translate.val('TextoHabitoPlanta'),
    TituloAjudaTipoInteracao : translate.val('TituloAjudaTipoInteracao'),
    TextoAjudaTipoInteracao : translate.val('TextoAjudaTipoInteracao'),
    TituloAjudaCamposPreenchimentoNaoObrigatorio1 : translate.val('TituloAjudaCamposPreenchimentoNaoObrigatorio1'),
    TituloAjudaCamposPreenchimentoNaoObrigatorio2 : translate.val('TituloAjudaCamposPreenchimentoNaoObrigatorio2'),
    TituloAjudaCamposPreenchimentoNaoObrigatorio3 : translate.val('TituloAjudaCamposPreenchimentoNaoObrigatorio3'),
    TextoAjudaCamposPreenchimentoNaoObrigatorio : translate.val('TextoAjudaCamposPreenchimentoNaoObrigatorio'),
    TituloAjudaComoEnviarObservacaoOnline : translate.val('TituloAjudaComoEnviarObservacaoOnline'),
    TextoAjudaComoEnviarObservacaoOnline1 : translate.val('TextoAjudaComoEnviarObservacaoOnline1'),
    TextoAjudaComoEnviarObservacaoOnline2 : translate.val('TextoAjudaComoEnviarObservacaoOnline2'),
    TextoAjudaComoEnviarObservacaoOnline3 : translate.val('TextoAjudaComoEnviarObservacaoOnline3'),
    TextoAjudaComoEnviarObservacaoOnline4 : translate.val('TextoAjudaComoEnviarObservacaoOnline4'),
    TextoAjudaComoEnviarObservacaoOnline5 : translate.val('TextoAjudaComoEnviarObservacaoOnline5'),
    TextoAjudaComoEnviarObservacaoOnline6 : translate.val('TextoAjudaComoEnviarObservacaoOnline6'),
    TextoAjudaComoEnviarObservacaoOnline7 : translate.val('TextoAjudaComoEnviarObservacaoOnline7'),
    TextoAjudaComoEnviarObservacaoOnline8 : translate.val('TextoAjudaComoEnviarObservacaoOnline8'),
    TextoAjudaComoEnviarObservacaoOnline9 : translate.val('TextoAjudaComoEnviarObservacaoOnline9'),
    TextoAjudaComoEnviarObservacaoOnline10 : translate.val('TextoAjudaComoEnviarObservacaoOnline10'),
    TextoAjudaComoEnviarObservacaoOnline11 : translate.val('TextoAjudaComoEnviarObservacaoOnline11'),
    TextoAjudaComoEnviarObservacaoOnline12 : translate.val('TextoAjudaComoEnviarObservacaoOnline12'),
    TextoAjudaComoEnviarObservacaoOnline13 : translate.val('TextoAjudaComoEnviarObservacaoOnline13'),
    TextoAjudaComoEnviarObservacaoOnline14 : translate.val('TextoAjudaComoEnviarObservacaoOnline14'),
    TextoAjudaComoEnviarObservacaoOnline15 : translate.val('TextoAjudaComoEnviarObservacaoOnline15'),
    TituloAjudaComoExcluirObservacao : translate.val('TituloAjudaComoExcluirObservacao'),
    TextoAjudaVocePodeExcluirObservacao : translate.val('TextoAjudaVocePodeExcluirObservacao'),
    TextoAjudaExcluirObservacaoMomentoUm : translate.val('TextoAjudaExcluirObservacaoMomentoUm'),
    TextoAjudaExcluirObservacaoMomentoDois : translate.val('TextoAjudaExcluirObservacaoMomentoDois'),
    TextoAjudaParaExcluirUmaObservacao : translate.val('TextoAjudaParaExcluirUmaObservacao'),
    TextoAjudaParaExcluirUmaObservacao2 : translate.val('TextoAjudaParaExcluirUmaObservacao2'),
    TextoAjudaParaExcluirUmaObservacao3 : translate.val('TextoAjudaParaExcluirUmaObservacao3'),
    TituloAjudaOutrasInformacoes : translate.val('TituloAjudaOutrasInformacoes'),
    TextoAjudaOutrasInformacoes : translate.val('TextoAjudaOutrasInformacoes'),
    TextoAjudaOutrasInformacoes2 : translate.val('TextoAjudaOutrasInformacoes2'),
    TextoComoRegistrarObservacao3 : translate.val("TextoComoRegistrarObservacao3")
  }

  componentWillMount() {
    var conn = StorageManager.getConnection();       
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
                  IdiomaKey: row.Idioma,
                  IdUsuario: row.IdUsuario
                });
                translate.setLanguage(this.state.IdiomaKey);
              }
              else
              {
                this.setState({ 
                  IdiomaKey: "pt",
                });
                translate.setLanguage(this.state.IdiomaKey);
              }
            }
        );
      });
    });

    BackHandler.addEventListener('hardwareBackPress', () => {
        this.props.navigation.navigate("DrawerOpen");
        return true;
    });
    this.listenerLanguage = EventRegister.addEventListener('Language', (data) => {
      this.setState({
        Titulo: translate.val('Ajuda'),
        TexoAjuda1 : translate.val('TextoAjuda1'),
        TextoAjuda2 : translate.val('TextoAjuda2'),
        TextoAjuda3 : translate.val('TextoAjuda3'),
        TextoAjuda4 : translate.val('TextoAjuda4'),
        TextoAjuda5 : translate.val('TextoAjuda5'),
        TextoLinkSiteGuardioes : translate.val('TextoLinkSiteGuardioes'),
        TituloComoRegistrarObservacao : translate.val('TituloComoRegistrarObservacao'),
        TextoComoRegistrarObservacao : translate.val('TextoComoRegistrarObservacao'),
        TextoComoRegistrarObservacao2 : translate.val('TextoComoRegistrarObservacao2'),
        TituloAjudaFotosInteracao : translate.val('TituloAjudaFotosInteracao'),
        TextoAjudaFotosInteracao : translate.val('TextoAjudaFotosInteracao'),
        TituloAjudaQueAnimalEhEsse : translate.val('TituloAjudaQueAnimalEhEsse'),
        TextoAjudaQueAnimalEhEsse : translate.val('TextoAjudaQueAnimalEhEsse'),
        TituloAjudaFotosPlanta : translate.val('TituloAjudaFotosPlanta'),
        TextoAjudaFotosPlanta : translate.val('TextoAjudaFotosPlanta'),
        TituloAjudaLocalizacao : translate.val('TituloAjudaLocalizacao'),
        TextoAjudaLocalizacao : translate.val('TextoAjudaLocalizacao'),
        TituloAjudaIdentificacao : translate.val('TituloAjudaIdentificacao'),
        TextoAjudaIdentificacao : translate.val('TextoAjudaIdentificacao'),
        TituloHabitoPlanta : translate.val('TituloHabitoPlanta'),
        TextoHabitoPlanta : translate.val('TextoHabitoPlanta'),
        TituloAjudaTipoInteracao : translate.val('TituloAjudaTipoInteracao'),
        TextoAjudaTipoInteracao : translate.val('TextoAjudaTipoInteracao'),
        TituloAjudaCamposPreenchimentoNaoObrigatorio1 : translate.val('TituloAjudaCamposPreenchimentoNaoObrigatorio1'),
        TituloAjudaCamposPreenchimentoNaoObrigatorio2 : translate.val('TituloAjudaCamposPreenchimentoNaoObrigatorio2'),
        TituloAjudaCamposPreenchimentoNaoObrigatorio3 : translate.val('TituloAjudaCamposPreenchimentoNaoObrigatorio3'),
        TextoAjudaCamposPreenchimentoNaoObrigatorio : translate.val('TextoAjudaCamposPreenchimentoNaoObrigatorio'),
        TituloAjudaComoEnviarObservacaoOnline : translate.val('TituloAjudaComoEnviarObservacaoOnline'),
        TextoAjudaComoEnviarObservacaoOnline1 : translate.val('TextoAjudaComoEnviarObservacaoOnline1'),
        TextoAjudaComoEnviarObservacaoOnline2 : translate.val('TextoAjudaComoEnviarObservacaoOnline2'),
        TextoAjudaComoEnviarObservacaoOnline3 : translate.val('TextoAjudaComoEnviarObservacaoOnline3'),
        TextoAjudaComoEnviarObservacaoOnline4 : translate.val('TextoAjudaComoEnviarObservacaoOnline4'),
        TextoAjudaComoEnviarObservacaoOnline5 : translate.val('TextoAjudaComoEnviarObservacaoOnline5'),
        TextoAjudaComoEnviarObservacaoOnline6 : translate.val('TextoAjudaComoEnviarObservacaoOnline6'),
        TextoAjudaComoEnviarObservacaoOnline7 : translate.val('TextoAjudaComoEnviarObservacaoOnline7'),
        TextoAjudaComoEnviarObservacaoOnline8 : translate.val('TextoAjudaComoEnviarObservacaoOnline8'),
        TextoAjudaComoEnviarObservacaoOnline9 : translate.val('TextoAjudaComoEnviarObservacaoOnline9'),
        TextoAjudaComoEnviarObservacaoOnline10 : translate.val('TextoAjudaComoEnviarObservacaoOnline10'),
        TextoAjudaComoEnviarObservacaoOnline11 : translate.val('TextoAjudaComoEnviarObservacaoOnline11'),
        TextoAjudaComoEnviarObservacaoOnline12 : translate.val('TextoAjudaComoEnviarObservacaoOnline12'),
        TextoAjudaComoEnviarObservacaoOnline13 : translate.val('TextoAjudaComoEnviarObservacaoOnline13'),
        TextoAjudaComoEnviarObservacaoOnline14 : translate.val('TextoAjudaComoEnviarObservacaoOnline14'),
        TituloAjudaComoExcluirObservacao : translate.val('TituloAjudaComoExcluirObservacao'),
        TextoAjudaVocePodeExcluirObservacao : translate.val('TextoAjudaVocePodeExcluirObservacao'),
        TextoAjudaExcluirObservacaoMomentoUm : translate.val('TextoAjudaExcluirObservacaoMomentoUm'),
        TextoAjudaExcluirObservacaoMomentoDois : translate.val('TextoAjudaExcluirObservacaoMomentoDois'),
        TextoAjudaParaExcluirUmaObservacao : translate.val('TextoAjudaParaExcluirUmaObservacao'),
        TextoAjudaParaExcluirUmaObservacao2 : translate.val('TextoAjudaParaExcluirUmaObservacao2'),
        TextoAjudaParaExcluirUmaObservacao3 : translate.val('TextoAjudaParaExcluirUmaObservacao3'),
        TextoComoRegistrarObservacao3 : translate.val("TextoComoRegistrarObservacao3")
      });
    });
  }
  componentDidMount() {
    this.listenerLanguage = EventRegister.addEventListener('Language', (data) => {
      this.setState({
        Titulo: translate.val('Ajuda'),
        TexoAjuda1 : translate.val('TextoAjuda1'),
        TextoAjuda2 : translate.val('TextoAjuda2'),
        TextoAjuda3 : translate.val('TextoAjuda3'),
        TextoAjuda4 : translate.val('TextoAjuda4'),
        TextoAjuda5 : translate.val('TextoAjuda5'),
        TextoLinkSiteGuardioes : translate.val('TextoLinkSiteGuardioes'),
        TituloComoRegistrarObservacao : translate.val('TituloComoRegistrarObservacao'),
        TextoComoRegistrarObservacao : translate.val('TextoComoRegistrarObservacao'),
        TextoComoRegistrarObservacao2 : translate.val('TextoComoRegistrarObservacao2'),
        TituloAjudaFotosInteracao : translate.val('TituloAjudaFotosInteracao'),
        TextoAjudaFotosInteracao : translate.val('TextoAjudaFotosInteracao'),
        TituloAjudaQueAnimalEhEsse : translate.val('TituloAjudaQueAnimalEhEsse'),
        TextoAjudaQueAnimalEhEsse : translate.val('TextoAjudaQueAnimalEhEsse'),
        TituloAjudaFotosPlanta : translate.val('TituloAjudaFotosPlanta'),
        TextoAjudaFotosPlanta : translate.val('TextoAjudaFotosPlanta'),
        TituloAjudaLocalizacao : translate.val('TituloAjudaLocalizacao'),
        TextoAjudaLocalizacao : translate.val('TextoAjudaLocalizacao'),
        TituloAjudaIdentificacao : translate.val('TituloAjudaIdentificacao'),
        TextoAjudaIdentificacao : translate.val('TextoAjudaIdentificacao'),
        TituloHabitoPlanta : translate.val('TituloHabitoPlanta'),
        TextoHabitoPlanta : translate.val('TextoHabitoPlanta'),
        TituloAjudaTipoInteracao : translate.val('TituloAjudaTipoInteracao'),
        TextoAjudaTipoInteracao : translate.val('TextoAjudaTipoInteracao'),
        TituloAjudaCamposPreenchimentoNaoObrigatorio1 : translate.val('TituloAjudaCamposPreenchimentoNaoObrigatorio1'),
        TituloAjudaCamposPreenchimentoNaoObrigatorio2 : translate.val('TituloAjudaCamposPreenchimentoNaoObrigatorio2'),
        TituloAjudaCamposPreenchimentoNaoObrigatorio3 : translate.val('TituloAjudaCamposPreenchimentoNaoObrigatorio3'),
        TextoAjudaCamposPreenchimentoNaoObrigatorio : translate.val('TextoAjudaCamposPreenchimentoNaoObrigatorio'),
        TituloAjudaComoEnviarObservacaoOnline : translate.val('TituloAjudaComoEnviarObservacaoOnline'),
        TextoAjudaComoEnviarObservacaoOnline1 : translate.val('TextoAjudaComoEnviarObservacaoOnline1'),
        TextoAjudaComoEnviarObservacaoOnline2 : translate.val('TextoAjudaComoEnviarObservacaoOnline2'),
        TextoAjudaComoEnviarObservacaoOnline3 : translate.val('TextoAjudaComoEnviarObservacaoOnline3'),
        TextoAjudaComoEnviarObservacaoOnline4 : translate.val('TextoAjudaComoEnviarObservacaoOnline4'),
        TextoAjudaComoEnviarObservacaoOnline5 : translate.val('TextoAjudaComoEnviarObservacaoOnline5'),
        TextoAjudaComoEnviarObservacaoOnline6 : translate.val('TextoAjudaComoEnviarObservacaoOnline6'),
        TextoAjudaComoEnviarObservacaoOnline7 : translate.val('TextoAjudaComoEnviarObservacaoOnline7'),
        TextoAjudaComoEnviarObservacaoOnline8 : translate.val('TextoAjudaComoEnviarObservacaoOnline8'),
        TextoAjudaComoEnviarObservacaoOnline9 : translate.val('TextoAjudaComoEnviarObservacaoOnline9'),
        TextoAjudaComoEnviarObservacaoOnline10 : translate.val('TextoAjudaComoEnviarObservacaoOnline10'),
        TextoAjudaComoEnviarObservacaoOnline11 : translate.val('TextoAjudaComoEnviarObservacaoOnline11'),
        TextoAjudaComoEnviarObservacaoOnline12 : translate.val('TextoAjudaComoEnviarObservacaoOnline12'),
        TextoAjudaComoEnviarObservacaoOnline13 : translate.val('TextoAjudaComoEnviarObservacaoOnline13'),
        TextoAjudaComoEnviarObservacaoOnline14 : translate.val('TextoAjudaComoEnviarObservacaoOnline14'),
        TextoAjudaComoEnviarObservacaoOnline15 : translate.val('TextoAjudaComoEnviarObservacaoOnline15'),
        TituloAjudaComoExcluirObservacao : translate.val('TituloAjudaComoExcluirObservacao'),
        TextoAjudaVocePodeExcluirObservacao : translate.val('TextoAjudaVocePodeExcluirObservacao'),
        TextoAjudaExcluirObservacaoMomentoUm : translate.val('TextoAjudaExcluirObservacaoMomentoUm'),
        TextoAjudaExcluirObservacaoMomentoDois : translate.val('TextoAjudaExcluirObservacaoMomentoDois'),
        TextoAjudaParaExcluirUmaObservacao : translate.val('TextoAjudaParaExcluirUmaObservacao'),
        TextoAjudaParaExcluirUmaObservacao2 : translate.val('TextoAjudaParaExcluirUmaObservacao2'),
        TextoAjudaParaExcluirUmaObservacao3 : translate.val('TextoAjudaParaExcluirUmaObservacao3'),
        TextoComoRegistrarObservacao3 : translate.val("TextoComoRegistrarObservacao3")
      });
    });
  }
  render() {
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
            <Title>{this.state.Titulo}</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <View>
            <Text style={styles.TextHelp}>
              {this.state.TextoAjuda1} &nbsp;
              <Text
                    onPress={() => Linking.openURL('https://guardioes.cria.org.br/')}>
                {this.state.TextoLinkSiteGuardioes}
              </Text>
            </Text>
          </View>
          <View style={{marginTop:10}}>
            <Text style={styles.TextHelp}>{this.state.TextoAjuda2}</Text>
          </View>
          <View style={{marginTop:10}}>
            <Text style={styles.TextHelp}>{this.state.TextoAjuda3}</Text>
          </View>
          <View style={{marginTop:10}}>
            <Text style={styles.TextHelp}>{this.state.TextoAjuda4}</Text>
          </View>
          <View style={{marginTop:10}}>
            <Text style={styles.TextHelp}>{this.state.TextoAjuda5}</Text>
          </View>
          <View style={{marginTop:10}}>
            <Card>
              <Collapse>
                <CollapseHeader style={styles.container}>
                  <Separator style={styles.container}>
                    <CardItem >
                      <Left>
                        <Body>
                          <Text style={styles.TitleHelp}>{this.state.TituloComoRegistrarObservacao}</Text>
                        </Body>
                      </Left>
                    </CardItem>
                  </Separator>     
                </CollapseHeader>
                <CollapseBody>
                  <CardItem>
                    <Body>
                      <View>
                        <Text style={styles.TextHelp}>
                          {this.state.TextoComoRegistrarObservacao}
                          <IconFontAwesome
                            name="align-justify"
                            size={10}
                          />
                          {this.state.TextoComoRegistrarObservacao2}
                        </Text>
                        <Text style={styles.LabelNegrito}>
                          {this.state.TextoComoRegistrarObservacao3}
                        </Text>
                      </View>
                      <Text></Text>
                      <Text style={styles.SubTitleHelp}>
                        {this.state.TituloAjudaFotosInteracao}
                      </Text>
                      <Text style={styles.TextHelp}>
                        {this.state.TextoAjudaFotosInteracao}
                      </Text>
                      <Text></Text>
                      <Text style={styles.SubTitleHelp}>
                        {this.state.TituloAjudaQueAnimalEhEsse}
                      </Text>
                      <Text style={styles.TextHelp}>
                        {this.state.TextoAjudaQueAnimalEhEsse}
                      </Text>
                      <Text></Text>
                      <Text style={styles.SubTitleHelp}>
                        {this.state.TituloAjudaFotosPlanta}
                      </Text>
                      <Text style={styles.TextHelp}>
                        {this.state.TextoAjudaFotosPlanta}
                      </Text>
                      <Text></Text>
                      <Text style={styles.SubTitleHelp}>
                        {this.state.TituloAjudaLocalizacao}
                      </Text>
                      <Text style={styles.TextHelp}>
                        {this.state.TextoAjudaLocalizacao}
                      </Text>
                      <Text></Text>
                      <Text>
                        <Label style={styles.TextHelpNegrito}>{this.state.TituloAjudaCamposPreenchimentoNaoObrigatorio1}</Label>
                        <Label style={styles.TextHelpNegritoVermelho}>{this.state.TituloAjudaCamposPreenchimentoNaoObrigatorio2}</Label>
                        <Label style={styles.TextHelpNegrito}>{this.state.TituloAjudaCamposPreenchimentoNaoObrigatorio3}</Label>
                      </Text>
                      <Text style={styles.TextHelp}>
                        {this.state.TextoAjudaCamposPreenchimentoNaoObrigatorio}
                      </Text>
                      <Text></Text>
                      <Text style={styles.SubTitleHelp}>
                        {this.state.TituloAjudaIdentificacao}
                      </Text>
                      <Text style={styles.TextHelp}>
                        {this.state.TextoAjudaIdentificacao}
                      </Text>
                      <Text></Text>
                      <Text style={styles.SubTitleHelp}>
                        {this.state.TituloHabitoPlanta}
                      </Text>
                      <Text style={styles.TextHelp}>
                        {this.state.TextoHabitoPlanta}
                      </Text>
                      <Text></Text>
                      <Text style={styles.SubTitleHelp}>
                        {this.state.TituloAjudaTipoInteracao}
                      </Text>
                      <Text style={styles.TextHelp}>
                        {this.state.TextoAjudaTipoInteracao}
                      </Text>
                    </Body>
                  </CardItem>
                </CollapseBody>    
              </Collapse>
            </Card>
          </View>

          <View>
            <Card>
              <Collapse>
                <CollapseHeader style={styles.container}>
                  <Separator style={styles.container}>
                    <CardItem >
                      <Left>
                        <Body>
                          <Text style={styles.TitleHelp}>{this.state.TituloAjudaComoEnviarObservacaoOnline}</Text>
                        </Body>
                      </Left>
                    </CardItem>
                  </Separator>     
                </CollapseHeader>
                <CollapseBody>
                  <CardItem>
                    <Body>
                      <View>
                        <Text style={styles.TextHelp}>
                          {this.state.TextoAjudaComoEnviarObservacaoOnline1}
                          <IconFontAwesome
                            name="align-justify"
                            size={10}
                          />
                          {this.state.TextoAjudaComoEnviarObservacaoOnline2}
                        </Text> 
                      </View>
                      <View style={{marginTop:5}}>
                        <Text style={styles.TextHelp}>{this.state.TextoAjudaComoEnviarObservacaoOnline15}</Text>
                      </View>
                      <View  style={{marginTop:5}}>
                        <Text style={styles.TextHelp}>
                          {this.state.TextoAjudaComoEnviarObservacaoOnline3}
                          <IconFontAwesome
                            name="square-o"
                            size={12}
                          />
                          {this.state.TextoAjudaComoEnviarObservacaoOnline4}
                        </Text>
                      </View>
                      <View  style={{marginTop:5}}>
                        <Text style={styles.TextHelp}>
                          {this.state.TextoAjudaComoEnviarObservacaoOnline3}
                          <IconFontAwesome
                            name="paper-plane"
                            size={10}
                          />
                          {this.state.TextoAjudaComoEnviarObservacaoOnline5}
                          <Text style={styles.TextHelpNegrito}>
                            {this.state.TextoAjudaComoEnviarObservacaoOnline6}
                          </Text>
                          {this.state .TextoAjudaComoEnviarObservacaoOnline7}
                          <Text style={styles.TextHelpNegrito}>
                            {this.state.TextoAjudaComoEnviarObservacaoOnline8}
                          </Text>
                          {this.state.TextoAjudaComoEnviarObservacaoOnline9}
                          <Text style={styles.TextHelpNegrito}>
                            {this.state.TextoAjudaComoEnviarObservacaoOnline10}
                          </Text>
                          {this.state.TextoAjudaComoEnviarObservacaoOnline11}
                          {this.state.TextoAjudaComoEnviarObservacaoOnline12}
                        </Text>
                      </View>
                      <View  style={{marginTop:5}}>
                        <Text style={styles.TextHelp}>
                          {this.state.TextoAjudaComoEnviarObservacaoOnline13}
                          <IconFontAwesome
                            name="paper-plane"
                            size={10}
                          />
                          {this.state.TextoAjudaComoEnviarObservacaoOnline14}
                        </Text>
                      </View>
                    </Body>
                  </CardItem>
                </CollapseBody>    
              </Collapse>
            </Card>
          </View>

          <View>
            <Card>
              <Collapse>
                <CollapseHeader style={styles.container}>
                  <Separator style={styles.container}>
                    <CardItem >
                      <Left>
                        <Body>
                          <Text style={styles.TitleHelp}>{this.state.TituloAjudaComoExcluirObservacao}</Text>
                        </Body>
                      </Left>
                    </CardItem>
                  </Separator>     
                </CollapseHeader>
                <CollapseBody>
                  <CardItem>
                    <Body>
                      <Text style={styles.TextHelp}>
                        {this.state.TextoAjudaVocePodeExcluirObservacao}
                      </Text>
                      <View style={{marginTop:5}}>
                        <Text style={styles.TextHelp}>
                          {this.state.TextoAjudaExcluirObservacaoMomentoUm}
                        </Text>
                      </View>
                      <View style={{marginTop:5}}>
                        <Text style={styles.TextHelp}>
                          {this.state.TextoAjudaExcluirObservacaoMomentoDois}
                        </Text>
                      </View>
                      <View style={{marginTop:5}}>
                        <Text style={styles.TextHelp}>
                          {this.state.TextoAjudaParaExcluirUmaObservacao}
                          <IconFontAwesome
                            name="square-o"
                            size={12}
                          />
                          {this.state.TextoAjudaParaExcluirUmaObservacao2}
                          <IconFontAwesome
                            name="trash"
                            size={12}
                          />
                          {this.state.TextoAjudaParaExcluirUmaObservacao3}
                        </Text>
                      </View>
                    </Body>
                  </CardItem>
                </CollapseBody>    
              </Collapse>
            </Card>
          </View>

          <View>
            <Card>
              <Collapse>
                <CollapseHeader style={styles.container}>
                  <Separator style={styles.container}>
                    <CardItem >
                      <Left>
                        <Body>
                          <Text style={styles.TitleHelp}>{this.state.TituloAjudaOutrasInformacoes}</Text>
                        </Body>
                      </Left>
                    </CardItem>
                  </Separator>     
                </CollapseHeader>
                <CollapseBody>
                  <CardItem>
                    <Body>
                      <Text style={styles.TextHelp}>
                        {this.state.TextoAjudaOutrasInformacoes} &nbsp;
                        <Text
                              onPress={() => Linking.openURL('https://guardioes.cria.org.br/')}>
                          {this.state.TextoLinkSiteGuardioes}
                        </Text>
                        {this.state.TextoAjudaOutrasInformacoes2}
                      </Text>
                    </Body>
                  </CardItem>
                </CollapseBody>    
              </Collapse>
            </Card>
          </View>
        </Content>
      </Container>
    );
  }
}

export default HelpView;
