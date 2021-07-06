var canvas_bullseye = document.getElementById("canvas_bullseye");
var canvas_waveform = document.getElementById("canvas_wavefrom");

var slider_accuracy = document.getElementById("slider_accuracy");
var slider_precision = document.getElementById("slider_precision");
var slider_resolution = document.getElementById("slider_resolution");

var slider_accuracy_output = document.getElementById("slider_accuracy_output");
var slider_precision_output = document.getElementById("slider_precision_output");
var slider_resolution_output = document.getElementById("slider_resolution_output");

var context_bullseye = canvas_bullseye.getContext('2d');
var context_waveform = canvas_waveform.getContext('2d');

var riseTime = 25;
var accuracy = Number(slider_accuracy.value);
var precision = Number(slider_precision.value);
var jitter = 20-precision;
var resolution = Number(slider_resolution.value);


// slider_precision.onchange = function() {
//   console.log("precision changed.");
// }

// Treat a function as a JavaScript Object.
function DrawRisingEdge(startXValue) {

  let randomJitter = (Math.random() - 0.5);
  let scaledJitter = Math.floor(randomJitter * jitter);
  let pixelJitter  = scaledJitter * resolution;
  //console.log("RandomJitter: " + randomJitter + " " + "ScaledJitter: " + scaledJitter + " " + "PixelJitter: " + pixelJitter);

  this.startXCoordinate = startXValue
  this.alphaOpacity = 1.0;
  //this.jitter = randomJitter * jitter * resolution;
  this.jitter = pixelJitter;


  // Methods of this object are implemented as anonymous functions.
  this.draw = function () {
    // Draw line path for one rising edge on canvas.
    context_waveform.beginPath();

    context_waveform.strokeStyle = 'rgba(0, 0, 0, ' + this.alphaOpacity + ' )';
    context_waveform.lineCap = "round";
    context_waveform.lineWidth = 5;

    context_waveform.moveTo(25, 200);
    context_waveform.lineTo(this.startXCoordinate + this.jitter, 200);
    context_waveform.lineTo(this.startXCoordinate + riseTime + this.jitter, 25);
    context_waveform.lineTo(475, 25);

    context_waveform.stroke();
  }

  // First draw content and then decrease opacity to create fade-out effect.
  this.update = function () {
    this.draw();
    this.alphaOpacity = this.alphaOpacity * 0.91; // - 0.02; // * 0.92;
    if (this.alphaOpacity < 0.001) { this.alphaOpacity = 0 };
  }

  this.getAlpha = function () {
    return this.alphaOpacity;
  }

}


// Treat a function as a JavaScript Object as we want to have multiple instances 
// representing multiple bullseye hit at different stages of fade-out.
function DrawBullseyeHit(x, y) {

  this.xCoordinate = x;
  this.yCoordinate = y;
  this.radius = 5;
  this.startAngle = 0;
  this.endAngle = 2 * Math.PI;
  this.alphaOpacity = 1.0;
  let randomJitterX = (Math.random() - 0.5);
  let scaledJitterX = Math.floor(randomJitterX * jitter);
  let pixelJitterX  = scaledJitterX * resolution;
  let randomJitterY = (Math.random() - 0.5);
  let scaledJitterY = Math.floor(randomJitterY * jitter);
  let pixelJitterY  = scaledJitterY * resolution;

  //this.jitterX = (Math.random() - 0.5) * jitter * resolution;
  //this.jitterY = (Math.random() - 0.5) * jitter * resolution;
  this.jitterX = pixelJitterX;
  this.jitterY = pixelJitterY;

  // Draw line path representing one bullseye hit on the canvas.
  this.draw = function () {
    context_bullseye.beginPath();
    context_bullseye.strokeStyle = 'rgba(  0,   0,   0, ' + this.alphaOpacity + ' )';
    context_bullseye.fillStyle = 'rgba(255, 255, 255, ' + this.alphaOpacity + ' )';
    context_bullseye.arc(this.xCoordinate + this.jitterX, this.yCoordinate + this.jitterY, this.radius, this.startAngle, this.endAngle);
    context_bullseye.stroke();
    context_bullseye.fill();
  }

  // TODO: These two functions could be done as composition? Or inheritance?
  // First draw content and then decrease opacity to create fade-out effect.
  this.update = function () {
    this.draw();
    this.alphaOpacity = this.alphaOpacity * 0.91;
    if (this.alphaOpacity < 0.001) { this.alphaOpacity = 0 };
  }

  // Return current alpha value of this object.
  this.getAlpha = function () {
    return this.alphaOpacity;
  }

}


// ===== TO BE DELETED - WE DON'T HAVE A BUTTON
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
// ==========


