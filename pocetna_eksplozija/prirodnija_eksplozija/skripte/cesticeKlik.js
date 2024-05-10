function cesticeKlik(event, gks, cestice, brojCestica = 20) {
  let canvasPosition = document.getElementById("canvas");
  let x = event.clientX - canvasPosition.offsetLeft;
  let y = event.clientY - canvasPosition.offsetTop;
  let transformirano = gks.transformirajPiksele(x, y);

  for (let i = 0; i < brojCestica; i++) {
    let tocka = nasumnicnaNormalnaDistribucija(1);
    let multi = 4.5;
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
