var totalImages=15;//0 index
var circleRadius =300;
var littleCircleDiameter =100
var speed=4;
var divider =25;
var totalCirclesOnScreen=5;
var currentImageCounter =0;
var largeImage ="photoalbum/blank.jpg";
  var circles;
  var centerPositionX;
  var centerPositionY;
     var bigCircle;
var setup = function(){
  var circleModel = document.getElementById('circle-model');
  var circleHolder = document.getElementById('circles-holder');
  bigCircle = document.getElementById('big-circle');
  var genBox = document.getElementById('genbox');
  circles= new Array();
  var height = window.innerHeight;
  var width =window.innerWidth;
  centerPositionX = width/2;
  centerPositionY = height/2;
  bigCircle.style.left = centerPositionX-circleRadius+littleCircleDiameter+5;
  bigCircle.style.top = centerPositionY-circleRadius+littleCircleDiameter+5;

  makecircles(circleModel,  circleHolder);
  startAnimation();
};

function makecircles(model, circleHolder){
  while(circles.length<totalCirclesOnScreen){
    var clone = model.cloneNode(true);
    var index=parseInt(circles.length);
    clone.id="circle-"+index+1;
    circleHolder.appendChild(clone);
    circles.push({elem:clone, degree:0, changeimage:true, assignImg:true});
  }
}

function startAnimation(){
  currentImageCounter =0
  var startingDegree = 88;
  var differenceBetweenCircles = 360/totalCirclesOnScreen;
  for(var i=0; i <circles.length; i++ ){
    var currentDegree = startingDegree+i*differenceBetweenCircles;
    circles[i].degree=currentDegree;
    if(currentDegree>90){
      circles[i].changeimage = false;
      circles[i].assignImg = false;
    }
  }

  setInterval(animation, speed);

}

function animation(){
  for(var i=0; i <=circles.length-1; i++ ){
     circles[i].degree = circles[i].degree+1/divider;
    if(circles[i].degree>=360){
      circles[i].degree-=360;
      circles[i].changeimage = true;
      circles[i].assignImg =true;
    }
    if(circles[i].degree>=90 && circles[i].changeimage==true){
      circles[i].elem.childNodes[0].src='photoalbum/'+currentImageCounter+'.jpg';
      circles[i].elem.childNodes[0].className += " img";
      imgcountIncrement();
      circles[i].changeimage =false;

    }
    if(circles[i].degree>=245 && circles[i].assignImg==true){
      largeImage =circles[i].elem.childNodes[0].src;
      $("#big-circle-img").fadeOut('slow',function(){
        bigCircle.childNodes[0].src = largeImage;
        $("#big-circle-img").fadeIn('slow');
      });
      circles[i].assignImg =false;
    }
    var radians = circles[i].degree* (Math.PI / 180);
    var x = centerPositionX+circleRadius*Math.cos(radians);
    var y = centerPositionY+circleRadius*Math.sin(radians);
    circles[i].elem.style.left=x;
    circles[i].elem.style.top=y;
  }
}

function imgcountIncrement(){
  currentImageCounter++;
  if(currentImageCounter>totalImages){
    currentImageCounter=0;
  }

}



setup();
