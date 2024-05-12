function cesticeKlik(event, gks, cestice, brojCestica = 20) {
  let canvasPosition = document.getElementById("canvas");
  let canvasGranica = window.getComputedStyle(canvas);
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
