function main(platno) {
  let brojacCestica = document.getElementById("particle-counter-value");
  var cestice = postaviBrojac(brojacCestica);
  /*
  platno.addEventListener(
    "click",
    (event) => {
      cesticeKlik(event, gks, cestice, 1000);
    },
    false
  );
  */
  let gks = new GlobalniKoordinatniSustav(platno, 0, 10, 0, 10);
  let fizika = new Fizika(9.81);
  let otpor = new Otpor(0);

  //OK EKSPLOZIJE
  //vektor   koef    potencijal debljina
  // (5,5)   5000        5         1
  // (5,5)    800        4         2

  let pozicijaPotencijala = new Vektor2D(
    gks.xmin / 2 + gks.xmax / 2,
    -3.92 + gks.ymin / 2 + gks.ymax / 2
  );
  let potencijal = new CoulombovPotencijal(11, pozicijaPotencijala, 1, 2);

  let tocke = generirajStacionarneCestice(
    5500,
    gks.xmin,
    gks.xmax,
    gks.xmin,
    1
  );

  let debljinaSloja = 1;
  for (let i = 0; i < tocke.length; i++) {
    tocke[i].materijalnaTocka.r.y =
      debljinaSloja * tocke[i].materijalnaTocka.r.y;
    cestice.push(tocke[i]);
  }
  let brIteracija = 1;
  let dt = 1.0 / 60 / brIteracija;
  let iframe = 0;
  let starttime = Date.now() / 1000;

  var prviFrame = true;
  iscrtaj();

  function iscrtaj() {
    if (!paused) {
      let brCestica = cestice.length;
      for (let i = 0; i < brIteracija; i++) {
        for (let i = 0; i < brCestica; i++) {
          cestice[i].materijalnaTocka.pomakni(
            dt / skaliraj(brzina),
            fizika
              .F(cestice[i].materijalnaTocka)
              .zbroji(otpor.F(cestice[i].materijalnaTocka))
              .zbroji(potencijal.F(cestice[i].materijalnaTocka, 0.0))
          );
          cestice[i].zarobi(gks);
        }

        potencijal.r.y += 0.12;
      }
      gks.ocisti();
      for (let i = 0; i < brCestica; i++) {
        cestice[i].iscrtaj(gks);
      }
      potencijal.iscrtaj(gks);
      let framerate = (iframe++ / (Date.now() / 1000 - starttime)).toFixed(6);
      gks.tekst("FPS: " + framerate, 0.5, 9.5);

      if (prviFrame) {
        prviFrame = false;
        paused = true;
      }
    }
    requestAnimationFrame(iscrtaj);
  }
}
