function main(platno) {
  let brojacCestica = document.getElementById("particle-counter-value");
  var cestice = Konzola.postaviBrojac(brojacCestica);
  platno.addEventListener(
    "click",
    (event) => {
      cesticeKlik(event, gks, cestice, 1000);
    },
    false
  );
  let gks = new GlobalniKoordinatniSustav(platno, 0, 10, 0, 10);
  Konzola.postaviGranice();
  let gravInput = document.getElementById("gravity-setter-value").value;
  let otporInput = document.getElementById("resistance-setter-value").value;
  Konzola.postaviGravitaciju(new Fizika(gravInput));
  Konzola.postaviOtpor(new Otpor(otporInput));

  //OK EKSPLOZIJE
  //vektor   koef    potencijal debljina
  // (5,5)   5000        5         1
  // (5,5)    800        4         2

  let pozicijaPotencijala = new Vektor2D(
    gks.xmin / 2 + gks.xmax / 2,
    0 + gks.ymin / 2 + gks.ymax / 2
  );
  let potencijal = new YDPotencijal(700, pozicijaPotencijala, 1, 4);

  let tocke = generirajStacionarneCestice(
    3500,
    gks.xmin,
    gks.xmax,
    gks.xmin,
    1
  );

  let debljinaSloja = 2;
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
  Konzola.spremiPocetnoStanjePotencijala(potencijal);
  Konzola.spremiPocetnoStanjeCestica(cestice);
  iscrtaj();

  function iscrtaj() {
    if (!Konzola.paused) {
      let brCestica = cestice.length;
      for (let i = 0; i < brIteracija; i++) {
        for (let i = 0; i < brCestica; i++) {
          cestice[i].materijalnaTocka.pomakni(
            dt / Konzola.skalirajBrzinuSlidera(Konzola.brzina),
            Konzola.gravitacija
              .F(cestice[i].materijalnaTocka)
              .zbroji(Konzola.otpor.F(cestice[i].materijalnaTocka))
              .zbroji(
                potencijal.korigiraniF(cestice[i].materijalnaTocka, 0.5, 0.1)
                //potencijal.F(cestice[i].materijalnaTocka, 0.5)
              )
          );
          cestice[i].zarobi(
            gks,
            Konzola.topGranica,
            Konzola.rightGranica,
            Konzola.bottomGranica,
            Konzola.leftGranica
          );
        }
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
        Konzola.paused = true;
      }
    }
    requestAnimationFrame(iscrtaj);
  }
}
