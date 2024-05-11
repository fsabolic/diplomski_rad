class CoulombovPotencijal {
  constructor(k, rVektor, naboj = 1) {
    this.k = k;
    this.r = rVektor;
    this.naboj = naboj;
  }

  F(materijalnaTocka) {
    let rRez = this.r.oduzmi(materijalnaTocka.r);

    let udaljenost = this.r.udaljenost(materijalnaTocka.r);

    return rRez
      .pomnoziSkalarom(this.naboj * this.k)
      .pomnoziSkalarom(1 / udaljenost ** 2);
  }

  iscrtaj(gks) {
    gks.puniKrug(this.r.x, this.r.y, 0.3, "blue");
  }
}
