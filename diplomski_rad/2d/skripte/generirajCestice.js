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
        Math.random() * (xmax - xmin) + xmin,
        Math.random() * (ymax - ymin) + ymin
      ),
      new Vektor2D(0, 0)
    )
  );
}
