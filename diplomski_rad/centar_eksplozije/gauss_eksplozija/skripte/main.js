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

  let gravInput = document.getElementById("gravity-setter-value").value;
  let otporInput = document.getElementById("resistance-setter-value").value;
  Konzola.postaviGravitaciju(new Fizika(gravInput));
  Konzola.postaviOtpor(new Otpor(otporInput));

  let brIteracija = 1;
  let dt = 1.0 / 60 / brIteracija;
  let iframe = 0;
  let starttime = Date.now() / 1000;
  var prviFrame = false;
  Konzola.spremiPocetnoStanjeCestica(cestice);
  iscrtaj();

  function iscrtaj() {
    if (!Konzola.paused) {
      let brCestica = cestice.length;
      for (let i = 0; i < brIteracija; i++) {
        for (let i = 0; i < brCestica; i++) {
          cestice[i].materijalnaTocka.pomakni(
            dt / Konzola.skaliraj(Konzola.brzina),
            Konzola.gravitacija
              .F(cestice[i].materijalnaTocka)
              .zbroji(Konzola.otpor.F(cestice[i].materijalnaTocka))
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
