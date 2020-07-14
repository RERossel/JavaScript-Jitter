//console.log('Hello JavaScript');
var canvas1 = document.getElementById("myCanvas1");
var canvas2 = document.getElementById("myCanvas2");
var precision  = document.getElementById("myPrecisionSlider");
var accuracy  = document.getElementById("myAccuracySlider");
//var button  = document.getElementById("myButton");
//button.addEventListener("click", buttonAction);

//console.log(canvas);

// Save context in a variable: "Magic Paintbrush".
var c1 = canvas1.getContext('2d');
var c2 = canvas2.getContext('2d');


var riseTime = 20;

// Treat a function as a JavaScript Object.
function RisingEdge(x)
{
  
  this.x = x
  this.alpha = 1.0; //1.0;
  this.jitter1 = (Math.random()-0.5) * precision.value * 5;
  this.jitter2 = (Math.random()-0.5) * precision.value * 5;
  
  
  // Defining an anonymous function.
  this.draw = function()
  {
    // Line path
    c2.beginPath();
    
    c2.strokeStyle = 'rgba(0, 0, 0, ' + this.alpha + ' )';
    c2.lineCap = "round";
    c2.lineWidth = 5;
    
    c2.moveTo(50, 200);
    c2.lineTo(this.x + this.jitter1, 200);
    c2.lineTo(this.x + riseTime + this.jitter1, 50);
    c2.lineTo(450, 50);
    
    c2.stroke();
            
  }
  
  this.update = function()
  {
    this.draw();
    this.alpha = this.alpha * 0.91; // - 0.02; // * 0.92;
    if (this.alpha<0.001) {this.alpha=0};
  }
  
  this.getAlpha = function()
  {
    return this.alpha;
  }
  
}


// Treat a function as a JavaScript Object.
function Impact(x, y)
{
  
  this.x = x;
  this.y = y;
  this.radius = 5;
  this.sAngle = 0;
  this.eAngle = 2*Math.PI;
  
  this.alpha = 1.0; //1.0;
  this.jitterX = (Math.random()-0.5) * precision.value * 5;
  this.jitterY = (Math.random()-0.5) * precision.value * 5;
  
  
  // Defining an anonymous function.
  this.draw = function()
  {
    // Line path
    c1.beginPath();
    c1.strokeStyle = 'rgba(  0,   0,   0, ' + this.alpha + ' )';
    c1.fillStyle   = 'rgba(255, 255, 255, ' + this.alpha + ' )';
    c1.arc(this.x+this.jitterX, this.y+this.jitterY, 5, this.sAngle, this.eAngle);
    c1.stroke();
    c1.fill();
            
  }
  
  this.update = function()
  {
    this.draw();
    this.alpha = this.alpha * 0.91; // - 0.02; // * 0.92;
    if (this.alpha<0.001) {this.alpha=0};
  }
  
  this.getAlpha = function()
  {
    return this.alpha;
  }
  
}



var buttonState = false;
//button.value = "Rise time NOT shown.";

function buttonAction()
{
  //console.log("Button clicked! State: " + buttonState);
  buttonState = !buttonState;
  if (buttonState == false)
  {
    button.value = "Rise time NOT shown.";
  }
  else
  {
    button.value = "Rise time shown.";
  }
}


