using System;
using System.Linq;
using System.Collections.Specialized;
using System.Collections.Generic;
using System.Net;
using Newtonsoft.Json;

namespace AVAPIDataDemo
{
    class MainClass
    {
        public static void Main(string[] args)
        {
            SecureGenerateKey();
            GeoRank();
            HeatMapTiles();
            HeatMapVectorsGet();
            HeatMapVectorsPost();
            LocationScorePost();
            TransportGet();
            POIGet();
            POIPost();
        }

        public static string AppKey = "";

        static string BaseUrl = "https://data.avuxiapis.com";

        private static string RequestPost(string url, string values)
        {
            var _url = BaseUrl + url;
            var cli = new WebClient();
            cli.Headers[HttpRequestHeader.ContentType] = "application/json";
            string response = cli.UploadString(_url, values);
            return response;
        }

        private static string RequestPost(string url, NameValueCollection values)
        {
            using (var wb = new WebClient())
            {
                var _url = BaseUrl + url;
                var response = wb.UploadValues(_url, "POST", values);
                var aux = System.Text.Encoding.UTF8.GetString(response);
                return aux;
            }
        }

        private static string RequestGet(string url, NameValueCollection values)
        {

            using (var wb = new WebClient())
            {
                string q = String.Join("&", values.AllKeys.Select(a => a + "=" + System.Web.HttpUtility.UrlEncode(values[a])));
                var _url = BaseUrl + url + "?" + q;
                return wb.DownloadString(_url);
            }
        }

        static void SecureGenerateKey()
        {
            Console.WriteLine("\nSecureGenerateKey");
            var appId = "XXXX";
            var appKey = "XXXX";

            var form = new NameValueCollection();
            form["appid"] = appId;
            form["appsecure"] = appKey;
            var data = RequestPost("/api/SecureGenerateKey", form);
            if (data == "") return;

            var dic = JsonConvert.DeserializeObject<Dictionary<string, string>>(data);
            if (dic.ContainsKey("Key"))
            {
                AppKey = dic["Key"];
            }

            Console.WriteLine("SecureGenerateKey key = " + AppKey);
        }

        static void GeoRank()
        {
            if (AppKey.Length == 0) return;
            Console.WriteLine("\nGeoRank");

            var form = new Dictionary<string, dynamic>();
            form.Add("key", AppKey);
            var points = new List<Dictionary<string, dynamic>>();
            points.Add(new Dictionary<string, dynamic>()
            {
                { "id","B54125"},
                { "latitude", 41.388722},
                { "longitude", 2.168169}
            });
            form.Add("points", points);

            var data = RequestPost("/api/GeoRank", JsonConvert.SerializeObject(form));
            var dic = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(data);

            foreach (var d in dic)
            {
                Console.WriteLine(d.Key + " => " + Convert.ToString(d.Value));
            }
        }

        static void HeatMapTiles()
        {
            if (AppKey.Length == 0) return;
            Console.WriteLine("\nHeatMapTiles");

            var form = new NameValueCollection();
            form["key"] = AppKey;
            form["x"] = "16581";
            form["y"] = "16581";
            form["z"] = "15";
            form["v"] = "02";
            form["o"] = "0.3";
            form["t"] = "sights";
            form["s"] = "mgl";

            var data = RequestGet("/api/HeatMapTiles", form);
            var dic = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(data);

            foreach (var d in dic)
            {
                Console.WriteLine(d.Key + " => " + Convert.ToString(d.Value));
            }
        }

        static void HeatMapVectorsGet()
        {
            if (AppKey.Length == 0) return;
            Console.WriteLine("\nHeatMapVectorsGet");

            var form = new NameValueCollection();
            form["key"] = AppKey;
            form["tile"] = "518_352";
            form["level"] = "2";
            form["category"] = "vrestaurant";
            form["format"] = "app";

            var data = RequestGet("/api/HeatMapVectors", form);
            var dic = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(data);

            foreach (var d in dic)
            {
                Console.WriteLine(d.Key + " => " + JsonConvert.SerializeObject(d.Value));
            }
        }

        static void HeatMapVectorsPost()
        {
            if (AppKey.Length == 0) return;
            Console.WriteLine("\nHeatMapVectorsPost");

            var form = new Dictionary<string, dynamic>();
            form.Add("key", AppKey);
            form.Add("tile", "518_352");
            form.Add("level", "2");
            form.Add("category", "vrestaurant");
            form.Add("format", "app");

            var data = RequestPost("/api/HeatMapVectors", JsonConvert.SerializeObject(form));
            var dic = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(data);

            foreach (var d in dic)
            {
                Console.WriteLine(d.Key + " => " + JsonConvert.SerializeObject(d.Value));
            }
        }

        static void LocationScorePost()
        {
            if (AppKey.Length == 0) return;
            Console.WriteLine("\nLocationScorePost");

            var form = new Dictionary<string, dynamic>();
            form.Add("key", AppKey);
            form.Add("language", "en");
            form.Add("type", "ranktop3");

            var points = new List<Dictionary<string, dynamic>>();
            points.Add(new Dictionary<string, dynamic>()
            {
                { "id","B54125"},
                { "latitude", 41.388722},
                { "longitude", 2.168169}
            });
            form.Add("points", points);

            var data = RequestPost("/api/LocationScore", JsonConvert.SerializeObject(form));
            var dic = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(data);

            foreach (var d in dic)
            {
                Console.WriteLine(d.Key + " => " + JsonConvert.SerializeObject(d.Value));
            }
        }

        static void POIGet()
        {
            if (AppKey.Length == 0) return;
            Console.WriteLine("\nPOIGet");


            var form = new NameValueCollection();
            form["key"] = AppKey;
            form["north"] = "41.397158";
            form["west"] = "2.160873";
            form["south"] = "41.394582";
            form["east"] = "2.177181";

            var data = RequestGet("/api/POI", form);
            var dic = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(data);

            foreach (var d in dic)
            {
                Console.WriteLine(d.Key + " => " + JsonConvert.SerializeObject(d.Value));
            }

        }

        static void POIPost()
        {
            if (AppKey.Length == 0) return;
            Console.WriteLine("\nPOIPost");

            var form = new NameValueCollection();
            form["key"] = AppKey;
            form["north"] = "41.397158";
            form["west"] = "2.160873";
            form["south"] = "41.394582";
            form["east"] = "2.177181";

            var data = RequestPost("/api/POI", form);
            var dic = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(data);

            foreach (var d in dic)
            {
                Console.WriteLine(d.Key + " => " + JsonConvert.SerializeObject(d.Value));
            }
        }


        static void TransportGet()
        {
            if (AppKey.Length == 0) return;
            Console.WriteLine("\nTransportGet");

            var form = new NameValueCollection();
            form["key"] = AppKey;
            form["latitude"] = "41.388722";
            form["longitude"] = "2.168169";

            var data = RequestGet("/api/Transport", form);
            var dic = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(data);

            foreach (var d in dic)
            {
                Console.WriteLine(d.Key + " => " + JsonConvert.SerializeObject(d.Value));
            }
        }

    }
}
