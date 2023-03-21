const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);

document.getElementById("info").innerHTML = urlParams.get("text_title");
verses = urlParams.get("text_verse");
var mapObj = {
  0:"⁰",
  1:"¹",
  2:"²",
  3:"³",
  4:"⁴",
  5:"⁵",
  6:"⁶",
  7:"⁷",
  8:"⁸",
  9:"⁹",
};
verses = verses.replace(/1|2|3|4|5|6|7|8|9|0/gi, function(matched){
  return mapObj[matched];
});
document.getElementById("verse").innerHTML = verses;