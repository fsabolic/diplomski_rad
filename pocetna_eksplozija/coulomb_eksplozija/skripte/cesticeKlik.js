function cesticeKlik(event, gks, cestice, brojCestica = 20) {
  let canvasPosition = document.getElementById("canvas");
  let canvasGranica = window.getComputedStyle(canvas);
  let x = event.clientX - canvasPosition.offsetLeft;
  let y = event.clientY - canvasPosition.offsetTop;
  let transformirano = gks.transformirajPiksele(
    x - parseFloat(canvasGranica.borderLeftWidth),
    y - parseFloat(canvasGranica.borderRightWidth)
  );

  let kreiraneCestice = [];
  let pocetniVektor = new Vektor2D(transformirano[0], transformirano[1]);
  for (let i = 0; i < brojCestica; i++) {
    let tocka = nasumnicnaNormalnaDistribucija(1);
    let multi = 2;
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

    let vektorSmjera = cestica.materijalnaTocka.r.oduzmi(pocetniVektor);
    let originalnaDuljina = vektorSmjera.duljina();

    if (originalnaDuljina < 0.5) {
      cestica.materijalnaTocka.r = pocetniVektor.udaljiVektor(
        cestica.materijalnaTocka.r,
        1,
        0.006
      );
    }

    kreiraneCestice.push(cestica);
  }

  let potencijal = new CoulombovPotencijal(25, pocetniVektor, -1, 2);
  let brCestica = kreiraneCestice.length;
  for (let i = 0; i < brCestica; i++) {
    kreiraneCestice[i].materijalnaTocka.pomakni(
      0.01,
      potencijal.F(kreiraneCestice[i].materijalnaTocka)
    );
    kreiraneCestice[i].zarobi(gks);
  }

  cestice.push(...kreiraneCestice);
}
