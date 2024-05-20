function main(platno) {
  var cestice = postaviBrojac();
  platno.addEventListener(
    "click",
    (event) => {
      cesticeKlik(event, gks, cestice, 1000);
    },
    false
  );
  let gks = new GlobalniKoordinatniSustav(platno, 0, 10, 0, 10);
  let fizika = new Fizika(0);
  let otpor = new Otpor(0.47);

  let brIteracija = 1;
  let dt = 1.0 / 60 / brIteracija;
  let iframe = 0;
  let starttime = Date.now() / 1000;

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
          );
          cestice[i].zarobi(gks);
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
        paused = true;
      }
    }
    requestAnimationFrame(iscrtaj);
  }
}