function drawJitterMargin() {

  var maxJitter = (1.0 - 0.5) * jitter * resolution;

  // Draw the jitter margin indicator as a red line below the waveform.
  context_waveform.beginPath();
  context_waveform.strokeStyle = 'rgba(191, 0, 0, 1 )';
  context_waveform.lineCap = "round";
  context_waveform.lineWidth = 3;
  context_waveform.moveTo(canvas_waveform.width / 2 + accuracy * resolution - maxJitter, 220);

  if (buttonState == false) {
    context_waveform.lineTo(canvas_waveform.width / 2 + accuracy * resolution +          + maxJitter, 220);
  } else {
    context_waveform.lineTo(canvas_waveform.width / 2 + accuracy * resolution + riseTime + maxJitter, 220);
  }

  context_waveform.moveTo(canvas_waveform.width / 2 + accuracy * resolution - maxJitter, 210);
  context_waveform.lineTo(canvas_waveform.width / 2 + accuracy * resolution - maxJitter, 230);

  if (buttonState == false) {
    context_waveform.moveTo(canvas_waveform.width / 2 + accuracy * resolution +          + maxJitter, 210);
    context_waveform.lineTo(canvas_waveform.width / 2 + accuracy * resolution +          + maxJitter, 230);
  } else {
    context_waveform.moveTo(canvas_waveform.width / 2 + accuracy * resolution + riseTime + maxJitter, 210);
    context_waveform.lineTo(canvas_waveform.width / 2 + accuracy * resolution + riseTime + maxJitter, 230);
  }

  context_waveform.stroke();

  // Draw the rise time indicator as a blue line on top of the overall margin indicator.
  if (buttonState == true) {
    context_waveform.beginPath();
    context_waveform.strokeStyle = 'rgba(  0,   0, 191, 1 )';
    //context_waveform.lineCap = "round";
    //context_waveform.lineWidth = 3;
    context_waveform.moveTo(canvas_waveform.width / 2 + accuracy * resolution + maxJitter, 220);
    context_waveform.lineTo(canvas_waveform.width / 2 + accuracy * resolution + riseTime + maxJitter, 220);
    context_waveform.moveTo(canvas_waveform.width / 2 + accuracy * resolution + riseTime + maxJitter, 210);
    context_waveform.lineTo(canvas_waveform.width / 2 + accuracy * resolution + riseTime + maxJitter, 230);
    context_waveform.stroke();
  }

  // Draw the vertical dashed 'target' line.
  context_waveform.beginPath();
  context_waveform.moveTo(canvas_waveform.width / 2, 20);
  context_waveform.lineTo(canvas_waveform.width / 2, canvas_waveform.height - 70);
  context_waveform.strokeStyle = 'rgba(  0,   0, 191, 0.5 )';
  context_waveform.save();
  context_waveform.setLineDash([5, 15]);
  context_waveform.stroke();
  context_waveform.restore();

}


function drawBullseye() {

  x = canvas_bullseye.width / 2;
  y = canvas_bullseye.height / 2;
  radius = 140;
  sAngle = 0;
  eAngle = 2 * Math.PI;

  context_bullseye.strokeStyle = 'rgba(  0,   0,   0, 1 )';
  context_bullseye.fillStyle = 'rgba(255, 255, 255, 1 )';
  context_bullseye.beginPath();
  context_bullseye.arc(x, y, radius - (radius * 0.0), sAngle, eAngle);
  context_bullseye.stroke();
  context_bullseye.fill();

  context_bullseye.strokeStyle = 'rgba(  0,   0,   0, 1 )';
  context_bullseye.fillStyle = 'rgba(255, 255, 255, 1 )';
  context_bullseye.beginPath();
  context_bullseye.arc(x, y, radius - (radius * 0.1), sAngle, eAngle);
  context_bullseye.stroke();
  context_bullseye.fill();

  context_bullseye.strokeStyle = 'rgba(255, 255, 255, 1 )';
  context_bullseye.fillStyle = 'rgba(  0,   0,   0, 1 )';
  context_bullseye.beginPath();
  context_bullseye.arc(x, y, radius - (radius * 0.2), sAngle, eAngle);
  context_bullseye.stroke();
  context_bullseye.fill();

  context_bullseye.strokeStyle = 'rgba(255, 255, 255, 1 )';
  context_bullseye.fillStyle = 'rgba(  0,   0,   0, 1 )';
  context_bullseye.beginPath();
  context_bullseye.arc(x, y, radius - (radius * 0.3), sAngle, eAngle);
  context_bullseye.stroke();
  context_bullseye.fill();

  context_bullseye.strokeStyle = 'rgba(  0,   0,   0, 1 )';
  context_bullseye.fillStyle = 'rgba( 61, 164, 241, 1 )';
  context_bullseye.beginPath();
  context_bullseye.arc(x, y, radius - (radius * 0.4), sAngle, eAngle);
  context_bullseye.stroke();
  context_bullseye.fill();

  context_bullseye.strokeStyle = 'rgba(  0,   0,   0, 1 )';
  context_bullseye.fillStyle = 'rgba( 61, 164, 241, 1 )';
  context_bullseye.beginPath();
  context_bullseye.arc(x, y, radius - (radius * 0.5), sAngle, eAngle);
  context_bullseye.stroke();
  context_bullseye.fill();

  context_bullseye.strokeStyle = 'rgba(  0,   0,   0, 1 )';
  context_bullseye.fillStyle = 'rgba(220,  24,  48, 1 )';
  context_bullseye.beginPath();
  context_bullseye.arc(x, y, radius - (radius * 0.6), sAngle, eAngle);
  context_bullseye.stroke();
  context_bullseye.fill();

  context_bullseye.strokeStyle = 'rgba(  0,   0,   0, 1 )';
  context_bullseye.fillStyle = 'rgba(220,  24,  48, 1 )';
  context_bullseye.beginPath();
  context_bullseye.arc(x, y, radius - (radius * 0.7), sAngle, eAngle);
  context_bullseye.stroke();
  context_bullseye.fill();

  context_bullseye.strokeStyle = 'rgba(  0,   0,   0, 1 )';
  context_bullseye.fillStyle = 'rgba(247, 218,  33, 1 )';
  context_bullseye.beginPath();
  context_bullseye.arc(x, y, radius - (radius * 0.8), sAngle, eAngle);
  context_bullseye.stroke();
  context_bullseye.fill();

  context_bullseye.strokeStyle = 'rgba(  0,   0,   0, 1 )';
  context_bullseye.fillStyle = 'rgba(247, 218,  33, 1 )';
  context_bullseye.beginPath();
  context_bullseye.arc(x, y, radius - (radius * 0.9), sAngle, eAngle);
  context_bullseye.stroke();
  context_bullseye.fill();

  context_bullseye.strokeStyle = 'rgba(  0,   0,   0, 1 )';
  context_bullseye.fillStyle = 'rgba(  0,   0,   0, 1 )';
  context_bullseye.beginPath();
  context_bullseye.arc(x, y, 2 /*radius - (radius * 1.0)*/, sAngle, eAngle);
  context_bullseye.stroke();
  context_bullseye.fill();

}


