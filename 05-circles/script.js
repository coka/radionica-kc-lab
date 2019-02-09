var bla = 0;

function setup() {
  createCanvas(2600, 1280);
}

function draw() {
  background("black");
  for (var x = 0; x < width; x = x + 50) {
    for (var y = 0; y < height; y = y + 50) {
      ellipse(x, y, 40, sin(y * x + bla) * 30);
      fill("deeppink");
    }
  }

  bla = bla + 0.15;
}

function keyPressed() {
  if (key === "s") {
    saveCanvas("canvas", "png");
  }
}
