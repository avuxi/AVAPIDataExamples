var request = require('request');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var BaseUrl = 'https://data.avuxiapis.com';

function RequestPost(url,form,cb){
    var requestOptions = {
        url : BaseUrl+url,
        headers: {'Content-Type':'application/json'},
        body : JSON.stringify(form)
    };
    request.post(
        requestOptions,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                cb(body)
            }
        }
    );
}

function RequestGet(url,form,cb){
    var url = BaseUrl+url+'?'+Object.keys(form).map(function(key) {return key + '=' + form[key];}).join('&');
    request.get(
        url,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                cb(body)
            }
        }
    );
}


function SecureGenerateKey(cb){
    console.log("\nSecureGenerateKey");
    var form = {appid:appId,appsecure:appSecure};
    RequestPost("/api/SecureGenerateKey", form,function(body){
        var data = JSON.parse(body);
        if(data.State == 0) {
            AppKey = data.Key;
            console.log(AppKey);
            cb();
        }else{
            console.log(data.Note);
        }
    });
}

function GeoRank(cb){
    console.log("\nGeoRank");
    var form = {
        'key': AppKey,
        'points' : []
    };
    form.points.push({
        'id': 'B54125',
        'latitude': 41.388722,
        'longitude': 2.168169
    });

    RequestPost("/api/GeoRank", form,function(body){
        var data = JSON.parse(body);
        if(data.State == 0) {
            AppKey = data.Key;
            console.log(data);
        }else{
            console.log(data.Note);
        }
        cb();
    });
}

function HeatMapTiles(cb) {
    var form = {
        "key": AppKey,
        "x": "16581",
        "y": "16581",
        "z": "15",
        "v": "02",
        "o": "0.3",
        "t": "sights",
        "s": "mgl"
    };
    RequestGet('/api/HeatMapTiles',form,function(body){
        var data = JSON.parse(body);
        if(data.State == 0) {
            AppKey = data.Key;
            console.log(data);
        }else{
            console.log(data.Note);
        }
        cb();
    });
}
function HeatMapVectorsGet(cb) {
    var form = {
        "key": AppKey,
        "tile" : "518_352",
        "level" : "2",
        "category" : "vrestaurant",
        "format" : "app"
    };
    RequestGet('/api/HeatMapVectors',form,function(body){
        var data = JSON.parse(body);
        if(data.State == 0) {
            AppKey = data.Key;
            console.log(data);
        }else{
            console.log(data.Note);
        }
        cb();
    });
}

function HeatMapVectorsPost(cb) {
    var form = {
        "key": AppKey,
        "tile" : "518_352",
        "level" : "2",
        "category" : "vrestaurant",
        "format" : "app"
    };
    RequestPost('/api/HeatMapVectors',form,function(body){
        var data = JSON.parse(body);
        if(data.State == 0) {
            AppKey = data.Key;
            console.log(data);
        }else{
            console.log(data.Note);
        }
        cb();
    });
}

function LocationScorePost(cb) {
    var form = {
        "key": AppKey,
        "language": "en",
        "type": "ranktop3",
        "points" : []
    };
    form.points.push({
        'id': 'B54125',
        'latitude': 41.388722,
        'longitude': 2.168169
    });
    RequestPost('/api/LocationScore',form,function(body){
        var data = JSON.parse(body);
        if(data.State == 0) {
            AppKey = data.Key;
            console.log(data);
        }else{
            console.log(data.Note);
        }
        cb();
    });
}


function POIGet(cb) {
    var form = {
        "key": AppKey,
        "north" : 41.397158,
        "west" : 2.160873,
        "south" : 41.394582,
        "east" : 2.177181,
        "limit": 5
    };

    RequestGet('/api/POI',form,function(body){
        var data = JSON.parse(body);
        if(data.State == 0) {
            AppKey = data.Key;
            console.log(data);
        }else{
            console.log(data.Note);
        }
        cb();
    });
}

function POIPost(cb) {
    var form = {
        "key": AppKey,
        "north" : 41.397158,
        "west" : 2.160873,
        "south" : 41.394582,
        "east" : 2.177181,
        "limit": 5
    };

    RequestPost('/api/POI',form,function(body){
        var data = JSON.parse(body);
        if(data.State == 0) {
            AppKey = data.Key;
            console.log(data);
        }else{
            console.log(data.Note);
        }
        cb();
    });
}



function TransportGet(cb) {
    var form = {
        "key": AppKey,
        "latitude" : 41.388722,
        "longitude" : 2.168169
    };

    RequestGet('/api/Transport',form,function(body){
        var data = JSON.parse(body);
        if(data.State == 0) {
            AppKey = data.Key;
            console.log(data);
        }else{
            console.log(data.Note);
        }
        cb();
    });
}



var AppKey = '';
var appId = "xxxx";
var appSecure = "xxxx";

function Start(){
    // AppKey = 'XXX';
    SecureGenerateKey(function(){
        GeoRank(function(){

        });
    });
}

Start();