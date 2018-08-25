var tileSize, // veličina jedne pločice (u pikselima)
  halfSize, // polovina te veličine će biti korisna kasnije za računanje sredine
  backgroundColor, // boja pozadine
  tileColor, // boja pločica
  specialTileColor, // boja "specijalnih" pločica
  specialTileFrequency; // učestalost specijalnih pločica

// Ova funkcija se poziva jedanput prilikom pokretanja programa, i u njoj imamo
// priliku da podesimo sve što nam je potrebno pre početka iscrtavanja.
function setup() {
  // windowWidth i windowHeight su promenljive koje nam daje p5.js. One sardže
  // veličinu vidljivog dela stranice u browser-u.
  createCanvas(windowWidth, windowHeight);

  // Svi oblici će biti crtani bez konturne linije.
  noStroke();

  tileSize = 64;
  halfSize = tileSize / 2;
  backgroundColor = color(174, 50, 73, 40); // (r, g, b, a)
  tileColor = color(232, 74, 95, 40);
  specialTileColor = color(222, 160); // (grayscale, a)
  specialTileFrequency = 0.08; // 0 = 0%; 100 = 100%; 0.08 = 8%
}

// Ova funkcija će se pozivati jednom za svaki frejm.
function draw() {
  // Prvo popuni celu pozadinu "platna" sa ovom bojom.
  background(backgroundColor);

  // width i height su takođe promenljive iz p5.js-a, i one sadrže veličinu
  // platna.
  for (var y = 0; y < height; y += tileSize) {
    for (var x = 0; x < width; x += tileSize) {
      // random() daje nasumičan realan broj od 0 do 1, tako da će otprilike u
      // 95% slučajeva taj broj biti veći od 0.05, i tada crtamo običnu pločicu.
      // U slučajevima kada je ipak manji, crtamo specijalnu pločicu.
      if (random() > specialTileFrequency) {
        fill(tileColor);
      } else {
        fill(specialTileColor);
      }

      // Kada random() primi niz kao parametar, on vraća nasumičan element iz
      // tog niza. Inače, ovu liniju smo mogli da napišemo i ovako:
      //
      // var tile = random(possibleTiles);
      // possibleTiles(x, y);
      //
      random(possibleTiles)(x, y);
    }
  }
}

// Ovo je niz koji sadrži funkcije koje crtaju sve moguće oblike pločica. Da nas
// ne bi bolela glava od matematike, učestalost svakog oblika kontrolišemo tako
// što ponavljamo element ako želimo više tog oblika. Mnogo lakše, brate.
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

// Svaka od ovih funkcija prima x i y kao parametre, i zbog toga tamo gore
// možemo svaku da pozivamo na isti način.

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

// Ova funkcija se poziva svaki put kada se pritisne bilo koji taster.
function keyPressed() {
  // U slučaju da smo pritisnuli taster S, trenutni sadržaj platna će biti
  // sačuvan kao PNG slika u Downloads folderu.
  if (key === "s") {
    saveCanvas("canvas", "png");
  }
}
