var request = require('request');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var BaseUrl = "https://data.avuxiapis.com";

function RequestPost(url,form,cb){

    var requestOptions = {
        url : BaseUrl+url,
        headers: {'Content-Type':'application/json',
            'Accept': 'application/Json'},
        form : form
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
    console.log(url);
    request.get(
        url,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                cb(body)
            }
        }
    );
}


function GetSecureToken(){
    console.log("\nGetSecureToken");
    var form = {appid:appId,appsecure:appSecure};
    RequestPost("/v1/GetSecureToken", form,function(body){
        var data = JSON.parse(body);
        if(data.state == 0) {
            AppKey = data.key;
            console.log(AppKey);
            cb();
        }else{
            console.log(data.Note);
        }
    });
}

function GetLocationScoresByRadius_Get(){
    console.log("\nGetLocationScoresByRadius");
    var form = {
        'key': AppKey,
        'points' : []
    };
    form.points.push({
        'id': 'B54125',
        'latitude': '51.510',
        'longitude': '-0.110'
    });

    RequestGet("/v1/GetLocationScoresByRadius", form,function(body){
        var data = JSON.parse(body);
        if(data.state == 0) {
            console.log(data);

        }else{
            console.log(data.note);
        }
    });
}

function GetLocationScoresByRadius_Post(){
    console.log("\nGetLocationScoresByRadius");
    var form = {
        key: AppKey,
        points: []
    };
    form.points.push({
        id: 'B54125',
        latitude: 41.388722,
        longitude: 2.168169
    });
    RequestPost("/v1/GetLocationScoresByRadius", form,function(body){
        var data = JSON.parse(body);
        if(data.state == 0) {

            console.log(data);

        }else{
            console.log(data.note);
        }
    });

}

function GetHeatMapVectorial_Get() {
    var form = {
        "key": AppKey,
        "tile10" : "518_352",
        "category" : "vrestaurant"
    };
    RequestGet('/v1/GetHeatMapVectorial',form,function(body){
        var data = JSON.parse(body);
        if(data.state == 0) {
            console.log(data);
        }else{
            console.log(data.Note);
        }
    });
}

function GetHeatMapVectorial_Post() {
    var form = {
        "key": AppKey,
        "tile10" : "518_352",
        "category" : "vrestaurant"
    };
    RequestPost('/v1/GetHeatMapVectorial',form,function(body){
        var data = JSON.parse(body);
        if(data.state == 0) {
            console.log(data);
        }else{
            console.log(data.Note);
        }
    });
}
function GetHeatMapAvailableCategories_Get() {
    var form = {
        "key": AppKey,
        "tile10": "518_352",

    };
    RequestGet('/v1/GetHeatMapAvailableCategories',form,function(body){
        var data = JSON.parse(body);
        if(data.state == 0) {
            AppKey = data.Key;
            console.log((data));
        }else{
            console.log(data.Note);
        }
    });
}

function GetHeatMapAvailableCategories_Post() {
    var form = {
        "key": AppKey,
        "tile10": "518_352",

    };
    RequestPost('/v1/GetHeatMapAvailableCategories',form,function(body){
        var data = JSON.parse(body);
        if(data.state == 0) {
            AppKey = data.Key;
            console.log((data));
        }else{
            console.log(data.Note);
        }
    });
}

function GetLocationScore_Get() {
    var form = {
        "key": AppKey,
        "language": "en",
        'latitude': 41.388722,
        'longitude': 2.168169
    };

    RequestGet('/v1/GetLocationScore',form,function(body){
        var data = JSON.parse(body);
        if(data.state == 0) {
            console.log(JSON.stringify(data));
        }else{
            console.log(data.Note);
        }
    });
}

function GetLocationScore_Post() {
    var form = {
        key: AppKey,
        language: 'en',
        points: []
    };
    form.points.push({
        id: 'B54125',
        latitude: 41.388722,
        longitude: 2.168169
    });

    RequestPost('/v1/GetLocationScore',form,function(body){
        var data = JSON.parse(body);
        if(data.state == 0) {
            console.log(data.values);
        }else{
            console.log(data.Note);
        }
    });
}

function GetLocationScoreWithTop3Venues_Get() {
    var form = {
        "key": AppKey,
        "language": "en",
        'latitude': 41.388722,
        'longitude': 2.168169
    };

    RequestGet('/v1/GetLocationScoreWithTop3Venues',form,function(body){
        var data = JSON.parse(body);
        if(data.state == 0) {
            console.log(data.values);
        }else{
            console.log(data.Note);
        }
    });
}

function GetLocationScoreWithTop3Venues_Post() {
    var form = {
        key: AppKey,
        language: 'en',
        points: []
    };
    form.points.push({
        id: 'B54125',
        latitude: 41.388722,
        longitude: 2.168169
    });

    RequestPost('/v1/GetLocationScoreWithTop3Venues',form,function(body){
        var data = JSON.parse(body);
        if(data.state == 0) {
            console.log(data.values);
        }else{
            console.log(data.Note);
        }
    });
}

function GetLocationScoreWithTop6Venues_Get() {
    var form = {
        "key": AppKey,
        "language": "en",
        'latitude': 41.388722,
        'longitude': 2.168169
    };

    RequestGet('/v1/GetLocationScoreWithTop6Venues',form,function(body){
        var data = JSON.parse(body);
        if(data.state == 0) {
            console.log(data.values);
        }else{
            console.log(data.Note);
        }
    });
}

function GetLocationScoreWithTop6Venues_Post() {
    var form = {
        key: AppKey,
        language: 'en',
        points: []
    };
    form.points.push({
        id: 'B54125',
        latitude: 41.388722,
        longitude: 2.168169
    });

    RequestPost('/v1/GetLocationScoreWithTop6Venues',form,function(body){
        var data = JSON.parse(body);
        if(data.state == 0) {
            console.log(data.values);
        }else{
            console.log(data.Note);
        }
    });
}

