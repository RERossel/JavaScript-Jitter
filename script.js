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



// slider_precision.onchange = function() {
//   console.log("precision changed.");
// }

// Treat a function as a JavaScript Object.
function DrawRisingEdge(startXValue) {

  let randomJitter = (Math.random() - 0.5);
  let scaledJitter = Math.round(randomJitter * jitter);
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
  let scaledJitterX = Math.round(randomJitterX * jitter);
  let pixelJitterX  = scaledJitterX * resolution;
  let randomJitterY = (Math.random() - 0.5);
  let scaledJitterY = Math.round(randomJitterY * jitter);
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

  //console.log(maxJitter);

  // Draw the jitter margin indicator as a red line below the waveform.
  context_waveform.strokeStyle = 'rgba(191, 0, 0, 1 )';
  context_waveform.lineCap = "round";
  context_waveform.lineWidth = 3;

    context_waveform.beginPath();
    context_waveform.moveTo(canvas_waveform.width / 2 + ( accuracy * resolution )            - maxJitter, 220);

  if (buttonState == false) {
    context_waveform.lineTo(canvas_waveform.width / 2 + ( accuracy * resolution )            + maxJitter, 220);
  } else {
    context_waveform.lineTo(canvas_waveform.width / 2 + ( accuracy * resolution ) + riseTime + maxJitter, 220);
  }

    context_waveform.moveTo(canvas_waveform.width / 2 + ( accuracy * resolution )            - maxJitter, 210);
    context_waveform.lineTo(canvas_waveform.width / 2 + ( accuracy * resolution )            - maxJitter, 230);

  if (buttonState == false) {
    context_waveform.moveTo(canvas_waveform.width / 2 + ( accuracy * resolution )            + maxJitter, 210);
    context_waveform.lineTo(canvas_waveform.width / 2 + ( accuracy * resolution )            + maxJitter, 230);
  } else {
    context_waveform.moveTo(canvas_waveform.width / 2 + ( accuracy * resolution ) + riseTime + maxJitter, 210);
    context_waveform.lineTo(canvas_waveform.width / 2 + ( accuracy * resolution ) + riseTime + maxJitter, 230);
  }

  context_waveform.stroke();

  // Draw the rise time indicator as a blue line on top of the overall margin indicator.
  if (buttonState == true) {
    context_waveform.beginPath();
    context_waveform.strokeStyle = 'rgba(  0,   0, 191, 1 )';
    //context_waveform.lineCap = "round";
    //context_waveform.lineWidth = 3;
    context_waveform.moveTo(canvas_waveform.width / 2 + ( accuracy * resolution )            + maxJitter, 220);
    context_waveform.lineTo(canvas_waveform.width / 2 + ( accuracy * resolution ) + riseTime + maxJitter, 220);
    context_waveform.moveTo(canvas_waveform.width / 2 + ( accuracy * resolution ) + riseTime + maxJitter, 210);
    context_waveform.lineTo(canvas_waveform.width / 2 + ( accuracy * resolution ) + riseTime + maxJitter, 230);
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



var drawTimeSegments = function() {

  context_waveform.lineWidth = 1;
  context_waveform.strokeStyle = "#000";

  // Draw a horizontal line.
  context_waveform.beginPath();
  context_waveform.moveTo(25, 270);
  context_waveform.lineTo(475, 270);
  context_waveform.stroke();

  // Draw ten vertical tickmarks
  // Draw the first half of the tickmarks from the middle to the left.
  for (var x = canvas_waveform.width/2; x > 0; x -= 50) {
    context_waveform.beginPath();
    context_waveform.moveTo(x, 260);
    context_waveform.lineTo(x, 280);
    context_waveform.stroke();
  }
  // Draw the second half of the the tickmarks from the middle to the right.
  for (var x = canvas_waveform.width/2; x < canvas_waveform.width; x += 50) {
    context_waveform.beginPath();
    context_waveform.moveTo(x, 260);
    context_waveform.lineTo(x, 280);
    context_waveform.stroke();
  }
  // Draw the first half of the tickmarks from the middle to the left.
  for (var x = canvas_waveform.width/2; x > 0; x -= 100) {
    context_waveform.beginPath();
    context_waveform.moveTo(x, 260);
    context_waveform.lineTo(x, 280);
    context_waveform.stroke();
  }
  // Draw the second half of the the tickmarks from the middle to the right.
  for (var x = canvas_waveform.width/2; x < canvas_waveform.width; x += 100) {
    context_waveform.beginPath();
    context_waveform.moveTo(x, 260);
    context_waveform.lineTo(x, 280);
    context_waveform.stroke();
  }

}



var risingEdges = [];
var bullseyeHits = [];
var nowMilliseconds = 0;
var prvMilliseconds = 0;
var loopTime = 0;
var loopTimeSum = 0;
var riseTime = 25;
var range_max_px = 200; // Range in pixels
var accuracy;
var accuracy_reference;
var precision;
var precision_reference;// = range_max_px / Number(slider_precision.max) * Number(slider_precision.value);
var jitter;
var resolution;
//var resolution_max = 51;
//var resolution_min =  1;
//var nsValue = 10; // 10 pixels per nanosecond
//var range_max_ns = range_max_px / nsValue; // 40 nanoseconds



// Function to perform when slider is moved
function read_accuracy_slider() {
  accuracy  = Number(slider_accuracy.value);
  // Display the current slider values in the corresponding HTML elements.
  slider_accuracy_output.textContent = accuracy;
  accuracy_reference = range_max_px / Number(slider_accuracy.max) * accuracy;
  console.log("accuracy: " + accuracy + "   accuracy reference in pixels: " + accuracy_reference);
}
// Read variable values from HTML sliders when we move them (input, not change)
slider_accuracy.addEventListener('input', function() {
  read_accuracy_slider();
}, false);
// Perform slider function at least once when the script is executed for the first time
read_accuracy_slider();


// Function to perform when slider is moved
function read_precision_slider() {
  precision = Number(slider_precision.value);
  // Display the current slider values in the corresponding HTML elements.
  slider_precision_output.textContent = precision;
  precision_reference = range_max_px / Number(slider_precision.max) * precision;
  jitter = slider_precision.max-precision;
  console.log("precision: " + precision + "   precision reference in pixels: " + precision_reference + "   jitter: " + jitter);
}
// Read variable values from HTML sliders when we move them (input, not change)
slider_precision.addEventListener('input', function() {
  read_precision_slider();
}, false);
// Perform slider function at least once when the script is executed for the first time
read_precision_slider();


// Function to perform when slider is moved
function read_resolution_slider() {
  console.log("-----------------------");
  resolution = Number(slider_resolution.max)-Number(slider_resolution.value)+1;
  console.log("resolution: " + resolution);
  // Display the current slider values in the corresponding HTML elements.
  slider_resolution_output.textContent = slider_resolution.value;

  // Determine new corresponding precision setting, taking the resolution change into account.
  // TODO: Optimize this...
  slider_precision.max =  range_max_px / resolution;
  console.log("maximum precision at this resolution: " + Math.round(slider_precision.max));
  console.log("precision reference: " + precision_reference);
  let mincalc = 200;
  let tempmin = 200;
  let closest_match = 0;
  for (let i=0; i<= Number(slider_precision.max); i++) {
    let slider_at_val = range_max_px / Number(slider_precision.max) * i;
    console.log("slider_at_val after " + Math.round(Number(slider_precision.max)) + " position " + i + " is " + Math.round(slider_at_val));
    mincalc = Math.min(Math.abs(slider_at_val-precision_reference));
    if (mincalc <= tempmin) {
      closest_match = i;
      tempmin = mincalc;
    }
  }
  console.log("Closest match: " + closest_match);
  slider_precision.value = closest_match;
  precision = Number(slider_precision.value);
  slider_precision_output.textContent = Number(slider_precision.value);
  jitter = slider_precision.max-precision;
  
  // Determine new corresponding accuracy setting, taking the resolution change into account.
  // TODO: Optimize this...
  slider_accuracy.max  =  Math.round((range_max_px/2) / resolution);
  slider_accuracy.min  = -Math.round((range_max_px/2) / resolution);
  console.log("min and max accuracy at this resolution: " + Math.round(slider_precision.min) + " and " + Math.round(slider_precision.max));
  console.log("accuracy reference: " + accuracy_reference);
  mincalc = 200;
  tempmin = 200;
  closest_match = 0;
  for (let i=0; i<= Number(slider_accuracy.max); i++) {
    let slider_at_val = range_max_px / Number(slider_accuracy.max) * i;
    console.log("slider_at_val after " + Math.round(Number(slider_accuracy.max)) + " position " + i + " is " + Math.round(slider_at_val));
    mincalc = Math.min(Math.abs(slider_at_val-Math.abs(accuracy_reference)));
    if (mincalc <= tempmin) {
      closest_match = i;
      tempmin = mincalc;
    }
  }
  console.log("Closest match: " + closest_match + "   accuracy sign: " +  Math.sign(accuracy));
  slider_accuracy.value = closest_match * Math.sign(accuracy);
  accuracy = Number(slider_accuracy.value);
  slider_accuracy_output.textContent = Number(slider_accuracy.value);
}
// Read variable values from HTML sliders when we move them (input, not change)
slider_resolution.addEventListener('input', function() {
  read_resolution_slider();
}, false);
// Perform slider function at least once when the script is executed for the first time
read_resolution_slider();











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
  drawTimeSegments();

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



}

animate();