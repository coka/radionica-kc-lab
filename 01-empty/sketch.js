var t, from, to, kolikoLerpujem, plus;

function setup() {
  createCanvas(1920, 1080);
  background(31, 7, 30, 18);
  t = 3;
  from = color(240, 29, 108);
  to = color(24, 252, 201);
  plus = true;
  kolikoLerpujem = 0;
}

function draw() {
  var offset;
  var size;
  offset = 20;
  size = 50;

  for (var x = offset; x < 1920; x = x + offset) {
    for (var y = size; y < 1080; y = y + size) {
      fill(31, 7, 30, 70);
      var lerpovano = lerpColor(from, to, kolikoLerpujem);
      stroke(lerpovano);
      strokeWeight(3);
      rect(x, y, x + x, x + y);
      scale(1.00004);
      rotate(PI / 10000 + t);
    }
  }

  t = t + 0.00002;
  if (kolikoLerpujem > 1 || kolikoLerpujem < 0) {
    plus = !plus;
  }

  var brzina = map(mouseX, 0, 100, 0, 0.05);
  console.log(mouseX);
  console.log(brzina);
  if (plus) {
    kolikoLerpujem = kolikoLerpujem + brzina;
  } else {
    kolikoLerpujem = kolikoLerpujem - brzina;
  }
}

function keyPressed() {
  if (key === "s") {
    saveCanvas("canvas", "png");
  }
}
