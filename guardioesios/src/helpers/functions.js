'use strict';
import React from 'react';
import Moment from 'moment';
import StorageManager from '../storage/StorageManager';

import RNFetchBlob from 'react-native-fetch-blob';

class Functions {
    
    dateToSQLiteFormat(value) {
        try {
            return value.getFullYear() + "-" + 
                  ("00" + parseInt(value.getMonth())).slice(-2) + "-" + 
                  ("00" + parseInt(value.getDay())).slice(-2) + " " + 
                  ("00" + parseInt(value.getHours())).slice(-2) + ":" + 
                  ("00" + parseInt(value.getMinutes())).slice(-2) + ":" + 
                  ("00" + parseInt(value.getSeconds())).slice(-2);
        } catch (error) {
            return "";
        }
    }

    SQLiteFormatToDate(value){
        return new Date(value.substr(0, 4), parseInt(value.substr(5, 2)) - 1, value.substr(8, 2), value.substr(11, 2), value.substr(14, 2));
    }

    concatenateString(string1, string2, string3, string4){
        var array = new Array();
        var retorno;
        if(!this.isNullOrEmpty(string1))
        {
            array.push(string1.trim());
        }
        if(!this.isNullOrEmpty(string2))
        {
            array.push(string2.trim());
        }
        if(!this.isNullOrEmpty(string3))
        {
            array.push(string3.trim());
        }
        if(!this.isNullOrEmpty(string4))
        {
            array.push(string4.trim());
        }
        retorno = array.join(", ");
        return  retorno;
    }

    isNullOrEmpty(value)
    {
        if(value == null || value == undefined || value.trim() == "")
        {
            return true;
        }
        return false;
    }

    generateAppCode()
    {
        var date = new Date();
        var appCode = Moment(date).format('YYYYMMDDHHmmssSSS');
        appCode = appCode.replace("/","").replace(" ", "").replace(":","");
        appCode = appCode.replace("/","");
        var tam = 20 - appCode.length;
        while(appCode.length<20)
        {
            var RandomNumber = Math.floor(Math.random() * 9);
            appCode = appCode+""+ RandomNumber;
        }
        return appCode;
    }
    isEquals(string1, string2)
    {
        if(string1 != string2)
            return false;
        
        return true;
    }

    pad(num, size) {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    }
    validateEmail(email)
    {
      let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(reg.test(email) === false)
      {
        return false;
      }
      else
      {
        return true;
      }
    }    
    getAppCode()
    {
        var conn = StorageManager.getConnection();
        var appCode;
        conn.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM GuardianModel",
                [],
                (_, results) => {
                    if(results.rows.length > 0){
                        let row = results.rows.item(0);
                        return row.AppCode;
                    }        
                }
            );
        });
    }

    trustFetch(url, parameters){
        return RNFetchBlob.config({
            trusty : false
          }).fetch(parameters.method, url, parameters.headers, parameters.body);
    }
}

module.exports = new Functions();