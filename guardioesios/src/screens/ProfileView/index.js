import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Tabs,
  Tab,
  Right,
  Left,
  Body,
  TabHeading,
  Text
} from "native-base";
import TabProfile from "./tabProfile";
import TabAlterPassword from "./tabAlterPassword";
import TabSpecialist from "./tabProfileSpecialist";
import {BackHandler} from "react-native";
import StorageManager from "../../storage/StorageManager";
import { EventRegister } from 'react-native-event-listeners';
import translate from "../../helpers/translate";

class ProfileView extends Component {

  state = {
    title: translate.val("MeuPerfil"),
    Guardiao: translate.val("Guardiao"),
    Especialista: translate.val("Especialista"),
    AlterarSenha: translate.val("AlterarSenha")
  }
  constructor(props) {
    super(props);
    this.state = {
      IsAuthenticated: false
    }

    var conn = StorageManager.getConnection();
    conn.transaction(tx => {
      tx.executeSql(
        "SELECT IsAuthenticated FROM GuardianModel",
        [],
        (_, results) => {                            
            if(results.rows.length > 0){              
                let row = results.rows.item(0);              
                this.setState({                  
                  IsAuthenticated: row.IsAuthenticated
                });                
            }        
        }                
      );
    }).catch((error) => {
      console.log("database not ready yet");
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
        title: translate.val("MeuPerfil"),
        Guardiao: translate.val("Guardiao"),
        Especialista: translate.val("Especialista"),
        AlterarSenha: translate.val("AlterarSenha")
      });
    });

    this.listener = EventRegister.addEventListener('Authenticated', (data) => {            
      this.setState({        
        IsAuthenticated: data
      });             
    });
  }
  
  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
    // EventRegister.removeEventListener(this.listenerLanguage);
  }  

  render() {
    return (
      <Container>
        <Header hasTabs>
          <Left>
          <Button transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>{this.state.title}</Title>
          </Body>
          <Right />
        </Header>

        { this.state.IsAuthenticated? 

          <Tabs>
            <Tab heading={<TabHeading><Text>{this.state.Guardiao}</Text></TabHeading>}>
              <TabProfile />
            </Tab>
            <Tab heading={<TabHeading><Text>{this.state.Especialista}</Text></TabHeading>}>
              <TabSpecialist />
            </Tab>
            <Tab heading={<TabHeading><Text>{this.state.AlterarSenha}</Text></TabHeading>}>
              <TabAlterPassword />
            </Tab>
        </Tabs>
        :
        <Tabs>
          <Tab heading={<TabHeading><Text>{this.state.title}</Text></TabHeading>}>
            <TabProfile />
          </Tab>          
        </Tabs>
        }
      
      </Container>
    );
  }
}

export default ProfileView;
