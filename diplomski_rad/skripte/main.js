function main(defaultVrijednosti, parametri) {
  let listaPotencijala = parametri.listaPotencijala;
  let prviFrame = parametri.prviFrame;

  Konzola.initKonzola(defaultVrijednosti, parametri);
  let potencijali = Konzola.potencijalSave;
  let cestice = Konzola.cesticeSave;
  let dt = 1.0 / 60;
  let iframe = 0;
  let starttime = Date.now() / 1000;
  var prviFramePauziran = prviFrame;

  iscrtaj();

  function iscrtaj() {
    if (!Konzola.paused) {
      let brCestica = cestice.length;
      for (let i = 0; i < Konzola.preciznostSimulacije; i++) {
        for (let i = 0; i < brCestica; i++) {
          let vremenskiPomak =
            dt /
            Konzola.preciznostSimulacije /
            Konzola.skaliraj(Konzola.brzina);

          let rezultantnaSilaPotencijala = potencijali.reduce((zbroj, p) => {
            return zbroj.zbroji(
              p.korigiraniF(cestice[i].materijalnaTocka, 0.5, 0.2)
            );
          }, new Vektor2D(0, 0));
          cestice[i].materijalnaTocka.pomakni(
            vremenskiPomak,
            Konzola.gravitacija
              .F(cestice[i].materijalnaTocka)
              .zbroji(Konzola.otpor.F(cestice[i].materijalnaTocka))
              .zbroji(rezultantnaSilaPotencijala)
          );
          cestice[i].zarobi(
            Konzola.gks,
            Konzola.topGranica,
            Konzola.rightGranica,
            Konzola.bottomGranica,
            Konzola.leftGranica
          );
        }
      }

      Konzola.gks.ocisti();
      for (let i = 0; i < brCestica; i++) {
        cestice[i].iscrtaj(Konzola.gks);
      }
      for (let i = 0; i < Konzola.potencijalSave.length; i++) {
        potencijali[i].iscrtaj(Konzola.gks);
      }
      let framerate = (iframe++ / (Date.now() / 1000 - starttime)).toFixed(6);
      Konzola.gks.tekst("FPS: " + framerate, 0.5, 9.5);

      if (prviFramePauziran) {
        prviFramePauziran = false;
        Konzola.paused = true;
      }
    }
    requestAnimationFrame(iscrtaj);
  }
}
