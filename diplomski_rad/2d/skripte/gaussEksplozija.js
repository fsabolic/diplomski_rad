function gaussEksplozija(centarX, centarY, brojCestica, cesticeEksplozije) {
  if (!brojCesticaJeURasponu(brojCestica)) {
    throw Error("Broj čestica u eksploziji nije dobro definiran!");
  }

  for (let i = 0; i < brojCestica; i++) {
    let tocka = nasumnicnaNormalnaDistribucija(1);
    let multi = 3;
    let cestica = new Cestica(
      0.1,
      new MaterijalnaTocka(
        2 + Math.random(),
        new Vektor2D(centarX, centarY),
        new Vektor2D(tocka[0][0] * multi, tocka[1][0] * multi)
      )
    );
    cesticeEksplozije.push(cestica);
  }
}

function brojCesticaJeURasponu(brojCestica) {
  if (!(isNaN(brojCestica) || brojCestica < 1 || brojCestica > 10000)) {
    return true;
  }
  return false;
}
