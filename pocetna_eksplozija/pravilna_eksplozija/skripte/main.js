let paused = false;
function start() {
  console.log("start");
  paused = false;
}
function pause() {
  console.log("pause");
  paused = true;
}

function main(platno) {
  var cestice = [];
  platno.addEventListener(
    "click",
    (event) => {
      cesticeKlik(event, gks, cestice, 100);
    },
    false
  );
  let gks = new GlobalniKoordinatniSustav(platno, 0, 10, 0, 10);
  let fizika = new Fizika(9.81);
  let otpor = new Otpor(0.47);

  let brojCestica = 19000;
  cestice = generirajNasumicneCestice(brojCestica);

  let brIteracija = 1;
  let dt = 1.0 / 60.0 / brIteracija;
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
            dt,
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