function drawJitter()
{
  var maxJitter = (1.0-0.5) * precision.value * 5;
  c2.beginPath();
  c2.strokeStyle = 'rgba(191, 0, 0, 1 )';
  c2.lineCap = "round";
  c2.lineWidth = 3;
  c2.moveTo(canvas2.width/2+Number(accuracy.value)*10 - maxJitter, 220);
  if (buttonState == false) {
    c2.lineTo(canvas2.width/2+Number(accuracy.value)*10 + /*riseTime*/ + maxJitter, 220);    
  } else {
    c2.lineTo(canvas2.width/2+Number(accuracy.value)*10 + riseTime + maxJitter, 220);
  }
  c2.moveTo(canvas2.width/2+Number(accuracy.value)*10 - maxJitter, 210);
  c2.lineTo(canvas2.width/2+Number(accuracy.value)*10 - maxJitter, 230);
  if (buttonState == false) {
    c2.moveTo(canvas2.width/2+Number(accuracy.value)*10 + /*riseTime*/ + maxJitter, 210);
    c2.lineTo(canvas2.width/2+Number(accuracy.value)*10 + /*riseTime*/ + maxJitter, 230);
  } else {
    c2.moveTo(canvas2.width/2+Number(accuracy.value)*10 + riseTime + maxJitter, 210);
    c2.lineTo(canvas2.width/2+Number(accuracy.value)*10 + riseTime + maxJitter, 230);
  }

  c2.stroke();
  
  if (buttonState == true)
  {
	  c2.beginPath();
	  c2.strokeStyle = 'rgba(  0,   0, 191, 1 )';
	  c2.lineCap = "round";
	  c2.lineWidth = 3;
	  //c2.moveTo(canvas2.width/2+Number(accuracy.value)*10 + maxJitter, 210);
	  //c2.lineTo(canvas2.width/2+Number(accuracy.value)*10 + maxJitter, 230);
	  c2.moveTo(canvas2.width/2+Number(accuracy.value)*10 + maxJitter, 220);
	  c2.lineTo(canvas2.width/2+Number(accuracy.value)*10 + riseTime + maxJitter, 220);
	  c2.moveTo(canvas2.width/2+Number(accuracy.value)*10 + riseTime + maxJitter, 210);
	  c2.lineTo(canvas2.width/2+Number(accuracy.value)*10 + riseTime + maxJitter, 230);
	  c2.stroke();
  }
  
  
  
  c2.beginPath();
  c2.moveTo(canvas2.width/2, 20);
  c2.lineTo(canvas2.width/2, canvas2.height-70);
  c2.strokeStyle = 'rgba(  0,   0, 191, 0.5 )';
  c2.save();
  c2.setLineDash([5, 15]);
  c2.stroke();
  c2.restore();
  
}


function drawBullseye()
{
  //console.log(c1);
  
  x = canvas1.width/2;
  y = canvas1.height/2;
  radius = 140;
  sAngle = 0;
  eAngle = 2*Math.PI;
  
  //console.log(x);
  //console.log(y);
  
  c1.strokeStyle = 'rgba(  0,   0,   0, 1 )';
  c1.fillStyle   = 'rgba(255, 255, 255, 1 )';
  c1.beginPath();
  c1.arc(x, y, radius, sAngle, eAngle);
  c1.stroke();
  c1.fill();

  c1.strokeStyle = 'rgba(  0,   0,   0, 1 )';
  c1.fillStyle   = 'rgba(255, 255, 255, 1 )';
  c1.beginPath();
  c1.arc(x, y, radius-(radius*0.1), sAngle, eAngle);
  c1.stroke();
  c1.fill();

  c1.strokeStyle = 'rgba(255, 255, 255, 1 )';
  c1.fillStyle   = 'rgba(  0,   0,   0, 1 )';
  c1.beginPath();
  c1.arc(x, y, radius-(radius*0.2), sAngle, eAngle);
  c1.stroke();
  c1.fill();

  c1.strokeStyle = 'rgba(255, 255, 255, 1 )';
  c1.fillStyle   = 'rgba(  0,   0,   0, 1 )';
  c1.beginPath();
  c1.arc(x, y, radius-(radius*0.3), sAngle, eAngle);
  c1.stroke();
  c1.fill();

  c1.strokeStyle = 'rgba(  0,   0,   0, 1 )';
  c1.fillStyle   = 'rgba( 61, 164, 241, 1 )';
  c1.beginPath();
  c1.arc(x, y, radius-(radius*0.4), sAngle, eAngle);
  c1.stroke();
  c1.fill();

  c1.strokeStyle = 'rgba(  0,   0,   0, 1 )';
  c1.fillStyle   = 'rgba( 61, 164, 241, 1 )';
  c1.beginPath();
  c1.arc(x, y, radius-(radius*0.5), sAngle, eAngle);
  c1.stroke();
  c1.fill();

  c1.strokeStyle = 'rgba(  0,   0,   0, 1 )';
  c1.fillStyle   = 'rgba(220,  24,  48, 1 )';
  c1.beginPath();
  c1.arc(x, y, radius-(radius*0.6), sAngle, eAngle);
  c1.stroke();
  c1.fill();

  c1.strokeStyle = 'rgba(  0,   0,   0, 1 )';
  c1.fillStyle   = 'rgba(220,  24,  48, 1 )';
  c1.beginPath();
  c1.arc(x, y, radius-(radius*0.7), sAngle, eAngle);
  c1.stroke();
  c1.fill();
  
  c1.strokeStyle = 'rgba(  0,   0,   0, 1 )';
  c1.fillStyle   = 'rgba(247, 218,  33, 1 )';
  c1.beginPath();
  c1.arc(x, y, radius-(radius*0.8), sAngle, eAngle);
  c1.stroke();
  c1.fill();

  c1.strokeStyle = 'rgba(  0,   0,   0, 1 )';
  c1.fillStyle   = 'rgba(247, 218,  33, 1 )';
  c1.beginPath();
  c1.arc(x, y, radius-(radius*0.9), sAngle, eAngle);
  c1.stroke();
  c1.fill();

  c1.strokeStyle = 'rgba(  0,   0,   0, 1 )';
  c1.fillStyle   = 'rgba(  0,   0,   0, 1 )';
  c1.beginPath();
  c1.arc(x, y, 2, sAngle, eAngle);
  c1.stroke();
  c1.fill();
  
}


