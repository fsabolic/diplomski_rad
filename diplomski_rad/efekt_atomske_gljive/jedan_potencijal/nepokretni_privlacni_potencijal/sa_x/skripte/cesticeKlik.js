function cesticeKlik(event, gks, cestice, brojCestica = 20) {
  brojCestica = provjeriHtmlBrojCestica(brojCestica);
  let transformirano = odrediKoordinateKlika(event, gks);

  let kreiraneCestice = [];
  let pocetniVektor = new Vektor2D(transformirano[0], transformirano[1]);
  for (let i = 0; i < brojCestica; i++) {
    let tocka = nasumnicnaNormalnaDistribucija(1);
    let cestica = new Cestica(
      0.1,
      new MaterijalnaTocka(
        2 + Math.random(),
        new Vektor2D(
          tocka[0][0] / 50 + transformirano[0],
          tocka[1][0] / 50 + transformirano[1]
        ),
        new Vektor2D(0, 0)
      ),
      "red"
    );

    odbaciCesticeUSredini(cestica, pocetniVektor);

    kreiraneCestice.push(cestica);
  }

  djelujPotencijalomNaCestice(pocetniVektor, kreiraneCestice, gks);

  cestice.push(...kreiraneCestice);
}

function odbaciCesticeUSredini(cestica, pocetniVektor) {
  let vektorSmjera = cestica.materijalnaTocka.r.oduzmi(pocetniVektor);
  let originalnaDuljina = vektorSmjera.duljina();

  let polumjer = 0.006;
  if (originalnaDuljina < polumjer) {
    cestica.materijalnaTocka.r = pocetniVektor.udaljiVektor(
      cestica.materijalnaTocka.r,
      1,
      polumjer
    );
  }
}

function djelujPotencijalomNaCestice(pocetniVektor, kreiraneCestice, gks) {
  let potencijal = new CoulombovPotencijal(25, pocetniVektor, -1, 2);
  let brCestica = kreiraneCestice.length;
  for (let i = 0; i < brCestica; i++) {
    kreiraneCestice[i].materijalnaTocka.pomakni(
      0.01,
      potencijal.F(kreiraneCestice[i].materijalnaTocka)
    );
    kreiraneCestice[i].zarobi(gks);
  }
}

function odrediKoordinateKlika(event, gks) {
  let canvasPosition = document.getElementById("canvas");
  let canvasGranica = window.getComputedStyle(canvas);
  let x = event.clientX - canvasPosition.offsetLeft;
  let y = event.clientY - canvasPosition.offsetTop;
  let transformirano = gks.transformirajPiksele(
    x - parseFloat(canvasGranica.borderLeftWidth),
    y - parseFloat(canvasGranica.borderRightWidth)
  );
  return transformirano;
}

function provjeriHtmlBrojCestica(brojCestica) {
  let htmlBrCestica = document.getElementById(
    "particle-number-setter-value"
  ).value;

  if (!(isNaN(htmlBrCestica) || htmlBrCestica < 1 || htmlBrCestica > 10000)) {
    brojCestica = htmlBrCestica;
  }
  return brojCestica;
}
