// プロパティから設定したMAPのAPIキーを取得
var MAP_API_KEY = PropertiesService.getScriptProperties().getProperty("MAP_API_KEY");

// プロパティからSlackのAPIキーを取得
var SLACK_API_TOKEN = PropertiesService.getScriptProperties().getProperty("SLACK_API_TOKEN");

// プロパティから各種データのシートを取得
var SHEET_ID =  PropertiesService.getScriptProperties().getProperty("SHEET_ID");

function random(min,max){
  min = Number(min);
  max = Number(max);
  return Math.random() * (max - min) + min;
}

// 指定したシートを取得する
function getSpreadSheet(sheetName){
  return SpreadsheetApp.openById(SHEET_ID).getSheetByName(sheetName);
}

// 該当の情報が該当シートの何行目にあるかを返す
function searchRow(sheet, key){  
  var header = sheet.getRange(1, 1, sheet.getLastRow(), 1).getValues();
  
  for(var i = 0; i < header.length; i++){
    if(header[i].toString() === key){
       // シートの座標は1,1スタートなので
       return i + 1;
    }
  }
  return -1;
}

function test(){
  var sheet = getSpreadSheet("場所");
  var index = searchRow(sheet,"西荻窪");
  Logger.log(index);
}