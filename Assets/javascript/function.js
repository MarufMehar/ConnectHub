export function getTimeStamp(){
  return Date.now();
}

export function randomid() {
  var randomTxt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 4; i++) {
    randomTxt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return getTimeStamp() + "_" + randomTxt;
}