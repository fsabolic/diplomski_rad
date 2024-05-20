function cesticeKlik(event, gks, cestice, brojCestica = 20) {
  brojCestica = provjeriHtmlBrojCestica(brojCestica);
  let canvasPosition = document.getElementById("canvas");
  let canvasGranica = window.getComputedStyle(canvas);
  let x = event.clientX - canvasPosition.offsetLeft;
  let y = event.clientY - canvasPosition.offsetTop;
  let transformirano = gks.transformirajPiksele(
    x - parseFloat(canvasGranica.borderLeftWidth),
    y - parseFloat(canvasGranica.borderRightWidth)
  );

  for (let i = 0; i < brojCestica; i++) {
    let tocka = nasumnicnaNormalnaDistribucija(1);
    let multi = 3;
    let cestica = new Cestica(
      0.1,
      new MaterijalnaTocka(
        2 + Math.random(),
        new Vektor2D(transformirano[0], transformirano[1]),
        new Vektor2D(tocka[0][0] * multi, tocka[1][0] * multi)
      ),
      "red"
    );
    cestice.push(cestica);
  }
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
