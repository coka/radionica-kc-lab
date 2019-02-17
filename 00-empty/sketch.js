var t = 2;
// var times=0;
function setup() {
  createCanvas(640, 480);
  colorMode(HSB, 100);
}

function draw() {
  background(10);

  for (var j = 0; j < 480; j += 20) {
    for (var i = 0; i < 20; i += 5) {
      strokeWeight(i / 5 - 1);
      stroke(i * 10 + 10, i * 5, 100, (i * t) / 10);
      fill(90 + i, 100, 100, (i * t) / 100);
      width = 50 + i * 2;
      height = 30 + j;
      translate(width / (2 * t), height / 200);
      rotate(((PI / 180) * i) / 5);
      rect(j, i, width, height);
    }
  }

  // if (times<4){
  t = t + 0.5;
  if (t > 100) {
    t = 2;
    // times+=1;
  }
}

// }
