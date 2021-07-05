var canvas_bullseye = document.getElementById("canvas_bullseye");
var canvas_waveform = document.getElementById("canvas_wavefrom");

var slider_precision  = document.getElementById("slider_precision");
var slider_accuracy   = document.getElementById("slider_accuracy");
var slider_resolution = document.getElementById("slider_resolution");

var slider_precision_output  = document.getElementById("slider_precision_output");
var slider_accuracy_output   = document.getElementById("slider_accuracy_output");
var slider_resolution_output = document.getElementById("slider_resolution_output");

var context_bullseye  = canvas_bullseye.getContext('2d');
var context_waveform  = canvas_waveform.getContext('2d');


var riseTime = 20;

// Treat a function as a JavaScript Object.
function RisingEdge(x)
{
  
  this.x = x
  this.alpha = 1.0; //1.0;
  this.jitter1 = (Math.random()-0.5) * slider_precision.value * 5;
  this.jitter2 = (Math.random()-0.5) * slider_precision.value * 5;
  
  
  // Defining an anonymous function.
  this.draw = function()
  {
    // Line path
    context_waveform.beginPath();
    
    context_waveform.strokeStyle = 'rgba(0, 0, 0, ' + this.alpha + ' )';
    context_waveform.lineCap = "round";
    context_waveform.lineWidth = 5;
    
    context_waveform.moveTo(50, 200);
    context_waveform.lineTo(this.x + this.jitter1, 200);
    context_waveform.lineTo(this.x + riseTime + this.jitter1, 50);
    context_waveform.lineTo(450, 50);
    
    context_waveform.stroke();
            
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
  this.jitterX = (Math.random()-0.5) * slider_precision.value * 5;
  this.jitterY = (Math.random()-0.5) * slider_precision.value * 5;
  
  
  // Defining an anonymous function.
  this.draw = function()
  {
    // Line path
    context_bullseye.beginPath();
    context_bullseye.strokeStyle = 'rgba(  0,   0,   0, ' + this.alpha + ' )';
    context_bullseye.fillStyle   = 'rgba(255, 255, 255, ' + this.alpha + ' )';
    context_bullseye.arc(this.x+this.jitterX, this.y+this.jitterY, 5, this.sAngle, this.eAngle);
    context_bullseye.stroke();
    context_bullseye.fill();
            
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
  var maxJitter = (1.0-0.5) * slider_precision.value * 5;
  context_waveform.beginPath();
  context_waveform.strokeStyle = 'rgba(191, 0, 0, 1 )';
  context_waveform.lineCap = "round";
  context_waveform.lineWidth = 3;
  context_waveform.moveTo(canvas_waveform.width/2+Number(slider_accuracy.value)*10 - maxJitter, 220);
  if (buttonState == false) {
    context_waveform.lineTo(canvas_waveform.width/2+Number(slider_accuracy.value)*10 + /*riseTime*/ + maxJitter, 220);    
  } else {
    context_waveform.lineTo(canvas_waveform.width/2+Number(slider_accuracy.value)*10 + riseTime + maxJitter, 220);
  }
  context_waveform.moveTo(canvas_waveform.width/2+Number(slider_accuracy.value)*10 - maxJitter, 210);
  context_waveform.lineTo(canvas_waveform.width/2+Number(slider_accuracy.value)*10 - maxJitter, 230);
  if (buttonState == false) {
    context_waveform.moveTo(canvas_waveform.width/2+Number(slider_accuracy.value)*10 + /*riseTime*/ + maxJitter, 210);
    context_waveform.lineTo(canvas_waveform.width/2+Number(slider_accuracy.value)*10 + /*riseTime*/ + maxJitter, 230);
  } else {
    context_waveform.moveTo(canvas_waveform.width/2+Number(slider_accuracy.value)*10 + riseTime + maxJitter, 210);
    context_waveform.lineTo(canvas_waveform.width/2+Number(slider_accuracy.value)*10 + riseTime + maxJitter, 230);
  }

  context_waveform.stroke();
  
  if (buttonState == true)
  {
	  context_waveform.beginPath();
	  context_waveform.strokeStyle = 'rgba(  0,   0, 191, 1 )';
	  context_waveform.lineCap = "round";
	  context_waveform.lineWidth = 3;
	  //c2.moveTo(canvas2.width/2+Number(accuracy.value)*10 + maxJitter, 210);
	  //c2.lineTo(canvas2.width/2+Number(accuracy.value)*10 + maxJitter, 230);
	  context_waveform.moveTo(canvas_waveform.width/2+Number(slider_accuracy.value)*10 + maxJitter, 220);
	  context_waveform.lineTo(canvas_waveform.width/2+Number(slider_accuracy.value)*10 + riseTime + maxJitter, 220);
	  context_waveform.moveTo(canvas_waveform.width/2+Number(slider_accuracy.value)*10 + riseTime + maxJitter, 210);
	  context_waveform.lineTo(canvas_waveform.width/2+Number(slider_accuracy.value)*10 + riseTime + maxJitter, 230);
	  context_waveform.stroke();
  }
  
  
  
  context_waveform.beginPath();
  context_waveform.moveTo(canvas_waveform.width/2, 20);
  context_waveform.lineTo(canvas_waveform.width/2, canvas_waveform.height-70);
  context_waveform.strokeStyle = 'rgba(  0,   0, 191, 0.5 )';
  context_waveform.save();
  context_waveform.setLineDash([5, 15]);
  context_waveform.stroke();
  context_waveform.restore();
  
}


function drawBullseye()
{
  //console.log(c1);
  
  x = canvas_bullseye.width/2;
  y = canvas_bullseye.height/2;
  radius = 140;
  sAngle = 0;
  eAngle = 2*Math.PI;
  
  //console.log(x);
  //console.log(y);
  
  context_bullseye.strokeStyle = 'rgba(  0,   0,   0, 1 )';
  context_bullseye.fillStyle   = 'rgba(255, 255, 255, 1 )';
  context_bullseye.beginPath();
  context_bullseye.arc(x, y, radius, sAngle, eAngle);
  context_bullseye.stroke();
  context_bullseye.fill();

  context_bullseye.strokeStyle = 'rgba(  0,   0,   0, 1 )';
  context_bullseye.fillStyle   = 'rgba(255, 255, 255, 1 )';
  context_bullseye.beginPath();
  context_bullseye.arc(x, y, radius-(radius*0.1), sAngle, eAngle);
  context_bullseye.stroke();
  context_bullseye.fill();

  context_bullseye.strokeStyle = 'rgba(255, 255, 255, 1 )';
  context_bullseye.fillStyle   = 'rgba(  0,   0,   0, 1 )';
  context_bullseye.beginPath();
  context_bullseye.arc(x, y, radius-(radius*0.2), sAngle, eAngle);
  context_bullseye.stroke();
  context_bullseye.fill();

  context_bullseye.strokeStyle = 'rgba(255, 255, 255, 1 )';
  context_bullseye.fillStyle   = 'rgba(  0,   0,   0, 1 )';
  context_bullseye.beginPath();
  context_bullseye.arc(x, y, radius-(radius*0.3), sAngle, eAngle);
  context_bullseye.stroke();
  context_bullseye.fill();

  context_bullseye.strokeStyle = 'rgba(  0,   0,   0, 1 )';
  context_bullseye.fillStyle   = 'rgba( 61, 164, 241, 1 )';
  context_bullseye.beginPath();
  context_bullseye.arc(x, y, radius-(radius*0.4), sAngle, eAngle);
  context_bullseye.stroke();
  context_bullseye.fill();

  context_bullseye.strokeStyle = 'rgba(  0,   0,   0, 1 )';
  context_bullseye.fillStyle   = 'rgba( 61, 164, 241, 1 )';
  context_bullseye.beginPath();
  context_bullseye.arc(x, y, radius-(radius*0.5), sAngle, eAngle);
  context_bullseye.stroke();
  context_bullseye.fill();

  context_bullseye.strokeStyle = 'rgba(  0,   0,   0, 1 )';
  context_bullseye.fillStyle   = 'rgba(220,  24,  48, 1 )';
  context_bullseye.beginPath();
  context_bullseye.arc(x, y, radius-(radius*0.6), sAngle, eAngle);
  context_bullseye.stroke();
  context_bullseye.fill();

  context_bullseye.strokeStyle = 'rgba(  0,   0,   0, 1 )';
  context_bullseye.fillStyle   = 'rgba(220,  24,  48, 1 )';
  context_bullseye.beginPath();
  context_bullseye.arc(x, y, radius-(radius*0.7), sAngle, eAngle);
  context_bullseye.stroke();
  context_bullseye.fill();
  
  context_bullseye.strokeStyle = 'rgba(  0,   0,   0, 1 )';
  context_bullseye.fillStyle   = 'rgba(247, 218,  33, 1 )';
  context_bullseye.beginPath();
  context_bullseye.arc(x, y, radius-(radius*0.8), sAngle, eAngle);
  context_bullseye.stroke();
  context_bullseye.fill();

  context_bullseye.strokeStyle = 'rgba(  0,   0,   0, 1 )';
  context_bullseye.fillStyle   = 'rgba(247, 218,  33, 1 )';
  context_bullseye.beginPath();
  context_bullseye.arc(x, y, radius-(radius*0.9), sAngle, eAngle);
  context_bullseye.stroke();
  context_bullseye.fill();

  context_bullseye.strokeStyle = 'rgba(  0,   0,   0, 1 )';
  context_bullseye.fillStyle   = 'rgba(  0,   0,   0, 1 )';
  context_bullseye.beginPath();
  context_bullseye.arc(x, y, 2, sAngle, eAngle);
  context_bullseye.stroke();
  context_bullseye.fill();
  
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
  context_waveform.clearRect( 0, 0, innerWidth, innerHeight);
  context_bullseye.clearRect( 0, 0, innerWidth, innerHeight);
  
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
    risingEdges.unshift(new RisingEdge(canvas_waveform.width/2+Number(slider_accuracy.value)*10));
    impacts.unshift(new Impact(canvas_bullseye.width/2+Number(slider_accuracy.value)*10, 150));
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
  switch (Number(slider_precision.value)) {
    case 4:
      emoji = 0x1F62C
      break;
    default:
      emoji = 0x1F62B;
  }
  //String.fromCodePoint(emoji)
  context_waveform.font = "25px Arial";
  context_waveform.textAlign = "center";
  //context_waveform.fillText("Precision (Jitter) value: " + slider_precision.value, 250, 260);
  //context_waveform.fillText("Accuracy value: " + slider_accuracy.value, 250, 290);
  slider_precision_output.textContent  = slider_precision.value;
  slider_accuracy_output.textContent   = slider_accuracy.value;
  slider_resolution_output.textContent = slider_resolution.value;
  
}

animate();