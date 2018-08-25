var tileSize,
  halfSize,
  backgroundColor,
  tileColor,
  specialTileColor,
  specialTileFrequency;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  tileSize = 64;
  halfSize = tileSize / 2;
  backgroundColor = color(174, 50, 73);
  tileColor = color(232, 74, 95);
  specialTileColor = color(222);
  specialTileFrequency = 0.2;

  background(backgroundColor);
  for (var y = 0; y < height; y += tileSize) {
    for (var x = 0; x < width; x += tileSize) {
      if (random() > specialTileFrequency) {
        fill(tileColor);
      } else {
        fill(specialTileColor);
      }

      random(possibleTiles)(x, y);
    }
  }
}

var possibleTiles = [
  square1,
  square2,
  triangle1,
  triangle1,
  triangle2,
  triangle2,
  triangle3,
  triangle3,
  triangle4,
  triangle4,
  circle
];

function square1(x, y) {
  rect(x, y, halfSize, halfSize);
  rect(x + halfSize, y + halfSize, halfSize, halfSize);
}

function square2(x, y) {
  rect(x + halfSize, y, halfSize, halfSize);
  rect(x, y + halfSize, halfSize, halfSize);
}

function triangle1(x, y) {
  triangle(x, y, x, y + tileSize, x + tileSize, y);
}

function triangle2(x, y) {
  triangle(x, y, x, y + tileSize, x + tileSize, y + tileSize);
}

function triangle3(x, y) {
  triangle(x, y + tileSize, x + tileSize, y + tileSize, x + tileSize, y);
}

function triangle4(x, y) {
  triangle(x, y, x + tileSize, y + tileSize, x + tileSize, y);
}

function circle(x, y) {
  ellipse(x + halfSize, y + halfSize, halfSize, halfSize);
}

function keyPressed() {
  if (key === "s") {
    saveCanvas("canvas", "png");
  }
}
