function cesticeKlik(event, gks, cestice, brojCestica = 20) {
  let canvasPosition = document.getElementById("canvas");
  let x = event.clientX - canvasPosition.offsetLeft;
  let y = event.clientY - canvasPosition.offsetTop;
  let transformirano = gks.transformirajPiksele(x, y);

  let pocetniVektor = new Vektor2D(10, 10);
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