function GetLocationScoreWithTop12Venues_Get() {
    var form = {
        "key": AppKey,
        "language": "en",
        'latitude': 41.388722,
        'longitude': 2.168169
    };

    RequestGet('/v1/GetLocationScoreWithTop12Venues',form,function(body){
        var data = JSON.parse(body);
        if(data.state == 0) {
            console.log(data.values);
        }else{
            console.log(data.Note);
        }
    });
}

function GetLocationScoreWithTop12Venues_Post() {
    var form = {
        key: AppKey,
        language: 'en',
        points: []
    };
    form.points.push({
        id: 'B54125',
        latitude: 41.388722,
        longitude: 2.168169
    });

    RequestPost('/v1/GetLocationScoreWithTop12Venues',form,function(body){
        var data = JSON.parse(body);
        if(data.state == 0) {
            console.log(data.values);
        }else{
            console.log(data.Note);
        }
    });
}

function GetLocationScoreWithTop1ByCategory_Get() {
    var form = {
        "key": AppKey,
        "language": "en",
        'latitude': 41.388722,
        'longitude': 2.168169
    };

    RequestGet('/v1/GetLocationScoreWithTop1ByCategory',form,function(body){
        var data = JSON.parse(body);
        if(data.state == 0) {
            console.log(data.values);
        }else{
            console.log(data.Note);
        }
    });
}

function GetLocationScoreWithTop1ByCategory_Post() {
    var form = {
        key: AppKey,
        language: 'en',
        points: []
    };
    form.points.push({
        id: 'B54125',
        latitude: 41.388722,
        longitude: 2.168169
    });

    RequestPost('/v1/GetLocationScoreWithTop1ByCategory',form,function(body){
        var data = JSON.parse(body);
        if(data.state == 0) {
            console.log(data.values);
        }else{
            console.log(data.Note);
        }
    });
}

function GetNearbyTransport_Get() {
    var form = {
        "key": AppKey,
        "language": "en",
        'latitude': 41.388722,
        'longitude': 2.168169
    };

    RequestGet('/v1/GetNearbyTransport',form,function(body){
        var data = JSON.parse(body);
        if(data.state == 0) {
            console.log(data.values[0].venues);
        }else{
            console.log(data.Note);
        }
    });
}

function GetNearbyTransport_Post() {
    var form = {
        key: AppKey,
        language: 'en',
        points: []
    };
    form.points.push({
        id: 'B54125',
        latitude: 41.388722,
        longitude: 2.168169
    });

    RequestPost('/v1/GetNearbyTransport',form,function(body){
        var data = JSON.parse(body);
        if(data.state == 0) {
            console.log(data.values);
        }else{
            console.log(data.Note);
        }
    });
}

function GetPointsOfInterestByBox_Get() {
    var form = {
        "key": AppKey,
        "north" : 41.397158,
        "west" : 2.160873,
        "south" : 41.394582,
        "east" : 2.177181,
        "limit": 5,
        "language": "en"
    };

    RequestGet('/v1/GetPointsOfInterestByBox',form,function(body){
        var data = JSON.parse(body);


        if(data.state == 0) {
            console.log(data);
        }else{
            console.log(data.note);
        }
    });
}

function GetPointsOfInterestByBox_Post() {
    var form = {
        "key": AppKey,
        "north" : 41.397158,
        "west" : 2.160873,
        "south" : 41.394582,
        "east" : 2.177181,
        "limit": 5
    };

    RequestPost('/v1/GetPointsOfInterestByBox',form,function(body){
        var data = JSON.parse(body);


        if(data.state == 0) {
            console.log(data);
        }else{
            console.log(data.note);
        }
    });
}

function GetMetroLinesByCityCenter_Get() {
    var form = {
        "key": AppKey,
        "latitude" : 41.388722,
        "longitude" : 2.168169
    };

    RequestGet('/v1/GetMetroLinesByCityCenter',form,function(body){
        var data = JSON.parse(body);
        if(data.state == 0) {
            console.log(data);
        }else{
            console.log(data.Note);
        }
    });
}

function GetMetroLinesByCityCenter_Post() {
    var form = {
        "key": AppKey,
        "latitude" : 41.388722,
        "longitude" : 2.168169
    };

    RequestPost('/v1/GetMetroLinesByCityCenter',form,function(body){
        var data = JSON.parse(body);
        if(data.state == 0) {
            console.log(data);
        }else{
            console.log(data.Note);
        }
    });
}



var AppKey = "xxx|yyyy";
var appId = "xxx";
var appSecure = "yyyy";

function Start(){

    //GetSecureToken()

    GetLocationScoresByRadius_Get();
    GetLocationScoresByRadius_Post();

    GetHeatMapVectorial_Get();
    GetHeatMapVectorial_Post();

    GetHeatMapAvailableCategories_Get ();
    GetHeatMapAvailableCategories_Post ();

    GetLocationScore_Get ();
    GetLocationScore_Post ();

    GetLocationScoreWithTop3Venues_Get();
    GetLocationScoreWithTop3Venues_Post();

    GetLocationScoreWithTop6Venues_Get();
    GetLocationScoreWithTop6Venues_Post();

    GetLocationScoreWithTop12Venues_Get();
    GetLocationScoreWithTop12Venues_Post();

    GetNearbyTransport_Get();
    GetNearbyTransport_Post();

    GetPointsOfInterestByBox_Get();
    GetPointsOfInterestByBox_Post();

    GetMetroLinesByCityCenter_Get();
    GetMetroLinesByCityCenter_Post();

}

Start();