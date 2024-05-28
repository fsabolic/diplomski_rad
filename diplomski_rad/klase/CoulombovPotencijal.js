class CoulombovPotencijal {
  constructor(k, rVektor, naboj = 1, potencijalUdaljenosti = 2) {
    this.k = k;
    this.pom = k;
    this.r = rVektor;
    this.naboj = naboj;
    this.potencijalUdaljenosti = potencijalUdaljenosti;
  }

  F(materijalnaTocka, maxUdaljenost = -1) {
    let rRez = this.r.oduzmi(materijalnaTocka.r);

    let udaljenost = this.r.udaljenost(materijalnaTocka.r);

    if (maxUdaljenost > -1 && maxUdaljenost > udaljenost) {
      this.k = 0;
    } else {
      //this.k = this.pom;
    }

    let mnozitelj =
      (this.naboj * this.k) / udaljenost ** this.potencijalUdaljenosti;
    return rRez.pomnoziSkalarom(mnozitelj);
  }

  korigiraniF(materijalnaTocka, minUdaljenost) {
    let rRez = this.r.oduzmi(materijalnaTocka.r);

    let udaljenost = this.r.udaljenost(materijalnaTocka.r);

    let pamti = structuredClone(materijalnaTocka);
    if (minUdaljenost > udaljenost) {
      udaljenost = minUdaljenost;
      //rRez = this.r.oduzmi(materijalnaTocka.r);
      //udaljenost = this.r.udaljenost(materijalnaTocka.r);
    }

    let mnozitelj =
      (this.naboj * this.k) / udaljenost ** this.potencijalUdaljenosti;
    return rRez.pomnoziSkalarom(mnozitelj);
  }

  iscrtaj(gks) {
    let color = "blue";
    if (this.naboj < 0) color = "red";
    if (this.k != 0) gks.puniKrug(this.r.x, this.r.y, 0.1, color);
  }
}
