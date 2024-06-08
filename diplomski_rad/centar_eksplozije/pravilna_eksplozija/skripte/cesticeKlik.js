function cesticeKlik(event, gks, cestice, brojCestica = 20) {
  brojCestica = provjeriHtmlBrojCestica(brojCestica);
  let canvasPosition = document.getElementById("canvas");
  let canvasGranica = window.getComputedStyle(canvasPosition);
  let x = event.clientX - canvasPosition.offsetLeft;
  let y = event.clientY - canvasPosition.offsetTop;
  let transformirano = gks.transformirajPiksele(
    x - parseFloat(canvasGranica.borderLeftWidth),
    y - parseFloat(canvasGranica.borderRightWidth)
  );

  let pocetniVektor = new Vektor2D(4, 4);
  for (let i = 0; i < brojCestica; i++) {
    let cestica = new Cestica(
      0.1,
      new MaterijalnaTocka(
        2,
        new Vektor2D(transformirano[0], transformirano[1]),
        pocetniVektor.rotirajOkoPocetka((i * 360) / brojCestica)
      ),
      "red"
    );
    cestice.push(cestica);
  }
  //console.log(cestice.length);
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
