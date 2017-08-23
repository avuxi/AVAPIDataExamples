import requests
from requests.packages.urllib3.exceptions import InsecureRequestWarning
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)


def SecureGenerateKey():
    print('SecureGenerateKey')
    form = {"appid":AppId,"appsecure":AppSecure}
    r = requests.post(BaseUrl+'/api/SecureGenerateKey',json=form,verify=False)
    doc = r.json()
    AppKey = 'Token: ' + doc["Key"]
    print(AppKey)

def GeoRank():
    print("GeoRank")
    form = {
        'key': AppKey,
        'points' : [{
                'id': 'B54125',
                'latitude': 41.388722,
                'longitude': 2.168169
            }
        ]
    }

    r = requests.post(BaseUrl+'/api/GeoRank',json=form,verify=False)
    doc = r.json()
    print(doc)

def HeatMapTiles():
    print("HeatMapTiles")
    form = {
        'key': AppKey,
        "x": "16581",
        "y": "16581",
        "z": "15",
        "v": "02",
        "o": "0.3",
        "t": "sights",
        "s": "mgl"
    }

    r = requests.get(BaseUrl+'/api/HeatMapTiles',json=form,verify=False)
    doc = r.json()
    print(doc)

def HeatMapVectorsGet():
    print("HeatMapVectorsGet")
    form = {
        'key': AppKey,
        "tile" : "518_352",
        "level" : "2",
        "category" : "vrestaurant",
        "format" : "app"
    }

    r = requests.get(BaseUrl+'/api/HeatMapVectors',json=form,verify=False)
    doc = r.json()
    print(doc)

def HeatMapVectorsPost():
    print("HeatMapVectorsPost")
    form = {
        'key': AppKey,
        "tile" : "518_352",
        "level" : "2",
        "category" : "vrestaurant",
        "format" : "app"
    }

    r = requests.post(BaseUrl+'/api/HeatMapVectors',json=form,verify=False)
    doc = r.json()
    print(doc)

def LocationScorePost():
    print("LocationScorePost")
    form = {
        'key': AppKey,
        "language": "en",
        "type": "ranktop3",
        "points" : [{
        'id': 'B54125',
        'latitude': 41.388722,
        'longitude': 2.168169
    }]
    }

    r = requests.post(BaseUrl+'/api/LocationScore',json=form,verify=False)
    doc = r.json()
    print(doc)

def POIGet():
    print("POIGet")
    form = {
        'key': AppKey,
        "north" : 41.397158,
        "west" : 2.160873,
        "south" : 41.394582,
        "east" : 2.177181,
        "limit": 5
    }

    r = requests.get(BaseUrl+'/api/POI',json=form,verify=False)
    doc = r.json()
    print(doc)

def POIPost():
    print("POIPost")
    form = {
        'key': AppKey,
        "north" : 41.397158,
        "west" : 2.160873,
        "south" : 41.394582,
        "east" : 2.177181,
        "limit": 5
    }

    r = requests.post(BaseUrl+'/api/POI',json=form,verify=False)
    doc = r.json()
    print(doc)


def TransportGet():
    print("TransportGet")
    form = {
        'key': AppKey,
        "latitude" : 41.388722,
        "longitude" : 2.168169
    }

    r = requests.get(BaseUrl+'/api/Transport',json=form,verify=False)
    doc = r.json()
    print(doc)




BaseUrl = 'https://data.avuxiapis.com'
AppKey = ''
AppId = "xxxx"
AppSecure = "xxxx"

SecureGenerateKey()
GeoRank()
HeatMapTiles()
HeatMapVectorsGet()
HeatMapVectorsPost()
LocationScorePost()
POIGet()
POIPost()
TransportGet()