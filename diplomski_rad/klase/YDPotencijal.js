class YDPotencijal {
  constructor(k, rVektor, naboj = 1, potencijalUdaljenosti = 2) {
    this.k = k;
    this.pom = k;
    this.r = rVektor;
    this.naboj = naboj;
    this.potencijalUdaljenosti = potencijalUdaljenosti;
  }

  F(materijalnaTocka, maxUdaljenost = -1) {
    let rRez = this.r.oduzmi(materijalnaTocka.r);
    rRez.x = 0;

    let udaljenost = this.r.udaljenost(materijalnaTocka.r);
    if (maxUdaljenost > -1 && maxUdaljenost > udaljenost) {
      this.k = 0;
    }

    let mnozitelj =
      (this.naboj * this.k) / udaljenost ** this.potencijalUdaljenosti;
    return rRez.pomnoziSkalarom(mnozitelj);
  }

  iscrtaj(gks) {
    gks.puniKrug(this.r.x, this.r.y, 0.3, "blue");
  }
}
