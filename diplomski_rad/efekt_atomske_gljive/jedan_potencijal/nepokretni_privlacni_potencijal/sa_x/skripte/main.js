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
  let potencijali = [
    new CoulombovPotencijal(800, pozicijaPotencijala, 1, 4),
    new CoulombovPotencijal(
      700,
      new Vektor2D(
        gks.xmin / 2 + gks.xmax / 2,
        3 + gks.ymin / 2 + gks.ymax / 2
      ),
      -1,
      4
    ),
  ];

  let brojCesticaSloja = Number.parseInt(
    document.getElementById("particle-layer-number-setter-value").value
  );
  let xminCestica = Number.parseFloat(
    document.getElementById("particle-layer-xmin-setter-value").value
  );
  let xmaxCestica = Number.parseFloat(
    document.getElementById("particle-layer-xmax-setter-value").value
  );
  let yminCestica = Number.parseFloat(
    document.getElementById("particle-layer-ymin-setter-value").value
  );
  let ymaxCestica = Number.parseFloat(
    document.getElementById("particle-layer-ymax-setter-value").value
  );

  let tocke = Konzola.postaviSlojCestica(
    brojCesticaSloja,
    xminCestica,
    xmaxCestica,
    yminCestica,
    ymaxCestica
  );
  for (let i = 0; i < tocke.length; i++) cestice.push(tocke[i]);
  Konzola.postaviPreciznostSimulacije(1);
  let dt = 1.0 / 60;
  let iframe = 0;
  let starttime = Date.now() / 1000;

  var prviFrame = true;
  Konzola.spremiPocetnoStanjePotencijala(potencijali);
  Konzola.spremiPocetnoStanjeCestica(cestice);
  Konzola.postaviPotencijale();
  iscrtaj();

  function iscrtaj() {
    if (!Konzola.paused) {
      let brCestica = cestice.length;
      for (let i = 0; i < Konzola.preciznostSimulacije; i++) {
        for (let i = 0; i < brCestica; i++) {
          cestice[i].materijalnaTocka.pomakni(
            dt /
              Konzola.preciznostSimulacije /
              Konzola.skalirajBrzinuSlidera(Konzola.brzina),
            Konzola.gravitacija
              .F(cestice[i].materijalnaTocka)
              .zbroji(Konzola.otpor.F(cestice[i].materijalnaTocka))
              .zbroji(
                potencijali[0].korigiraniF(
                  cestice[i].materijalnaTocka,
                  0.5,
                  0.2
                )
                //potencijal.F(cestice[i].materijalnaTocka, 0.5)
              )
              .zbroji(
                potencijali[1].korigiraniF(
                  cestice[i].materijalnaTocka,
                  0.5,
                  0.2
                )
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
      for (let i = 0; i < Konzola.potencijalSave.length; i++) {
        potencijali[i].iscrtaj(gks);
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
