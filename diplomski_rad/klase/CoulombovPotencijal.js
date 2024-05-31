class CoulombovPotencijal {
  static br = 0;
  constructor(k, rVektor, naboj = 1, potencijalUdaljenosti = 2) {
    CoulombovPotencijal.br += 1;
    this.id = CoulombovPotencijal.br;
    this.k = k;
    this.pom = k;
    this.ukljuci = 1;
    this.r = rVektor;
    this.naboj = naboj;
    this.potencijalUdaljenosti = potencijalUdaljenosti;
  }

  F(materijalnaTocka, maxUdaljenost = -1) {
    let rRez = this.r.oduzmi(materijalnaTocka.r);

    let udaljenost = this.r.udaljenost(materijalnaTocka.r);

    if (maxUdaljenost > -1 && maxUdaljenost > udaljenost) {
      this.ukljuci = 0;
    } else {
      //this.k = this.pom;
    }

    let mnozitelj =
      (this.ukljuci * (this.naboj * this.k)) /
      udaljenost ** this.potencijalUdaljenosti;
    return rRez.pomnoziSkalarom(mnozitelj);
  }

  korigiraniF(materijalnaTocka, minUdaljenost, maxUdaljenost = -1) {
    let rRez = this.r.oduzmi(materijalnaTocka.r);

    let udaljenost = this.r.udaljenost(materijalnaTocka.r);
    if (maxUdaljenost > -1 && maxUdaljenost > udaljenost) {
      this.ukljuci = 0;
    }
    let pamti = structuredClone(materijalnaTocka);
    if (minUdaljenost > udaljenost) {
      udaljenost = minUdaljenost;
      //rRez = this.r.oduzmi(materijalnaTocka.r);
      //udaljenost = this.r.udaljenost(materijalnaTocka.r);
    }

    let mnozitelj =
      (this.ukljuci * (this.naboj * this.k)) /
      udaljenost ** this.potencijalUdaljenosti;
    return rRez.pomnoziSkalarom(mnozitelj);
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
