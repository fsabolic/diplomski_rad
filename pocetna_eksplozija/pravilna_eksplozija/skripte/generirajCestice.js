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
