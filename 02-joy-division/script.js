var WAVE_COUNT,
  VALUES_PER_WAVE,
  DRAWING_DIMENSION,
  WAVE_HEIGHT,
  ENVELOPE_SPREAD,
  NOISE_COEFFICIENT,
  backgroundColor,
  strokeColor;

function setup() {
  createCanvas(800, 800);

  // How many lines ("waves") are there in the final image (i.e. vertical count)
  WAVE_COUNT = 80;
  // How many data points each wave has, horizontally
  VALUES_PER_WAVE = 100;
  // The dimension (both width and height) of the drawing as a percentage of sketch width
  DRAWING_DIMENSION = 0.5;

  // The height of each wave, as a percentage of pixel dimensions of the drawing (see the dimension
  // iable, below).
  WAVE_HEIGHT = 0.17;

  // The width of the "middle part" of each wave
  ENVELOPE_SPREAD = 0.2;

  // The noise coefficient to use when generating wave values.
  NOISE_COEFFICIENT = 0.18;

  // Sketch background color
  backgroundColor = color(10, 10, 10);

  // Wave color
  strokeColor = color(240, 240, 240);
}

function draw() {
  // --------------------
  // --- DRAWING CODE ---
  // --------------------

  // Set up colors
  background(backgroundColor);
  stroke(strokeColor);

  // We're not using fills in this sketch, but it's here for good measure
  fill(backgroundColor);

  // Calculate pixel dimensions of the drawing (width and height are the same)
  var dimension = width * DRAWING_DIMENSION;

  // Reset the coordinate system origin to be at the top-left corner of the wave drawing
  translate(width / 2 - dimension / 2, height / 2 - dimension / 2);

  // Calculate the vertical pixel spacing of waves based on the number of waves and drawing pixel
  // dimensions
  var waveSpacing = dimension / WAVE_COUNT;

  // Calculate the pixel height of each wave
  var waveHeight = dimension * WAVE_HEIGHT;

  // Start drawing waves
  for (var i = 0; i < WAVE_COUNT; i++) {
    // Draw one wave
    drawWave(
      i,
      VALUES_PER_WAVE,
      dimension,
      waveHeight,
      ENVELOPE_SPREAD,
      NOISE_COEFFICIENT
    );

    // Move the coordinate system origin down, so that it's ready for the next wave
    translate(0, waveSpacing);
  }

  ENVELOPE_SPREAD += 0.001;
}

function drawWave(
  row,
  valueCount,
  widthPixels,
  heightPixels,
  spread,
  noiseCoefficient
) {
  // The distance between each curve point
  var horizontalSpacing = widthPixels / (valueCount - 1);

  // We're drawing each wave as a Processing shape
  beginShape();

  // Start drawing individual values within the wave
  for (var i = 1; i < valueCount; i++) {
    // The "envelope" is a common term denoting a function which is "wrapping" around another
    // function. In this case, the envelope is the gaussian ("bell") function, which is used to
    // scale the values of Processing's noise() function so that the middle part is more prominent.
    var envelope = gaussian(
      i,
      1.0,
      valueCount / 2.0,
      (spread * valueCount) / 2
    );
    var value = envelope * noise(row, i * noiseCoefficient);

    // Define a new point in the shape we're currently drawing
    vertex(i * horizontalSpacing, -value * heightPixels);
  }

  // We're done drawing this wave
  endShape();
}

function gaussian(x, a, b, c) {
  // We're using the normalized Gaussian function as the envelope for each wave.
  // Read more about the function here: https://en.wikipedia.org/wiki/Gaussian_function
  var e = 2.7182818285;
  var exponent = -0.5 * pow((x - b) / c, 2);
  return a * pow(e, exponent);
}

function keyPressed() {
  if (key === "s") {
    saveCanvas("canvas", "png");
  }
}
