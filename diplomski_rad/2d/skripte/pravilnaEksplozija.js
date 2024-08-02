function pravilnaEksplozija(centarX, centarY, brojCestica, cesticeEksplozije) {
  if (!brojCesticaJeURasponu(brojCestica)) {
    throw Error("Broj čestica u eksploziji nije dobro definiran!");
  }

  let pocetniVektor = new Vektor2D(4, 4);
  for (let i = 0; i < brojCestica; i++) {
    let cestica = new Cestica(
      0.1,
      new MaterijalnaTocka(
        2,
        new Vektor2D(centarX, centarY),
        pocetniVektor.rotirajOkoPocetka((i * 360) / brojCestica)
      )
    );
    cesticeEksplozije.push(cestica);
  }
}

function brojCesticaJeURasponu(brojCestica) {
  if (!(isNaN(brojCestica) || brojCestica < 1 || brojCestica > 10000)) {
    return true;
  }
  return false;
}
