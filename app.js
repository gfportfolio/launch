//import {default as writeChar, writeSimpleChar, handleChar} from './lib/writeChar';

var consoleArea ;
var style;

setup = function(){
  setupAreas();
  startAnimation();

}

setupAreas = function(){
  consoleArea = document.getElementById('console-area')
  style = document.getElementById('style-tag');
  progskills = document.getElementById('prog-skills');
}

startAnimation = function(){
  var xhttp = new XMLHttpRequest();
  ajaxAsync("http://localhost:8082/texts/story1.css").then(function(result){
      writeTo(consoleArea, result, 0,0,true,1);
  })

}

ajaxAsync =function (url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(this.responseText);
    };
    xhr.onerror = reject;
    xhr.open('GET', url);
    xhr.send();
  });
}

setup();
 //colors
// #7384FF
// #FFB45E
// #FFD25E
