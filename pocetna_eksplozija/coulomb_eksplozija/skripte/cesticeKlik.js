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
        new Vektor2D(tocka[0][0] * multi, tocka[1][0] * multi)
      ),
      "red"
    );

    let vektorSmjera = cestica.materijalnaTocka.r.oduzmi(pocetniVektor);
    let originalnaDuljina = vektorSmjera.duljina();

    if (originalnaDuljina < 0.5) {
      let novaDuljina = originalnaDuljina + 0.01;
      let novaPozicijaCesticeX =
        pocetniVektor.x +
        (cestica.materijalnaTocka.r.x - pocetniVektor.x) *
          (novaDuljina / originalnaDuljina);
      let novaPozicijaCesticeY =
        pocetniVektor.y +
        (cestica.materijalnaTocka.r.y - pocetniVektor.y) *
          (novaDuljina / originalnaDuljina);
      cestica.materijalnaTocka.r = new Vektor2D(
        novaPozicijaCesticeX,
        novaPozicijaCesticeY
      );
      cestica.boja = "red";
    }

    kreiraneCestice.push(cestica);
  }

  let potencijal = new CoulombovPotencijal(500, pocetniVektor, -1, 0.6);
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
