function visestrukiCoulombEksplozija(
  centarX,
  centarY,
  brojCesticaEksplozije,
  cesticeSave
) {
  if (!brojCesticaJeURasponu(brojCesticaEksplozije)) {
    throw Error("Broj čestica u eksploziji nije dobro definiran!");
  }

  let iteracijeCestica = brojCesticaEksplozije / 40;
  let cesticePoIteraciji = brojCesticaEksplozije / iteracijeCestica;
  for (let i = 0; i < iteracijeCestica; i++) {
    setTimeout(() => {
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
            new Vektor2D(
              tocka[0][0] / 50 + centarX,
              tocka[1][0] / 50 + centarY
            ),
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
    }, 100 / i);
  }
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
    2
  );
  let brCestica = kreiraneCestice.length;
  for (let i = 0; i < brCestica; i++) {
    kreiraneCestice[i].materijalnaTocka.pomakni(
      0.01,
      potencijal.korigiraniF(kreiraneCestice[i].materijalnaTocka, polumjer)
    );
  }
}

function brojCesticaJeURasponu(brojCestica) {
  if (!(isNaN(brojCestica) || brojCestica < 1 || brojCestica > 10000)) {
    return true;
  }
  return false;
}
