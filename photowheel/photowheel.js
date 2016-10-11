var totalImages=15;//0 index
var circleRadius =300;
var littleCircleDiameter =100
var divider =3;
var totalCirclesOnScreen=5;
var currentImageCounter =0;
var largeImage ="photoalbum/blank.jpg";
var largeImageIndex = -1;
var circles;
var centerPositionX;
var centerPositionY;
var bigCircle;
var bigCircleImage;
var directionForward=true;

var setup = function(){
  var circleModel = document.getElementById('circle-model');
  var circleHolder = document.getElementById('circles-holder');
  bigCircleImage =document.getElementById('big-circle-img');
  bigCircle = document.getElementById('big-circle');
  var genBox = document.getElementById('gen-box');
  circles= new Array();
  var height = window.innerHeight;
  var width =window.innerWidth;
  centerPositionX = width/2;
  centerPositionY = height/2;
  bigCircle.style.left = centerPositionX-circleRadius+littleCircleDiameter+5;
  bigCircle.style.top = centerPositionY-circleRadius+littleCircleDiameter+5;
  preloadImages();
  makecircles(circleModel,  circleHolder);
  startAnimation();
};

function preloadImages(){
  var preloadImageCount =0;
  while(preloadImageCount<=totalImages){
    var img=new Image();
    img.src="photoalbum/"+preloadImageCount+".jpg";
    preloadImageCount++;
  }

}

function makecircles(model, circleHolder){
  while(circles.length<totalCirclesOnScreen){
    var clone = model.cloneNode(true);
    var index=parseInt(circles.length);
    clone.id="circle-"+(index+1);
    clone.childNodes[0].id="circle-img-"+(index+1);
    circleHolder.appendChild(clone);
    circles.push({elem:clone,
      degree:0,
      changeimage:true,
      assignImg:true,
      faded:true,
      context:$("#circle-img-"+(index+1))});
      active=false;
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
    window.requestAnimationFrame(animation);

  }

  function animation(){
    for(var i=0; i <=circles.length-1; i++ ){
      if(directionForward){
forwardAnimation(i);
      }
      else{
backwardAnimation(i);
      }
      var radians = circles[i].degree* (Math.PI / 180);
      var x = centerPositionX+circleRadius*Math.cos(radians);
      var y = centerPositionY+circleRadius*Math.sin(radians);
      circles[i].elem.style.left=x;
      circles[i].elem.style.top=y;
      highlightSelected(i);
    }
    window.requestAnimationFrame(animation);
  }


function forwardAnimation(index){
  circles[index].degree = circles[index].degree+1/divider;

  if(circles[index].degree>=360){
    circles[index].degree-=360;
    circles[index].changeimage = true;
  }

  if(circles[index].degree>=60&&!circles[index].faded &&circles[index].changeimage){
    circles[index].context.fadeOut(2000)
    circles[index].faded=true;
  }

  if(circles[index].degree>=90 && circles[index].changeimage){
    circles[index].elem.childNodes[0].src='photoalbum/'+currentImageCounter+'.jpg';
    circles[index].elem.childNodes[0].className += " img";
    imgcountIncrement();
    circles[index].changeimage =false;
    circles[index].active=true;
  }
  if(circles[index].degree>=180 && circles[index].degree<=182 &&circles[index].active ){
    circles[index].assignImg = true;
  }
  if(circles[index].degree>=95&&circles[index].faded  && !circles[index].changeimage){
    circles[index].context.fadeIn(2000)
    circles[index].faded =false;
  }

  if(circles[index].degree>=270 && circles[index].assignImg){
    largeImage =circles[index].elem.childNodes[0].src;
    $("#big-circle-img").fadeOut('slow',function(){
      bigCircleImage.src = largeImage;
      $("#big-circle-img").fadeIn('slow');
    });
    circles[index].assignImg =false;
    largeImageIndex = index;
  }
}

function backwardAnimation(index){
  circles[index].degree = circles[index].degree-1/divider;
  if(circles[index].degree<=0){
    circles[index].degree+=360;
    circles[index].assignImg =true;
  }
  if(circles[index].degree<=115 && circles[index].degree>=110){
    circles[index].changeimage = true;
  }
  if(circles[index].degree<=85&&circles[index].faded &&!circles[index].changeimage){
    circles[index].context.fadeIn(2000)
    circles[index].faded=false;
  }
  if(circles[index].degree<=110 &&circles[index].degree>=90&&!circles[index].faded  && circles[index].changeimage){
    circles[index].context.fadeOut(2000)
    circles[index].faded =true;
  }
  if(circles[index].degree<=90 && circles[index].changeimage){
    circles[index].elem.childNodes[0].src='photoalbum/'+currentImageCounter+'.jpg';
    circles[index].elem.childNodes[0].className += " img";
    imgcountIncrement();
    circles[index].changeimage =false;

  }
  if(circles[index].degree<=270 && circles[index].assignImg){
    largeImage =circles[index].elem.childNodes[0].src;
    $("#big-circle-img").fadeOut('slow',function(){
      bigCircleImage.src = largeImage;
      $("#big-circle-img").fadeIn('slow');
    });
    circles[index].assignImg =false;
    largeImageIndex = index;
  }
}

function highlightSelected(index){
  if(largeImageIndex>=0){
      if(index===largeImageIndex && !circles[index].elem.className.includes("selected")){
        circles[index].elem.className += " selected";
      }
      else if(index!==largeImageIndex){
        circles[index].elem.className = "small-circle" ;
      }
    }

}


  function imgcountIncrement(){
    if(directionForward){
      currentImageCounter++;
      if(currentImageCounter>totalImages){
        currentImageCounter=0;
      }
    }
    else{
      currentImageCounter--;
      if(currentImageCounter<0){
        currentImageCounter=totalImages;
      }
    }

  }
  function backClick(){
    directionForward = false;
  };
  function nextClick(){
    directionForward = true;
  };


  setup();
