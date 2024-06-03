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
  }
  setKlikEksplozija(klikEksplozija) {
    this.klikEksplozija = klikEksplozija;
    return this;
  }

  setGksXmin(gksXmin) {
    this.gksXmin = gksXmin;
    return this;
  }

  setGksXmax(gksXmax) {
    this.gksXmax = gksXmax;
    return this;
  }

  setGksYmin(gksYmin) {
    this.gksYmin = gksYmin;
    return this;
  }

  setGksYmax(gksYmax) {
    this.gksYmax = gksYmax;
    return this;
  }

  setListaPotencijala(listaPotencijala) {
    this.listaPotencijala = listaPotencijala;
    return this;
  }

  setPreciznostSimulacije(preciznostSimulacije) {
    this.preciznostSimulacije = preciznostSimulacije;
    return this;
  }

  setPrviFrame(prviFrame) {
    this.prviFrame = prviFrame;
    return this;
  }
}
