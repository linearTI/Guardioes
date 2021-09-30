'use strict';
import React from 'react';
import {
    NetInfo
} from 'react-native';

import SQLite from 'react-native-sqlite-storage';

import { EventRegister } from 'react-native-event-listeners';
import Functions from '../helpers/functions';
import dbUpgrade from '../helpers/dbUpgrade.json';
import Constants from "../helpers/constants";

var database_name = "guardioes.db";
var database_version = "1.0";
var database_displayname = "db";
var database_size = 200000;


function openDBHandler(){
    // alert("Conexão aberta com sucesso");
}

function errorDBHandler(error){
    alert("Não foi possível conectar ao ao banco: "+ error);
}

let conn = SQLite.openDatabase(database_name, database_version, database_displayname, database_size, openDBHandler, errorDBHandler);

class StorageManager  {
    getConnection() {
        return conn;
    }  

    restartDB() {        
            return conn.transaction(this.generateDB);
    }

    generateDB = (tx) => {
        console.log("Executing DROP stmts")

        tx.executeSql('DROP TABLE IF EXISTS Version;');
        tx.executeSql('DROP TABLE IF EXISTS Language;');
        tx.executeSql('DROP TABLE IF EXISTS ContributionModel;');
        tx.executeSql('DROP TABLE IF EXISTS SettingsModel;');
        tx.executeSql('DROP TABLE IF EXISTS GuardianModel;');
        tx.executeSql('DROP TABLE IF EXISTS AnimalGroup_Language;');        
        tx.executeSql('DROP TABLE IF EXISTS AnimalGroup;');        
        tx.executeSql('DROP TABLE IF EXISTS PlantHabit;');
        tx.executeSql('DROP TABLE IF EXISTS PlantHabit_Language;');
        tx.executeSql('DROP TABLE IF EXISTS EventTime;');
        tx.executeSql('DROP TABLE IF EXISTS AnimalPlantInteraction;');
        tx.executeSql('DROP TABLE IF EXISTS AnimalPlantInteraction_Language;');
        tx.executeSql('DROP TABLE IF EXISTS Expertise;');
        tx.executeSql('DROP TABLE IF EXISTS Expertise_Language;');
        tx.executeSql('DROP TABLE IF EXISTS Plants;');
        tx.executeSql('DROP TABLE IF EXISTS VersionDatabase;');
        
        console.log("Executing CREATE stmts");
        

        tx.executeSql('CREATE TABLE IF NOT EXISTS Version( '
            + 'Number INTEGER NOT NULL); '
        ).catch((error) => {  
            this.errorCB(error) 
        });

        tx.executeSql('CREATE TABLE IF NOT EXISTS Language( '
            + 'id NTEXT, '
            + 'Name NTEXT NOT NULL); '
        ).catch((error) => {  
            this.errorCB(error) 
        });
        
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS [ContributionModel] ( '
            + 'Sended BOOLEAN, '
            + 'Provisional BOOLEAN, '
            + 'ID INTEGER PRIMARY KEY AUTOINCREMENT, '
            + "IdUsuario INTEGER, "
            + 'Creation DATETIME, '
            + 'Photo_A BLOB, '
            + 'Photo_B BLOB, '
            + 'Photo_C BLOB, '
            + 'Photo_D BLOB, '
            + 'Photo_E BLOB, '
            + 'Photo_F BLOB, '
            + 'Photo_G BLOB, '
            + 'Photo_H BLOB, '
            + 'Photo_A_Thumbnail BLOB, '
            + 'Photo_B_Thumbnail BLOB, '
            + 'Photo_C_Thumbnail BLOB, '
            + 'Photo_D_Thumbnail BLOB, '
            + 'Photo_E_Thumbnail BLOB, '
            + 'Photo_F_Thumbnail BLOB, '
            + 'Photo_G_Thumbnail BLOB, '
            + 'Photo_H_Thumbnail BLOB, '
            + 'Latitude REAL, '
            + 'Longitude REAL, '
            + 'Accuracy REAL, '
            + 'Elevation REAL, '
            + 'Country NTEXT, '
            + 'Stateprovince NTEXT, '
            + 'Municipality NTEXT, '
            + 'Locality NTEXT, '
            + 'Eventdate DATETIME, '
            + 'Eventtime NTEXT, '
            + 'Habit NTEXT, '
            + 'Interaction NTEXT, '
            + 'P_vernacularname NTEXT, '
            + 'P_family NTEXT, '
            + 'P_scientificname NTEXT, '
            + 'P_identificationremarks NTEXT, '
            + 'A_vernacularname NTEXT, '
            + 'Taxgrp NTEXT, '
            + 'A_family NTEXT, '
            + 'A_scientificname NTEXT, '
            + 'A_identificationremarks NTEXT, '
            + 'Verbatimeventdate DATETIME, '
            + 'PhotoEventdate DATETIME, '
            + 'Eventremarks NTEXT); ').catch((error) => {  
            this.errorCB(error) 
        });     

        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS [SettingsModel] (ProviderGPS BOOLEAN); '
        ).catch((error) => {  
            this.errorCB(error) 
        });
      
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS [Plants] (ID,  Key); '
        ).catch((error) => {  
            this.errorCB(error) 
        });

        tx.executeSql('CREATE TABLE IF NOT EXISTS [GuardianModel] (' 
            + 'ID INTEGER PRIMARY KEY AUTOINCREMENT, '
            + 'AppCode NTEXT, ' 
            + 'IdUsuario INTEGER, ' 
            + 'Name NTEXT, ' 
            + 'NameUser NTEXT, '
            + 'Password NTEXT, '
            + 'Email NTEXT, ' 
            + 'Picture NTEXT, '
            + 'DataNascimento DATETIME, ' 
            + 'Escolaridade NTEXT, '
            + 'Genero NTEXT, '
            + 'Idioma NTEXT, '
            + 'CompletedRegistration BOOLEAN, '
            + 'TermosUso BOOLAN, '
            + 'Curriculum NTEXT, '
            + 'Comments NTEXT, '
            + 'Alert_Period NTEXT, '
            + 'Network NTEXT, '
            + 'IdNetwork NTEXT, '
            + 'DateAcceptedTermsGuardians NTEXT, '
            + 'DateAcceptedTermsSpecialist NTEXT, '
            + 'Agreement BOOLEAN, '
            + ' Welcome BOOLEAN, '
            + 'IsAuthenticated BOOLEAN); '
        ).catch((error) => {  
            this.errorCB(error) 
        });

        tx.executeSql('CREATE TABLE IF NOT EXISTS [AnimalGroup] (' 
            + 'id NTEXT, '             
            + 'key NTEXT); '
        ).catch((error) => {  
            this.errorCB(error) 
        });

        tx.executeSql('CREATE TABLE IF NOT EXISTS [AnimalGroup_Language] (' 
            + 'AnimalGroupId NTEXT, ' 
            + 'LanguageId NTEXT, ' 
            + 'value NTEXT, '
            + 'FOREIGN KEY(AnimalGroupId) REFERENCES AnimalGroup(id), '
            + 'FOREIGN KEY(LanguageId) REFERENCES Language(id)) '
        ).catch((error) => {  
            this.errorCB(error) 
        });

        tx.executeSql('CREATE TABLE IF NOT EXISTS [AnimalPlantInteraction_Language] (' 
        + 'AnimalPlantInteractionId INTEGER, ' 
        + 'LanguageId NTEXT, ' 
        + 'value NTEXT, '
        + 'FOREIGN KEY(AnimalPlantInteractionId) REFERENCES AnimalPlantInteraction(id), '
        + 'FOREIGN KEY(LanguageId) REFERENCES Language(id)) '
    ).catch((error) => {  
        this.errorCB(error) 
    });
        

        tx.executeSql('CREATE TABLE IF NOT EXISTS VersionDatabase( Version INTEGER NOT NULL );')
        .catch((error) => {  
            this.errorCB(error) 
        });
        tx.executeSql('CREATE TABLE IF NOT EXISTS [GuardianAnimalGroup] (' 
            + 'ID INTEGER PRIMARY KEY AUTOINCREMENT, '
            + 'IDGuardian INTEGER, ' 
            + 'Code NTEXT'
            + '); '
        ).catch((error) => {  
            this.errorCB(error) 
        });

        tx.executeSql('CREATE TABLE IF NOT EXISTS [PlantHabit] (' 
            + 'id INTEGER, ' 
            + 'key NTEXT); '
        ).catch((error) => {  
            this.errorCB(error) 
        });

        tx.executeSql('CREATE TABLE IF NOT EXISTS [PlantHabit_Language] (' 
            + 'PlantHabitId INTEGER, ' 
            + 'LanguageId NTEXT, ' 
            + 'value NTEXT, '
            + 'FOREIGN KEY(PlantHabitId) REFERENCES PlantHabit(id), '
            + 'FOREIGN KEY(LanguageId) REFERENCES Language(id)) '
        ).catch((error) => {  
            this.errorCB(error) 
        });

        tx.executeSql('CREATE TABLE IF NOT EXISTS [EventTime] (' 
            + 'Code NTEXT, ' 
            + 'Name NTEXT); '
        ).catch((error) => {  
            this.errorCB(error) 
        });
      
        tx.executeSql('CREATE TABLE IF NOT EXISTS [AnimalPlantInteraction] (' 
            + 'id INTEGER, ' 
            + 'key NTEXT); '
        ).catch((error) => {  
            this.errorCB(error) 
        });

        tx.executeSql('CREATE TABLE IF NOT EXISTS [AnimalPlantInteraction_Language] (' 
            + 'AnimalPlantInteractionId INTEGER, ' 
            + 'LanguageId NTEXT, ' 
            + 'value NTEXT, '
            + 'FOREIGN KEY(AnimalPlantInteractionId) REFERENCES AnimalPlantInteraction(id), '
            + 'FOREIGN KEY(LanguageId) REFERENCES Language(id)) '
        ).catch((error) => {  
            this.errorCB(error) 
        });

        tx.executeSql('CREATE TABLE IF NOT EXISTS [Expertise] (' 
            + 'id NTEXT, ' 
            + '[group] NTEXT, ' 
            + 'key NTEXT); '
        ).catch((error) => {  
            this.errorCB(error) 
        });

        tx.executeSql('CREATE TABLE IF NOT EXISTS [Expertise_Language] (' 
            + 'ExpertiseId NTEXT, ' 
            + 'LanguageId NTEXT, ' 
            + 'value NTEXT, '
            + 'FOREIGN KEY(ExpertiseId) REFERENCES Expertise(id), '
            + 'FOREIGN KEY(LanguageId) REFERENCES Language(id)) '
        ).catch((error) => {  
            this.errorCB(error) 
        });
        

        console.log("Executing INSERT stmts");

        var appCode = Functions.generateAppCode();
        tx.executeSql('INSERT INTO GuardianModel (AppCode, Name, Email, IsAuthenticated,CompletedRegistration, Idioma) VALUES (?,?,?,?,?,?)', [appCode, '','',false,false,'pt'])
        .catch((error) => {  
            alert("erro ao inserir usuario");
        });        

        tx.executeSql('INSERT INTO Language (id, Name) VALUES ("pt", "Português (Brasil)");', []);
        tx.executeSql('INSERT INTO Language (id, Name) VALUES ("en", "English (US)");', []);
        

        tx.executeSql('INSERT INTO Plants (ID, Key) VALUES (100, "planta");', []);     

        tx.executeSql('INSERT INTO EventTime (Code, Name) VALUES ("0002", "00 h - 02 h");', []);        
        tx.executeSql('INSERT INTO EventTime (Code, Name) VALUES ("0204", "02 h - 04 h");', []);        
        tx.executeSql('INSERT INTO EventTime (Code, Name) VALUES ("0406", "04 h - 06 h");', []);        
        tx.executeSql('INSERT INTO EventTime (Code, Name) VALUES ("0608", "06 h - 08 h");', []);        
        tx.executeSql('INSERT INTO EventTime (Code, Name) VALUES ("0810", "08 h - 10 h");', []);        
        tx.executeSql('INSERT INTO EventTime (Code, Name) VALUES ("1012", "10 h - 12 h");', []);
        tx.executeSql('INSERT INTO EventTime (Code, Name) VALUES ("1214", "12 h - 14 h");', []);        
        tx.executeSql('INSERT INTO EventTime (Code, Name) VALUES ("1416", "14 h - 16 h");', []);        
        tx.executeSql('INSERT INTO EventTime (Code, Name) VALUES ("1618", "16 h - 18 h");', []);        
        tx.executeSql('INSERT INTO EventTime (Code, Name) VALUES ("1820", "18 h - 20 h");', []);        
        tx.executeSql('INSERT INTO EventTime (Code, Name) VALUES ("2022", "20 h - 22 h");', []);        
        tx.executeSql('INSERT INTO EventTime (Code, Name) VALUES ("2224", "22 h - 24 h");', []);


        let configData = {
            "interaction": [
                {
                    "value": {
                        "en": "sucking sap",
                        "pt": "sugando seiva"
                    },
                    "id": 1000,
                    "key": "sugando_seiva"
                },
                {
                    "value": {
                        "en": "collecting food from flower",
                        "pt": "coletando alimento da flor"
                    },
                    "id": 100,
                    "key": "coletando_alimento_flor"
                },
                {
                    "value": {
                        "en": "collecting resin",
                        "pt": "coletando resina"
                    },
                    "id": 400,
                    "key": "coletando_resina"
                },
                {
                    "value": {
                        "en": "living",
                        "pt": "morando"
                    },
                    "id": 310,
                    "key": "morando"
                },
                {
                    "value": {
                        "en": "eating or cutting leaves",
                        "pt": "comendo ou cortando folhas"
                    },
                    "id": 800,
                    "key": "comendo_cortando_folhas"
                },
                {
                    "value": {
                        "en": "none of the above",
                        "pt": "nenhuma das anteriores"
                    },
                    "id": 1100,
                    "key": "nda"
                },
                {
                    "value": {
                        "en": "sleeping",
                        "pt": "dormindo"
                    },
                    "id": 500,
                    "key": "dormindo"
                },
                {
                    "value": {
                        "en": "leaning on the plant",
                        "pt": "se apoiando na planta"
                    },
                    "id": 700,
                    "key": "apoiando"
                },
                {
                    "value": {
                        "en": "feeding on the fruit",
                        "pt": "se alimentando do fruto"
                    },
                    "id": 200,
                    "key": "se_alimentando_fruto"
                },
                {
                    "value": {
                        "en": "building a nest",
                        "pt": "construindo ninho"
                    },
                    "id": 300,
                    "key": "construindo_ninho"
                },
                {
                    "value": {
                        "en": "copulating",
                        "pt": "copulando"
                    },
                    "id": 600,
                    "key": "copulando"
                },
                {
                    "value": {
                        "en": "eating or cutting petals",
                        "pt": "comendo ou cortando pétalas"
                    },
                    "id": 900,
                    "key": "comendo_cortando_petalas"
                }
            ],
            "expertise": [
                {
                    "group": "animalia",
                    "value": {
                        "en": "lizard",
                        "pt": "lagarto"
                    },
                    "id": "240",
                    "key": "lagarto"
                },
                {
                    "group": "animalia",
                    "value": {
                        "en": "wasp",
                        "pt": "vespa"
                    },
                    "id": "225",
                    "key": "vespa"
                },
                {
                    "group": "animalia",
                    "value": {
                        "en": "another animal",
                        "pt": "outro animal"
                    },
                    "id": "999",
                    "key": "zzz_outro"
                },
                {
                    "group": "animalia",
                    "value": {
                        "en": "fly",
                        "pt": "mosca"
                    },
                    "id": "280",
                    "key": "mosca"
                },
                {
                    "group": "animalia",
                    "value": {
                        "en": "bat",
                        "pt": "morcego"
                    },
                    "id": "250",
                    "key": "morcego"
                },
                {
                    "group": "animalia",
                    "value": {
                        "en": "spider",
                        "pt": "aranha"
                    },
                    "id": "287",
                    "key": "aranha"
                },
                {
                    "group": "animalia",
                    "value": {
                        "en": "ant",
                        "pt": "formiga"
                    },
                    "id": "230",
                    "key": "formiga"
                },
                {
                    "group": "animalia",
                    "value": {
                        "en": "bee",
                        "pt": "abelha"
                    },
                    "id": "220",
                    "key": "abelha"
                },
                {
                    "group": "animalia",
                    "value": {
                        "en": "moth",
                        "pt": "mariposa"
                    },
                    "id": "275",
                    "key": "mariposa"
                },
                {
                    "group": "animalia",
                    "value": {
                        "en": "bird",
                        "pt": "ave"
                    },
                    "id": "260",
                    "key": "ave"
                },
                {
                    "group": "animalia",
                    "value": {
                        "en": "cricket",
                        "pt": "grilo"
                    },
                    "id": "285",
                    "key": "grilo"
                },
                {
                    "group": "animalia",
                    "value": {
                        "en": "butterfly",
                        "pt": "borboleta"
                    },
                    "id": "270",
                    "key": "borboleta"
                },
                {
                    "group": "plantae",
                    "value": {
                        "en": "plant",
                        "pt": "planta"
                    },
                    "id": "100",
                    "key": "planta"
                },
                {
                    "group": "animalia",
                    "value": {
                        "en": "beetle",
                        "pt": "besouro"
                    },
                    "id": "290",
                    "key": "besouro"
                }
            ],
            "version": 4,
            "habit": [
                {
                    "value": {
                        "en": "bindweed",
                        "pt": "trepadeira"
                    },
                    "id": 500,
                    "key": "trepadeira"
                },
                {
                    "value": {
                        "en": "none of the above",
                        "pt": "nenhuma das anteriores"
                    },
                    "id": 700,
                    "key": "nda"
                },
                {
                    "value": {
                        "en": "parasite",
                        "pt": "parasita"
                    },
                    "id": 600,
                    "key": "parasita"
                },
                {
                    "value": {
                        "en": "epiphyte",
                        "pt": "epífita"
                    },
                    "id": 400,
                    "key": "epifita"
                },
                {
                    "value": {
                        "en": "herb",
                        "pt": "erva"
                    },
                    "id": 300,
                    "key": "erva"
                },
                {
                    "value": {
                        "en": "bush",
                        "pt": "arbusto"
                    },
                    "id": 200,
                    "key": "arbusto"
                },
                {
                    "value": {
                        "en": "tree",
                        "pt": "árvore"
                    },
                    "id": 100,
                    "key": "arvore"
                }
            ]
        };

        tx.executeSql('INSERT INTO Version (Number) VALUES (?);', [configData.version]);
        tx.executeSql('INSERT INTO VersionDatabase (Version) VALUES(5);');

        configData.interaction.map(function(item) {
            tx.executeSql('INSERT INTO AnimalPlantInteraction (id, key) VALUES (?, ?);', [item.id, item.key]);
            for(var lang in item.value){
                tx.executeSql('INSERT INTO AnimalPlantInteraction_Language (AnimalPlantInteractionId, LanguageId, value) VALUES (?, ?, ?);', [item.id, lang, item.value[lang]]);            
            }            
        });
        
        configData.expertise.map(function(item) {
            tx.executeSql('INSERT INTO Expertise (id, [group], key) VALUES (?, ?, ?);', [item.id, item.group, item.key]);
            for(var lang in item.value){
                tx.executeSql('INSERT INTO Expertise_Language (ExpertiseId, LanguageId, value) VALUES (?, ?, ?);', [item.id, lang, item.value[lang]]);            
            }            
            if(item.group == "animalia"){   
                tx.executeSql('INSERT INTO AnimalGroup (id, key) VALUES (?, ?);', [item.id, item.key]);
                for(var lang in item.value){
                    tx.executeSql('INSERT INTO AnimalGroup_Language (AnimalGroupId, LanguageId, value) VALUES (?, ?, ?);', [item.id, lang, item.value[lang]]);            
                }            
            }
        });      

        configData.habit.map(function(item) {
            tx.executeSql('INSERT INTO PlantHabit (id, key) VALUES (?, ?);', [item.id, item.key]);
            for(var lang in item.value){
                tx.executeSql('INSERT INTO PlantHabit_Language (PlantHabitId, LanguageId, value) VALUES (?, ?, ?);', [item.id, lang, item.value[lang]]);            
            }            
        });

        console.log("all config SQL done");
        EventRegister.emit('DBReady');
    }


    async UpdateDB() 
    {
        conn.executeSql('SELECT max(Version) FROM VersionDatabase')
        .then(async(results) => {
            let version = results[0];
            if (version < dbUpgrade.version) {
                //Call upgrade scripts
                let statements = [];
                let length = Object.keys(dbUpgrade.upgrades).length;
                for (let i = version; i <= length; i += 1) {
                    let upgrade = dbUpgrade.upgrades['to_v'+ i ];
                    
                    if (upgrade) {
                        statements = [...statements, ...upgrade];
                    } else {
                        break;
                    }
            
                    // version++;
                }
     
                let retorno = await conn.sqlBatch(statements)
                .then(() =>{
                   return true;
                })
                .catch((error) => {
                    alert('Error:'+ JSON.stringify(error));
                    return false;
                }); //fecha o catch do batch
                if(retorno)
                {
                    let isConnected = await NetInfo.isConnected.fetch().then(isConnected => {
                       return isConnected;
                    }); //fecha a verificação de internet
    
                    if(isConnected)
                    {
                        let results = await conn.executeSql('SELECT MAX(Number) AS Number FROM Version')
                        .then(async (results) => {           
                            return results;
                        })
                        .catch((error) =>{
                            alert("Aqui: " + JSON.stringify(error));
                            EventRegister.emit('DBReady');
                            console.error(error);
                            return undefined;
                        });
    
                        
                        if(results != undefined){
                            if(results[0].rows != undefined && results[0].rows.item(0) != undefined)
                            {                    
                                let VersionNumber = results[0].rows.item(0).Number;
                                var api = Constants.getApi();
                                var objAjax = {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        action: 'get_config',
                                        version: VersionNumber
                                    }),
                                };                
                                Functions.trustFetch(api, objAjax)
                                .then((response) => {
                                    var responseJson = response.json();                                                                               
                                    if(responseJson.version > VersionNumber)
                                    {
                                        conn.transaction(tx => {
                                            tx.executeSql('INSERT INTO Version (Number) VALUES (?);', [responseJson.version]);
        
                                            if(responseJson.interaction.length > 0)
                                            {
                                                tx.executeSql('DELETE FROM AnimalPlantInteraction_Language;', []);
                                                tx.executeSql('DELETE FROM AnimalPlantInteraction;', []);                            
        
                                                responseJson.interaction.map(function(item) {
                                                    tx.executeSql('INSERT INTO AnimalPlantInteraction (id, key) VALUES (?, ?);', [item.id, item.key]);
                                                    for(var lang in item.value)
                                                    {
                                                        tx.executeSql('INSERT INTO AnimalPlantInteraction_Language (AnimalPlantInteractionId, LanguageId, value) VALUES (?, ?, ?);', [item.id, lang, item.value[lang]]);            
                                                    }            
                                                });
                                            }
                                        
                                            if(responseJson.expertise.length > 0)
                                            {
                                                tx.executeSql('DELETE FROM Expertise_Language;', []);
                                                tx.executeSql('DELETE FROM Expertise;', []);
                                                tx.executeSql('DELETE FROM AnimalGroup_Language;', []);
                                                tx.executeSql('DELETE FROM AnimalGroup;', []);
        
                                                responseJson.expertise.map(function(item) {
                                                    tx.executeSql('INSERT INTO Expertise (id, [group], key) VALUES (?, ?, ?);', [item.id, item.group, item.key]);
                                                    for(var lang in item.value)
                                                    {
                                                        tx.executeSql('INSERT INTO Expertise_Language (ExpertiseId, LanguageId, value) VALUES (?, ?, ?);', [item.id, lang, item.value[lang]]);            
                                                    }      
                                                    if(item.group == "animalia")
                                                    {   
                                                        tx.executeSql('INSERT INTO AnimalGroup (id, key) VALUES (?, ?);', [item.id, item.key]);
                                                        for(var lang in item.value)
                                                        {
                                                            tx.executeSql('INSERT INTO AnimalGroup_Language (AnimalGroupId, LanguageId, value) VALUES (?, ?, ?);', [item.id, lang, item.value[lang]]);            
                                                        }            
                                                    }      
                                                });
                                            }
        
                                            if(responseJson.habit.length > 0)
                                            {
                                                tx.executeSql('DELETE FROM PlantHabit_Language;', []);
                                                tx.executeSql('DELETE FROM PlantHabit;', []);
        
                                                responseJson.habit.map(function(item) 
                                                {
                                                    tx.executeSql('INSERT INTO PlantHabit (id, key) VALUES (?, ?);', [item.id, item.key]);
                                                    for(var lang in item.value)
                                                    {
                                                        tx.executeSql('INSERT INTO PlantHabit_Language (PlantHabitId, LanguageId, value) VALUES (?, ?, ?);', [item.id, lang, item.value[lang]]);            
                                                    }            
                                                });                            
                                            }
                                        });
                                        EventRegister.emit('DBReady');       
                                    }   
                                    else
                                    {
                                        EventRegister.emit('DBReady');     
                                    }        
                                })    
                                .catch((error) =>{                          
                                    alert("Erro ao acessar a API para atualizar as configurações: " + error);
                                });
                            }
                            else
                            {
                                
                                EventRegister.emit('DBReady');
                            }
                            
                            EventRegister.emit('DBReady');
                        }
                    }
                    else
                    {
                        console.log("device offline, update canceled.");               
                        EventRegister.emit('DBReady');
                    }
                }
               
            }
            else{
                EventRegister.emit('DBReady'); 
            }
        })
        .catch(async (error) => {
            let version = 0;
            let statements = [];
            let length = Object.keys(dbUpgrade.upgrades).length;
            for (let i = 1; i <= length; i += 1) {
                let upgrade = dbUpgrade.upgrades['to_v'+ i ];
                
                if (upgrade) 
                {
                    statements = [...statements, ...upgrade];
                } else 
                {
                    break;
                }
        
                version++;
            }
 
            
            let retorno = await conn.sqlBatch(statements)
            .then(() =>{
               return true;
            })
            .catch((error) => {
                alert('Error:'+ JSON.stringify(error));
                return false;
            }); //fecha o catch do batch
            if(retorno)
            {
                let isConnected = await NetInfo.isConnected.fetch().then(isConnected => {
                   return isConnected;
                }); //fecha a verificação de internet

                if(isConnected)
                {
                    let results = await conn.executeSql('SELECT MAX(Number) AS Number FROM Version')
                    .then(async (results) => {           
                        return results;
                    })
                    .catch((error) =>{
                        alert("Aqui: " + JSON.stringify(error));
                        EventRegister.emit('DBReady');
                        console.error(error);
                        return undefined;
                    });

                    
                    if(results != undefined){
                        if(results[0].rows != undefined && results[0].rows.item(0) != undefined)
                        {                    
                            let VersionNumber = results[0].rows.item(0).Number;
                            var api = Constants.getApi();
                            var objAjax = {
                                method: 'POST',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    action: 'get_config',
                                    version: VersionNumber
                                }),
                            };                
                            Functions.trustFetch(api, objAjax)
                            .then((response) => {
                                var responseJson = response.json();                                                                               
                                if(responseJson.version > VersionNumber)
                                {
                                    conn.transaction(tx => {
                                        tx.executeSql('INSERT INTO Version (Number) VALUES (?);', [responseJson.version]);
    
                                        if(responseJson.interaction.length > 0)
                                        {
                                            tx.executeSql('DELETE FROM AnimalPlantInteraction_Language;', []);
                                            tx.executeSql('DELETE FROM AnimalPlantInteraction;', []);                            
    
                                            responseJson.interaction.map(function(item) {
                                                tx.executeSql('INSERT INTO AnimalPlantInteraction (id, key) VALUES (?, ?);', [item.id, item.key]);
                                                for(var lang in item.value)
                                                {
                                                    tx.executeSql('INSERT INTO AnimalPlantInteraction_Language (AnimalPlantInteractionId, LanguageId, value) VALUES (?, ?, ?);', [item.id, lang, item.value[lang]]);            
                                                }            
                                            });
                                        }
                                    
                                        if(responseJson.expertise.length > 0)
                                        {
                                            tx.executeSql('DELETE FROM Expertise_Language;', []);
                                            tx.executeSql('DELETE FROM Expertise;', []);
                                            tx.executeSql('DELETE FROM AnimalGroup_Language;', []);
                                            tx.executeSql('DELETE FROM AnimalGroup;', []);
    
                                            responseJson.expertise.map(function(item) {
                                                tx.executeSql('INSERT INTO Expertise (id, [group], key) VALUES (?, ?, ?);', [item.id, item.group, item.key]);
                                                for(var lang in item.value)
                                                {
                                                    tx.executeSql('INSERT INTO Expertise_Language (ExpertiseId, LanguageId, value) VALUES (?, ?, ?);', [item.id, lang, item.value[lang]]);            
                                                }      
                                                if(item.group == "animalia")
                                                {   
                                                    tx.executeSql('INSERT INTO AnimalGroup (id, key) VALUES (?, ?);', [item.id, item.key]);
                                                    for(var lang in item.value)
                                                    {
                                                        tx.executeSql('INSERT INTO AnimalGroup_Language (AnimalGroupId, LanguageId, value) VALUES (?, ?, ?);', [item.id, lang, item.value[lang]]);            
                                                    }            
                                                }      
                                            });
                                        }
    
                                        if(responseJson.habit.length > 0)
                                        {
                                            tx.executeSql('DELETE FROM PlantHabit_Language;', []);
                                            tx.executeSql('DELETE FROM PlantHabit;', []);
    
                                            responseJson.habit.map(function(item) 
                                            {
                                                tx.executeSql('INSERT INTO PlantHabit (id, key) VALUES (?, ?);', [item.id, item.key]);
                                                for(var lang in item.value)
                                                {
                                                    tx.executeSql('INSERT INTO PlantHabit_Language (PlantHabitId, LanguageId, value) VALUES (?, ?, ?);', [item.id, lang, item.value[lang]]);            
                                                }            
                                            });                            
                                        }
                                    });
                                    EventRegister.emit('DBReady');       
                                }   
                                else
                                {
                                    EventRegister.emit('DBReady');     
                                }        
                            })    
                            .catch((error) =>{                          
                                alert("Erro ao acessar a API para atualizar as configurações: " + error);
                            });
                        }
                        else
                        {
                            
                            EventRegister.emit('DBReady');
                        }
                        
                        EventRegister.emit('DBReady');
                    }
                }
                else
                {
                    console.log("device offline, update canceled.");               
                    EventRegister.emit('DBReady');
                }
            }
           
        });//fecha o primeiro catch

    }
}

module.exports = new StorageManager();