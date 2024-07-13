class CoulombovPotencijal {
  static br = 0;
  constructor(k, rVektor, naboj) {
    this.postaviId();
    this.k = k;
    this.r = rVektor;
    this.naboj = naboj;
    this.ukljuci = 1;
    this.potencijalUdaljenosti = 2;
    this.minUdaljenost = -1;
    this.maxUdaljenost = -1;
    this.xMnozitelj = 1;
    this.pomak = (parametar) => {
      return new Vektor2D(0, 0);
    };
  }

  postaviId() {
    CoulombovPotencijal.br += 1;
    this.id = CoulombovPotencijal.br;
  }

  F(materijalnaTocka) {
    let rRez = this.r.oduzmi(materijalnaTocka.r);
    rRez = this.djelujNaXKomponentu(rRez);

    let udaljenost = this.r.udaljenost(materijalnaTocka.r);

    this.ugasiUkolikoJeCesticaPreblizu(udaljenost);
    udaljenost = this.smanjiDjelovanjeUkolikoJeCesticaPreblizu(udaljenost);

    let mnozitelj =
      (this.ukljuci * (this.naboj * this.k)) /
      udaljenost ** this.potencijalUdaljenosti;
    return rRez.pomnoziSkalarom(mnozitelj);
  }

  //ako čestica dođe na udaljenost manju od minUdaljenosti, djeluj na česticu kao da je minUdaljenost daleko
  smanjiDjelovanjeUkolikoJeCesticaPreblizu(udaljenost) {
    if (this.minUdaljenost > -1 && this.minUdaljenost > udaljenost) {
      udaljenost = this.minUdaljenost;
    }
    return udaljenost;
  }

  //ako čestica bude bliže potencijalu nego što to dopušta maxUdaljenost, ugasi potencijal
  ugasiUkolikoJeCesticaPreblizu(udaljenost) {
    if (this.maxUdaljenost > -1 && this.maxUdaljenost > udaljenost) {
      this.ukljuci = 0;
    }
  }

  //smanjuje ili povećava koliki je utjecaj na x komponentu čestice
  djelujNaXKomponentu(sila) {
    sila.x *= this.xMnozitelj;
    return sila;
  }

  pomakni(parametar) {
    this.r = this.r.zbroji(this.pomak(parametar));
  }

  iscrtaj(gks) {
    let color = "blue";
    if (this.naboj < 0) color = "red";
    if (this.ukljuci != 0) {
      gks.puniKrug(this.r.x, this.r.y, 0.1, color);
      gks.tekst(this.id, this.r.x - 0.04, this.r.y - 0.06, "9px Arial");
    }
  }
}
