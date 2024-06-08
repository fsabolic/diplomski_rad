class Parametri {
  constructor() {
    this.klikEksplozija = null;
    this.gksXmin = 0;
    this.gksXmax = 10;
    this.gksYmin = 0;
    this.gksYmax = 2;
    this.listaPotencijala = [];
    this.preciznostSimulacije = 1;
    this.prviFrame = true;
    this.brEksplozije = 1000;
    this.gravitacija = new Fizika(9.81);
    this.otpor = new Otpor(0.47);
    this.granice = { left: true, top: false, right: top, bottom: true };
    this.velicinaSloja = 1000;
    this.xminSloja = this.gksXmin;
    this.xmaxSloja = this.gksXmax;
    this.yminSloja = this.gksYmin;
    this.ymaxSloja = this.gksYmax;
  }

  postaviParametre(parametri) {
    this.klikEksplozija = parametri.klikEksplozija;
    this.gksXmin = parametri.gksXmin;
    this.gksXmax = parametri.gksXmax;
    this.gksYmin = parametri.gksYmin;
    this.gksYmax = parametri.gksYmax;
    this.listaPotencijala = parametri.listaPotencijala;
    this.preciznostSimulacije = parametri.preciznostSimulacije;
    this.prviFrame = parametri.prviFrame;
    this.brEksplozije = parametri.brEksplozije;
    this.gravitacija = parametri.gravitacija;
    this.otpor = parametri.otpor;
    this.granice = parametri.granice;
    this.velicinaSloja = parametri.velicinaSloja;
    this.xminSloja = parametri.xminSloja;
    this.xmaxSloja = parametri.xmaxSloja;
    this.yminSloja = parametri.yminSloja;
    this.ymaxSloja = parametri.ymaxSloja;
    return this;
  }
}
