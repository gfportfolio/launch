var totalImages = 18;//0 index
var circleRadius = 300;
var littleCircleDiameter = 100
var divider = 3;
var totalCirclesOnScreen = 5;
var currentImageCounter = 0;
var largeImage = "photoalbum/blank.jpg";
var largeImageIndex = -1;
var circles;
var centerPositionX;
var centerPositionY;
var bigCircle;
var bigCircleImage;
var directionForward = true;
var imageArray;
var paused = false;
var setup = false;
var circleModel;
var pauseButton;
var nextButton;
var backButton;

var setupPhotoWheel = function () {
  circleModel = document.getElementById('circle-model');
  var circleHolder = document.getElementById('circles-holder');
  var style = document.getElementById('style-tag');
  var genBox = document.getElementById('gen-box');
  backButton = document.getElementById('back');
  nextButton = document.getElementById('next');
  pauseButton = document.getElementById('pause');
  style.innerHTML += "  #back:hover{opacity: .8;cursor:pointer;} #next:hover{opacity: .8;cursor:pointer;}    #pause:hover{opacity: .8;cursor:pointer;}";
  bigCircleImage = document.getElementById('big-circle-img');
  bigCircle = document.getElementById('big-circle');
  circleModel.childNodes[0].src = "photoalbum/blank_blue.jpg";
  circleModel.childNodes[0].className = "small-circle";
  circleModel.className = "small-circle";
  bigCircle.className = 'big-circle';
  bigCircleImage.className = 'big-circle';
  bigCircleImage.src = "photoalbum/blank_blue.jpg";
  circles = new Array();
  preloadImages();
  makecircles(circleModel, circleHolder);
  resize();
  $("#circle-model").hide();
  setup=true;
  startAnimation();
};

function resize(){
 var height = window.innerHeight / 2
  var width = window.innerWidth / 2;
  littleCircleDiameter = circles[0].elem.offsetWidth;
  circleRadius = bigCircle.offsetWidth / 2 + littleCircleDiameter / 2 ;
  var actionButtonRadius = height;
  centerPositionX = width - littleCircleDiameter / 2;
  centerPositionY = height - littleCircleDiameter / 2;
  bigCircle.style.left = centerPositionX - circleRadius  + littleCircleDiameter;
  bigCircle.style.top = centerPositionY - circleRadius  +littleCircleDiameter;
  var buttonSize = pauseButton.offsetHeight;
  var buttonsY = actionButtonRadius/2;
  pauseButton.style.left = actionButtonRadius/2 -buttonSize/2;
  pauseButton.style.top = buttonsY-buttonSize/2;
  nextButton.style.top = buttonsY -buttonSize/2;
  nextButton.style.left = actionButtonRadius/2 + actionButtonRadius/2 * .75-buttonSize/2;
  backButton.style.top = buttonsY -buttonSize/2;
  backButton.style.left = actionButtonRadius/2 - actionButtonRadius/2 * .75 -buttonSize/2; 
}

function preloadImages() {
  imageArray = new Array();
  while (imageArray.length <= totalImages) {
    var img = new Image();
    img.src = "photoalbum/" + (imageArray.length) + ".jpg";
    imageArray.push(img);
  }

}

function makecircles(model, circleHolder) {
  while (circles.length < totalCirclesOnScreen) {
    var clone = model.cloneNode(true);
    var index = parseInt(circles.length);
    clone.id = "circle-" + (index + 1);
    clone.childNodes[0].id = "circle-img-" + (index + 1);
    circleHolder.appendChild(clone);
    circles.push({
      elem: clone,
      degree: 0,
      changeimage: true,
      assignImg: true,
      faded: true,
      active: false,
      imgsrc: "photoalbum/blank_blue.jpg",
      imgIndex: -1,
      context: $("#circle-img-" + (index + 1))
    });
  }
}

function startAnimation() {
  currentImageCounter = 0
  var startingDegree = 88;
  var differenceBetweenCircles = 360 / totalCirclesOnScreen;
  for (var i = 0; i < circles.length; i++) {
    var currentDegree = startingDegree + i * differenceBetweenCircles;
    circles[i].degree = currentDegree;
    if (currentDegree > 90) {
      circles[i].changeimage = false;
      circles[i].assignImg = false;
    }
  }
  window.requestAnimationFrame(animation);

}

