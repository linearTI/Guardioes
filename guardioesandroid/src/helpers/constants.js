'use strict';
import React from 'react';

let _GoogleSigninWebClientId = "106547273323-9n4s72e6u13m0ajcop7fieubv935go54.apps.googleusercontent.com";
let _GoogleSigninIosClientId = "106547273323-nbn5c8cj2kj12ta15m9tfo83bk3atuhb.apps.googleusercontent.com";

// let _TWITTER_COMSUMER_KEY = "5WlrIA4SQaTFfzZieK6598Ast";
// let _TWITTER_CONSUMER_SECRET ="cXBq42kalSXiI0x4OLHxK0Vrzwa6Bm0Y7f1otuPuue8x3G1ew5";

let _TWITTER_COMSUMER_KEY = "TrbozDbeOSuQf0n2k2DQQYtXa";
let _TWITTER_CONSUMER_SECRET ="yUpBALbJESISXMIA2jaeZ6Qt6CJPWLAuKVWgpd0f99mgByCieL";

//let _InstagramClientId = "d29a5377a70d4259bce0b4c58bcc6184";
let _InstagramClientId = "f7353c3dbe094a98964fb89e4be6ce99";

let _api = "https://guardioes.cria.org.br/apisrv";
let _apiAutoComplete = "https://guardioes.cria.org.br/suggestions/dictionary_scinames?";

let _apiLatLon = "https://guardioes.cria.org.br/infoxy/lat/{0}/long/{1}";

class Constants {

    GoogleSigninWebClientId(){
        return _GoogleSigninWebClientId;
    }

    GoogleSigninIosClientId(){
        return _GoogleSigninIosClientId;
    }

    TWITTER_COMSUMER_KEY(){
        return _TWITTER_COMSUMER_KEY;
    }

    TWITTER_CONSUMER_SECRET(){
        return _TWITTER_CONSUMER_SECRET;
    }

    InstagramClientId(){
        return _InstagramClientId;
    }

    getApi() {
        return _api;
    }

    getapiApiLatLon() {
        return _apiLatLon;
    }

    getApiAutoComplete()
    {
        return _apiAutoComplete;
    }
}

module.exports = new Constants();
