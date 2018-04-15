function postMapData(){
  var image = createMapImage();
  var option = createMapOption();
  
  uploadImage(image,option);
}

function postStreetView(){
  var image = createStreetView();
  var option = createMapOption();
  
  uploadImage(image,option);
}

function createMapImage(){
  var place = getRandomPos("map");
  
  var header = "https://maps.googleapis.com/maps/api/staticmap";
  var mapCenter = "?center=" + place;
  var mapZoom = "&zoom=" + Math.round(random(15,20));
  var imgSize = "&size=" + "600" + "x" + "600";
  var mapType = "&maptype=" + "roadmap";
  var decoration =  "&markers=color:red%7C" + place;
  var key = "&key=" + MAP_API_KEY;
  
  var mapRequest = header + mapCenter + mapZoom + imgSize + mapType + decoration + key;

  Logger.log(mapRequest);
  
  var mapImage = UrlFetchApp.fetch(mapRequest).getBlob();
  return mapImage;
}

function createMapOption() {
    var option={
     "content": "test" ,
     "content_type": "post",
     "title" : "ここにはいません",
     "channels": "西荻窪",
     "filetype": "txt",
     "mode": "snippet"
  };
  
  return option;
}
  
function createStreetView(){
  var place = getRandomPos("streetView");
  
  var header = "https://maps.googleapis.com/maps/api/streetview";
  var imgSize = "?size=" + "600" + "x" + "600";
  var location = "&location=" + place;
  var key = "&key=" + MAP_API_KEY;
  
  var placeRequest = header + imgSize + location + key;
  
  
  Logger.log(placeRequest);
  
  var placeImage = UrlFetchApp.fetch(placeRequest).getBlob();
  return placeImage;
}

// ランダムに座標データを生成して返す
function getRandomPos(type){
  var sheet = getSpreadSheet("場所");
  
  var pos = "西荻窪";  

  // ストリートビュー時のみ低確率で軍艦島出す
  if(type == "streetView"){  
    var rand = Math.round(random(0,10));
    if(rand == 9){
      pos = "軍艦島";
    }else if(rand == 10){
      pos = "軍艦島2";
    }
  }
  
  var tgtRow = searchRow(sheet,pos);
  
  var topLeft = sheet.getRange(tgtRow, 3).getValue().split(",");
  var btmRight = sheet.getRange(tgtRow, 4).getValue().split(",");
  
  // 緯度経度をランダム設定
  var longitude = random(topLeft[0],btmRight[0]);
  var latitude = random(topLeft[1],btmRight[1]);
  
  var position = longitude + "," + latitude;

  // ログ出力
  var time = Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy/MM/dd HH:mm:ss");
  var log = [time,position];
  getSpreadSheet("出力地点ログ").appendRow(log);
    
  return position;
}