function animation() {
  for (var i = 0; i <= circles.length - 1; i++) {
    if (directionForward) {
      forwardAnimation(i);
    }
    else {
      backwardAnimation(i);
    }
    var radians = circles[i].degree * (Math.PI / 180);
    var x = centerPositionX + circleRadius * Math.cos(radians);
    var y = centerPositionY + circleRadius * Math.sin(radians);
    circles[i].elem.style.left = x;
    circles[i].elem.style.top = y;
    highlightSelected(i);
  }
  if (!paused) {
    window.requestAnimationFrame(animation);
  }
}


function forwardAnimation(index) {
  circles[index].degree = circles[index].degree + 1 / divider;

  if (circles[index].degree >= 360) {
    circles[index].degree -= 360;
    circles[index].changeimage = true;
  }

  if (circles[index].degree >= 60 && !circles[index].faded && circles[index].changeimage) {
    circles[index].context.fadeOut(2000)
    circles[index].faded = true;
  }

  if (circles[index].degree >= 90 && circles[index].changeimage) {
    circles[index].context.attr('src', imageArray[currentImageCounter].src);
    circles[index].imgIndex = currentImageCounter;
    circles[index].imgsrc = 'photoalbum/' + currentImageCounter + '.jpg';
    circles[index].context.className += " img";
    imgcountIncrement();
    circles[index].changeimage = false;
    circles[index].active = true;
  }
  if (circles[index].degree >= 180 && circles[index].degree <= 182 && circles[index].active) {
    circles[index].assignImg = true;
  }
  if (circles[index].degree >= 95 && circles[index].faded && !circles[index].changeimage) {
    circles[index].context.fadeIn(2000)
    circles[index].faded = false;
  }

  if (circles[index].degree >= 270 && circles[index].assignImg) {
    largeImage = imageArray[circles[index].imgIndex].src;
    $("#big-circle-img").fadeOut('slow', function () {
      bigCircleImage.src = largeImage;
      $("#big-circle-img").fadeIn('slow');
    });
    circles[index].assignImg = false;
    largeImageIndex = index;
  }
}

function backwardAnimation(index) {
  circles[index].degree = circles[index].degree - 1 / divider;
  if (circles[index].degree <= 0) {
    circles[index].degree += 360;
    circles[index].assignImg = true;
  }
  if (circles[index].degree <= 115 && circles[index].degree >= 110) {
    circles[index].changeimage = true;
  }
  if (circles[index].degree <= 85 && circles[index].faded && !circles[index].changeimage) {
    circles[index].context.fadeIn(2000)
    circles[index].faded = false;
  }
  if (circles[index].degree <= 110 && circles[index].degree >= 90 && !circles[index].faded && circles[index].changeimage) {
    circles[index].context.fadeOut(2000)
    circles[index].faded = true;
  }
  if (circles[index].degree <= 90 && circles[index].changeimage) {
    circles[index].context.attr('src', imageArray[currentImageCounter].src);
    circles[index].imgIndex = currentImageCounter;
    circles[index].context.className += " img";
    circles[index].imgsrc = 'photoalbum/' + currentImageCounter + '.jpg';
    imgcountIncrement();
    circles[index].changeimage = false;

  }
  if (circles[index].degree <= 270 && circles[index].assignImg) {
    largeImage = imageArray[circles[index].imgIndex].src;
    $("#big-circle-img").fadeOut('slow', function () {
      bigCircleImage.src = largeImage;
      $("#big-circle-img").fadeIn('slow');
    });
    circles[index].assignImg = false;
    largeImageIndex = index;
  }
}

function highlightSelected(index) {
  if (largeImageIndex >= 0) {
    if (index === largeImageIndex && !circles[index].elem.className.includes("selected")) {
      circles[index].elem.className += " selected";
    }
    else if (index !== largeImageIndex) {
      circles[index].elem.className = "small-circle";
    }
  }

}


function imgcountIncrement() {
  if (directionForward) {
    currentImageCounter++;
    if (currentImageCounter > totalImages) {
      currentImageCounter = 0;
    }
  }
  else {
    currentImageCounter--;
    if (currentImageCounter < 0) {
      currentImageCounter = totalImages;
    }
  }

}
function backClick() {
  directionForward = false;
};
function nextClick() {
  directionForward = true;
};
function pauseClick() {
  paused = !paused;
  if (!paused) {
    animation();
  }
};


//setup();
function startPhotowheel(){
  setupPhotoWheel();
}

window.addEventListener("resize",function(){
  if(setup){
    resize();
  }
});
