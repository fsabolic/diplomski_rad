class YDPotencijal {
  static br = 0;
  constructor(
    k,
    rVektor,
    naboj = 1,
    potencijalUdaljenosti = 2,
    minUdaljenost = -1,
    maxUdaljenost = -1
  ) {
    YDPotencijal.br += 1;
    this.id = YDPotencijal.br;
    this.k = k;
    this.pom = k;
    this.ukljuci = 1;
    this.r = rVektor;
    this.naboj = naboj;
    this.potencijalUdaljenosti = potencijalUdaljenosti;
    this.maxUdaljenost = maxUdaljenost;
    this.minUdaljenost = minUdaljenost;
  }

  F(materijalnaTocka) {
    let rRez = this.r.oduzmi(materijalnaTocka.r);
    rRez.x = 0;

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

  iscrtaj(gks) {
    let color = "blue";
    if (this.naboj < 0) color = "red";
    if (this.ukljuci != 0) {
      gks.puniKrug(this.r.x, this.r.y, 0.1, color);
      gks.tekst(this.id, this.r.x - 0.04, this.r.y - 0.06, "9px Arial");
    }
  }
}
