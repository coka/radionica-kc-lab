var t = 0;
var tileSize = 24;
var halfSize = tileSize * 0.25;
var t = 0.1;
var color1, color2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(174, 50, 73);
  noStroke();
  frameRate(12);

  color1 = color(0, 0, 0, 50);
  color2 = color(255);
}

function draw() {
  for (var y = 0; y < height; y += tileSize) {
    for (var x = 0; x < width; x += tileSize) {
      if (random() > 0.2) {
        fill(color1);
      } else {
        fill(color2);
      }
      // rotate(t);
      var funkcijaKojuHocu = random(possibleTiles);
      funkcijaKojuHocu(x, y);
    }
  }

  t = t - 0.001;
  if (t < 0.001) {
    t = 0;
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

// kvadrat(50, 50, 100);

// function kvadrat(50, 50, velicina) {
//   rect(x, y, velicina, velicina);
// }

function square1(x, y) {
  rect(x, y, halfSize, halfSize);
  rect(x + halfSize, y + halfSize * t, halfSize, halfSize);
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
