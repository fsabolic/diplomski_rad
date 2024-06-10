async function visestrukiCoulombEksplozija(
  centarX,
  centarY,
  brojCesticaEksplozije,
  cesticeSave
) {
  if (!brojCesticaJeURasponu(brojCesticaEksplozije)) {
    throw Error("Broj čestica u eksploziji nije dobro definiran!");
  }

  let cesticePoIteraciji = Math.floor(brojCesticaEksplozije * 0.06);
  if (cesticePoIteraciji == 0) cesticePoIteraciji = 1;
  let iteracijeCestica =
    Math.floor(brojCesticaEksplozije / cesticePoIteraciji) + 1;
  let ostatak = brojCesticaEksplozije % cesticePoIteraciji;
  if (ostatak == 0) iteracijeCestica -= 1;
  for (let i = 1; i <= iteracijeCestica; i++) {
    if (iteracijeCestica == i && ostatak != 0) {
      cesticePoIteraciji = ostatak;
    }
    let koeficijentSmanjenja = i;
    let polumjer = 0.06;
    let kreiraneCestice = [];
    let pocetniVektor = new Vektor2D(centarX, centarY);

    for (let j = 0; j < cesticePoIteraciji; j++) {
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
      kreiraneCestice.push(cestica);
    }

    djelujLogPotencijalomNaCestice(
      koeficijentSmanjenja,
      pocetniVektor,
      kreiraneCestice,
      polumjer
    );
    cesticeSave.push(...kreiraneCestice);

    await spavaj(10 / i);
  }
}

function spavaj(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function djelujLogPotencijalomNaCestice(
  koeficijentSmanjenja,
  pocetniVektor,
  kreiraneCestice,
  polumjer
) {
  let potencijal = new CoulombovPotencijal(
    30 * (Math.log(koeficijentSmanjenja) + 0.5),
    pocetniVektor,
    -1,
    2,
    polumjer
  );
  let brCestica = kreiraneCestice.length;
  for (let i = 0; i < brCestica; i++) {
    kreiraneCestice[i].materijalnaTocka.pomakni(
      0.01,
      potencijal.F(kreiraneCestice[i].materijalnaTocka)
    );
  }
}

function brojCesticaJeURasponu(brojCestica) {
  if (!(isNaN(brojCestica) || brojCestica < 1 || brojCestica > 10000)) {
    return true;
  }
  return false;
}
