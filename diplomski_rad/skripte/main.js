function main(defaultVrijednosti, parametri) {
  Konzola.initKonzola(defaultVrijednosti, parametri);
  let potencijali = Konzola.potencijalSave;
  let cestice = Konzola.cesticeSave;
  let dt = 1.0 / 60;
  let iframe = 0;
  let starttime = Date.now() / 1000;

  iscrtaj();

  function iscrtaj() {
    if (!Konzola.paused) {
      let brCestica = cestice.length;
      let vremenskiPomak = 0;
      for (let j = 0; j < Konzola.preciznostSimulacije; j++) {
        for (let i = 0; i < brCestica; i++) {
          vremenskiPomak =
            dt /
            Konzola.preciznostSimulacije /
            Konzola.skalirajBrzinuSlidera(Konzola.brzina);
          let rezultantnaSilaPotencijala = potencijali.reduce((zbroj, p) => {
            return zbroj.zbroji(p.F(cestice[i].materijalnaTocka, 0.5, 0.2));
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
        potencijali[i].pomakni(vremenskiPomak * Konzola.preciznostSimulacije);
      }
      let framerate = (iframe++ / (Date.now() / 1000 - starttime)).toFixed(6);
      Konzola.gks.tekst("FPS: " + framerate, 0.5, 9.5);

      if (Konzola.prviFrame) {
        Konzola.prviFrame = false;
        Konzola.paused = true;
      }
    }
    requestAnimationFrame(iscrtaj);
  }
}
