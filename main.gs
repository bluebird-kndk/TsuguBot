function randomPost(){
  var rand = Math.round(random(0,2));
  if(rand == 0){
    postMapData();
  }else if(rand == 1){
    postStreetView();
  }else if(rand == 2){    
    postMessage();
  }
}

function uploadImageToSlack(image,option){
  var slackApp = SlackApp.create(SLACK_API_TOKEN);
  
  var result = slackApp.filesUpload(image, option)  
  Logger.log(result);
}

function postMessage(){
  var sheet = getSpreadSheet("テキスト");
  
  var lastRow = sheet.getLastRow();
  
  var index = random(1,lastRow);
    
  var message = sheet.getRange(index, 1).getValue();
  
  var slackApp = SlackApp.create(SLACK_API_TOKEN);
  // 対象チャンネル
  var channelId = "#西荻窪";
  slackApp.postMessage(channelId, message);
}