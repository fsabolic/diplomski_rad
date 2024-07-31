class Parametri {
  constructor() {
    this.klikEksplozija = null;
    this.gksXmin = 0;
    this.gksXmax = 10;
    this.gksYmin = 0;
    this.gksYmax = 10;
    this.listaPotencijala = [];
    this.preciznostSimulacije = 1;
    this.prviFrame = true;
    this.brEksplozije = 1000;
    this.gravitacija = new SilaTeza(0);
    this.otpor = new Otpor(0);
    this.granice = { left: true, top: true, right: true, bottom: true };
    this.velicinaSloja = 0;
    this.xminSloja = this.gksXmin;
    this.xmaxSloja = this.gksXmax;
    this.yminSloja = this.gksYmin;
    this.ymaxSloja = this.gksYmax;
  }

  postaviParametre(parametri) {
    this.setKlikEksplozija(parametri.klikEksplozija);
    this.setGksXmin(parametri.gksXmin);
    this.setGksXmax(parametri.gksXmax);
    this.setGksYmin(parametri.gksYmin);
    this.setGksYmax(parametri.gksYmax);
    this.setListaPotencijala(parametri.listaPotencijala);
    this.setPreciznostSimulacije(parametri.preciznostSimulacije);
    this.setPrviFrame(parametri.prviFrame);
    this.setBrEksplozije(parametri.brEksplozije);
    this.setGravitacija(parametri.gravitacija);
    this.setOtpor(parametri.otpor);
    this.setGranice(parametri.granice);
    this.setVelicinaSloja(parametri.velicinaSloja);
    this.setXminSloja(parametri.xminSloja);
    this.setXmaxSloja(parametri.xmaxSloja);
    this.setYminSloja(parametri.yminSloja);
    this.setYmaxSloja(parametri.ymaxSloja);
    return this;
  }

  setKlikEksplozija(klikEksplozija = null) {
    if (klikEksplozija == null) klikEksplozija = this.klikEksplozija;
    this.klikEksplozija = klikEksplozija;
  }
  setGksXmin(gksXmin = null) {
    if (gksXmin == null) gksXmin = this.gksXmin;
    this.gksXmin = gksXmin;
  }

  setGksXmax(gksXmax = null) {
    if (gksXmax == null) gksXmax = this.gksXmax;
    this.gksXmax = gksXmax;
  }

  setGksYmin(gksYmin = null) {
    if (gksYmin == null) gksYmin = this.gksYmin;
    this.gksYmin = gksYmin;
  }

  setGksYmax(gksYmax = null) {
    if (gksYmax == null) gksYmax = this.gksYmax;
    this.gksYmax = gksYmax;
  }

  setListaPotencijala(listaPotencijala = null) {
    if (listaPotencijala == null) listaPotencijala = this.listaPotencijala;
    this.listaPotencijala = listaPotencijala;
  }

  setPreciznostSimulacije(preciznostSimulacije = null) {
    if (preciznostSimulacije == null)
      preciznostSimulacije = this.preciznostSimulacije;
    this.preciznostSimulacije = preciznostSimulacije;
  }

  setPrviFrame(prviFrame = null) {
    if (prviFrame == null) prviFrame = this.prviFrame;
    this.prviFrame = prviFrame;
  }

  setBrEksplozije(brEksplozije = null) {
    if (brEksplozije == null) brEksplozije = this.brEksplozije;
    this.brEksplozije = brEksplozije;
  }

  setGravitacija(gravitacija = null) {
    if (gravitacija == null) gravitacija = this.gravitacija;
    this.gravitacija = gravitacija;
  }

  setOtpor(otpor = null) {
    if (otpor == null) otpor = this.otpor;
    this.otpor = otpor;
  }

  setGranice(granice = null) {
    if (granice == null) granice = this.granice;
    this.granice = granice;
  }

  setVelicinaSloja(velicinaSloja = null) {
    if (velicinaSloja == null) velicinaSloja = this.velicinaSloja;
    this.velicinaSloja = velicinaSloja;
  }

  setXminSloja(xminSloja = null) {
    if (xminSloja == null) xminSloja = this.xminSloja;
    this.xminSloja = xminSloja;
  }

  setXmaxSloja(xmaxSloja = null) {
    if (xmaxSloja == null) xmaxSloja = this.xmaxSloja;
    this.xmaxSloja = xmaxSloja;
  }

  setYminSloja(yminSloja = null) {
    if (yminSloja == null) yminSloja = this.yminSloja;
    this.yminSloja = yminSloja;
  }

  setYmaxSloja(ymaxSloja = null) {
    if (ymaxSloja == null) ymaxSloja = this.ymaxSloja;
    this.ymaxSloja = ymaxSloja;
  }
}