var risingEdges = [];
var impacts = [];

var d = new Date();
var nowMilliseconds = 0;
var prvMilliseconds = 0;
var diff = 0;
var diffSums = 0;

// Main animation loop
function animate()
{
  
  // Logging the time betweetn frames
  prvMilliseconds = nowMilliseconds;
  nowMilliseconds = new Date().getMilliseconds();
  
  if (nowMilliseconds < prvMilliseconds)
  {
    diff = 1000 + nowMilliseconds - prvMilliseconds;
  }
  else
  {
    diff = nowMilliseconds - prvMilliseconds;
  }
  
  diffSums = diffSums + diff;
  
  
  // Start animation.
  requestAnimationFrame(animate);
  c2.clearRect( 0, 0, innerWidth, innerHeight);
  c1.clearRect( 0, 0, innerWidth, innerHeight);
  
  drawJitter();
  drawBullseye();
  
  // Add a new rising edge every 50 ms.
  if (diffSums > 50)
  {
    //console.log(canvas2.width/2);
    //console.log(typeof(canvas2.width));
    //console.log(typeof(canvas2.width/2));
    //console.log(accuracy.value);
    //console.log(typeof(accuracy.value));
    //console.log(typeof(Number(accuracy.valu)));
    //console.log((canvas2.width/2)+accuracy.value);
    risingEdges.unshift(new RisingEdge(canvas2.width/2+Number(accuracy.value)*10));
    impacts.unshift(new Impact(canvas1.width/2+Number(accuracy.value)*10, 150));
    diffSums = 0;
  }
  
  //console.log(risingEdges.length);
  
  // Go through the array of rising edges and call their update method.
  for (var i = 0; i <= risingEdges.length - 1; i++)
  {
    risingEdges[i].update();
    // If a rising edge has faded away, delete it from the array.
    if (risingEdges[i].getAlpha() <= 0)
    {
      risingEdges.pop();
    }
  }
  
  for (var i = 0; i <= impacts.length - 1; i++)
  {
    impacts[i].update();
    // If an impact has faded away, delete it from the array.
    if (impacts[i].getAlpha() <= 0)
    {
      impacts.pop();
    }
  }
  
  // Print the current jitter value obtained from the precision slider.
  var emoji = 0x1F354
  switch (Number(precision.value)) {
    case 4:
      emoji = 0x1F62C
      break;
    default:
      emoji = 0x1F62B;
  }
  //String.fromCodePoint(emoji)
  c2.font = "25px Arial";
  c2.textAlign = "center";
  c2.fillText("Precision (Jitter) value: " + precision.value, 250, 260);
  c2.fillText("Accuracy value: " + accuracy.value, 250, 290);
  
}

animate();