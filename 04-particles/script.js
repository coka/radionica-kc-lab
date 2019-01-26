var time = 0;

var Particle = function(x, y, vx, vy) {
  this.loc = vec2.fromValues(x, y);
  this.vel = vec2.fromValues(vx * 0.25, vy * 0.25);
  this.decay = 0.95 + Math.random() * 0.04;
  this.radius = 3.5;
  this.age = 0;
  this.lifespan = 32.0 + Math.random() * 64.0;
  this.isDead = false;
};

Particle.prototype.update = function() {
  this.age++;
  if (this.age > this.lifespan) {
    this.isDead = true;
  }
  this.loc = vec2.add(this.loc, this.loc, this.vel);
  this.vel[0] *= this.decay;
  this.vel[1] *= this.decay;
  var r = noise.perlin3(this.loc[0] * 0.005, this.loc[1] * 0.005, time * 0.001);
  var angle = r * 15.0;
  var ageThing = 1 - this.age / (this.lifespan + 1);
  this.vel[0] += Math.cos(angle) * 0.2 * (1 - ageThing);
  this.vel[1] += Math.sin(angle) * 0.2 * (1 - ageThing);
  this.radius = 3.5 * ageThing;
};

var ParticleController = function(x, y) {
  this.particles = [];
};

ParticleController.prototype.addParticles = function(x, y, n, mousev) {
  for (var i = 0; i < n; i++) {
    var offset = vec2.fromValues(Math.random() - 0.5, Math.random() - 0.5);
    mousev[0] += offset[0] * 10.0;
    mousev[1] += offset[1] * 10.0;
    xrand = Math.random() - 0.5;
    yrand = Math.random() - 0.5;
    var randVec = vec2.fromValues(xrand, yrand);
    vec2.normalize(randVec, randVec);
    this.particles.push(
      new Particle(
        x + randVec[0] * Math.random() * 15.0,
        y + randVec[1] * Math.random() * 15.0,
        mousev[0],
        mousev[1]
      )
    );
  }
};

ParticleController.prototype.update = function() {
  for (var i = 0; i < this.particles.length; i++) {
    if (this.particles[i].isDead) {
      this.particles.splice(i, 1);
      i--;
    } else {
      this.particles[i].update();
    }
  }
};

window.onload = function execute() {
  var stage = new PIXI.Stage(0x002b36);
  stage.interactive = true;
  var renderer = new PIXI.CanvasRenderer(960, 540);
  renderer.view.className = "renderer";
  document.body.appendChild(renderer.view);
  var graphics = new PIXI.Graphics();
  stage.addChild(graphics);
  var controller = new ParticleController();
  var isDown = false;
  var mousepx = 0;
  var mousepy = 0;
  var start = Date.now();

  requestAnimFrame(animate);

  function animate() {
    var now = Date.now();
    time = now - start;
    draw();
    renderer.render(stage);
    update();
    requestAnimFrame(animate);
  }

  stage.mousedown = stage.touchstart = function(data) {
    isDown = true;
    mousepx = data.global.x;
    mousepy = data.global.y;
  };

  stage.mouseup = stage.touchend = function() {
    isDown = false;
  };

  stage.mousemove = stage.touchmove = function(data) {
    if (!isDown) {
      return;
    }
    var mv = vec2.fromValues(data.global.x - mousepx, data.global.y - mousepy);
    mv[0] += (Math.random() - 0.5) * 16.0;
    mv[1] += (Math.random() - 0.5) * 16.0;
    controller.addParticles(data.global.x, data.global.y, 4, mv);
    mousepx = data.global.x;
    mousepy = data.global.y;
  };

  function draw() {
    graphics.clear();
    graphics.lineStyle(0);
    graphics.beginFill(0x6c71c4);
    for (var i = 0; i < controller.particles.length; ++i) {
      graphics.drawCircle(
        controller.particles[i].loc[0],
        controller.particles[i].loc[1],
        controller.particles[i].radius
      );
    }
  }

  function update() {
    controller.update();
  }
};
