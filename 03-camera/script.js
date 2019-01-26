var x = 0;
var camera;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  camera = createCapture(VIDEO);
  loadPixels();
}

function draw() {
  if (camera) {
    camera.loadPixels();

    for (var y = 0; y < height; y++) {
      var r = camera.pixels[4 * (y * camera.width + camera.width * 0.5)];
      var g = camera.pixels[4 * (y * camera.width + camera.width * 0.5) + 1];
      var b = camera.pixels[4 * (y * camera.width + camera.width * 0.5) + 2];
      var a = camera.pixels[4 * (y * camera.width + camera.width * 0.5) + 3];
      set(x, y, [r, g, b, a]);
    }

    updatePixels();

    x++;
  }
}
