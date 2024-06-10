function generirajNasumicneCestice(brojCestica) {
  let cestice = [];
  for (let i = 0; i < brojCestica; i++) {
    let cestica = generirajNasumicnuCesticu();
    cestice.push(cestica);
  }
  return cestice;
}

function generirajNasumicnuCesticu() {
  return new Cestica(
    0.1,
    new MaterijalnaTocka(
      Math.abs(Math.floor(Math.random() * 1000) % 10) + 1,
      new Vektor2D(
        Math.abs(Math.floor(Math.random() * 1000) % 9) + 0.5 + Math.random(),
        Math.abs(Math.floor(Math.random() * 1000) % 9) + 0.5 + Math.random()
      ),
      new Vektor2D(
        ((Math.floor(Math.random() * 1000) % 10) + 1 + Math.random()) *
          (Math.random() < 0.5 ? -1 : 1),
        ((Math.floor(Math.random() * 1000) % 10) + 1 + Math.random()) *
          (Math.random() < 0.5 ? -1 : 1)
      )
    ),
    "#" + Math.floor(Math.random() * 16777215).toString(16)
  );
}

function generirajStacionarneCestice(
  brojCestica,
  xmin = 0,
  xmax = 10,
  ymin = 0,
  ymax = 10
) {
  let cestice = [];
  for (let i = 0; i < brojCestica; i++) {
    let cestica = generirajStacionarnuCesticu(xmin, xmax, ymin, ymax);
    cestice.push(cestica);
  }
  return cestice;
}

function generirajStacionarnuCesticu(xmin = 0, xmax = 10, ymin = 0, ymax = 10) {
  return new Cestica(
    0.1,
    new MaterijalnaTocka(
      1,
      new Vektor2D(
        Math.abs(Math.floor(Math.random() * 1000) % (xmax - xmin)) +
          xmin +
          +Math.random(),
        Math.abs(Math.floor(Math.random() * 1000) % (ymax - ymin)) +
          ymin +
          Math.random()
      ),
      new Vektor2D(0, 0)
    ),
    //"#" + Math.floor(Math.random() * 16777215).toString(16)
    "grey"
  );
}
