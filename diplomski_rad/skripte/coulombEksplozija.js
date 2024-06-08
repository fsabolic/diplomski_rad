function coulombEksplozija(centarX, centarY, brojCestica, cesticeEksplozije) {
  if (!brojCesticaJeURasponu(brojCestica)) {
    throw Error("Broj čestica u eksploziji nije dobro definiran!");
  }

  let polumjer = 0.06;
  let pocetniVektor = new Vektor2D(centarX, centarY);
  for (let i = 0; i < brojCestica; i++) {
    let tocka = nasumnicnaNormalnaDistribucija(1);
    let cestica = new Cestica(
      0.1,
      new MaterijalnaTocka(
        2 + Math.random(),
        new Vektor2D(tocka[0][0] / 50 + centarX, tocka[1][0] / 50 + centarY),
        new Vektor2D(0, 0)
      ),
      "red"
    );

    cesticeEksplozije.push(cestica);
  }

  djelujPotencijalomNaCestice(pocetniVektor, cesticeEksplozije, polumjer);
}

function djelujPotencijalomNaCestice(
  pocetniVektor,
  cesticeEksplozije,
  polumjer
) {
  let potencijal = new CoulombovPotencijal(150, pocetniVektor, -1, 2);
  let brCestica = cesticeEksplozije.length;
  for (let i = 0; i < brCestica; i++) {
    cesticeEksplozije[i].materijalnaTocka.pomakni(
      0.01,
      potencijal.korigiraniF(cesticeEksplozije[i].materijalnaTocka, polumjer)
    );
  }
}

function brojCesticaJeURasponu(brojCestica) {
  if (!(isNaN(brojCestica) || brojCestica < 1 || brojCestica > 10000)) {
    return true;
  }
  return false;
}