var drawGrid = function() {

  context_waveform.lineWidth = 1;
  context_waveform.strokeStyle = "#ccc";

  // Draw the first half of the grid from the middle to the left.
  for (var x = canvas_waveform.width/2; x > 0; x -= resolution) {
    context_waveform.beginPath();
    context_waveform.moveTo(x, 0);
    context_waveform.lineTo(x, canvas_waveform.height);
    context_waveform.stroke();
  }
  // Draw the second half of the the grid from the middle to the right.
  for (var x = canvas_waveform.width/2; x < canvas_waveform.width; x += resolution) {
    context_waveform.beginPath();
    context_waveform.moveTo(x, 0);
    context_waveform.lineTo(x, canvas_waveform.height);
    context_waveform.stroke();
  }

}


var risingEdges = [];
var bullseyeHits = [];
var nowMilliseconds = 0;
var prvMilliseconds = 0;
var loopTime = 0;
var loopTimeSum = 0;

// Main animation loop
function animate() {

  // Logging the time betweetn frames
  prvMilliseconds = nowMilliseconds;
  nowMilliseconds = new Date().getMilliseconds();

  // Deal with overflow of the millisecond timer
  if (nowMilliseconds < prvMilliseconds) {
    loopTime = 1000 + nowMilliseconds - prvMilliseconds;
  }
  else {
    loopTime = nowMilliseconds - prvMilliseconds;
  }

  loopTimeSum = loopTimeSum + loopTime;


  // Start animation via recursive call.
  requestAnimationFrame(animate);
  context_waveform.clearRect(0, 0, innerWidth, innerHeight);
  context_bullseye.clearRect(0, 0, innerWidth, innerHeight);

  drawGrid();

  drawJitterMargin();
  drawBullseye();

  // Add a new rising edge every 50 ms.
  if (loopTimeSum > 50) {
    risingEdges.unshift(new DrawRisingEdge(canvas_waveform.width / 2 + accuracy * resolution));
    bullseyeHits.unshift(new DrawBullseyeHit(canvas_bullseye.width / 2 + accuracy * resolution, 150));
    loopTimeSum = 0;
  }

  //console.log(risingEdges.length);

  // Go through the array of rising edges and call their update method.
  for (var i = 0; i <= risingEdges.length - 1; i++) {
    risingEdges[i].update();
    // If a rising edge has faded away, delete it from the array.
    if (risingEdges[i].getAlpha() <= 0) {
      risingEdges.pop();
    }
  }

  // Go through the array of bullseye hits and call their update method.
  for (var i = 0; i <= bullseyeHits.length - 1; i++) {
    bullseyeHits[i].update();
    // If abullseye hit has faded away, delete it from the array.
    if (bullseyeHits[i].getAlpha() <= 0) {
      bullseyeHits.pop();
    }
  }

  accuracy = Number(slider_accuracy.value);
  precision = Number(slider_precision.value);
  jitter = 20-precision;
  resolution = Number(slider_resolution.value);

  // Display the current slider values in the corresponding HTML elements.
  slider_accuracy_output.textContent = accuracy;
  slider_precision_output.textContent = precision;
  slider_resolution_output.textContent = resolution;

}

animate();