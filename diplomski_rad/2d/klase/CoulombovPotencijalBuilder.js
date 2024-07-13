class CoulombovPotencijalBuilder {
  constructor(k, rVektor, naboj) {
    this.potencijal = new CoulombovPotencijal(k, rVektor, naboj);
  }

  setPotencijalUdaljenosti(potencijalUdaljenosti) {
    this.potencijal.potencijalUdaljenosti = potencijalUdaljenosti;
    return this;
  }

  setMaxUdaljenost(maxUdaljenost) {
    this.potencijal.maxUdaljenost = maxUdaljenost;
    return this;
  }

  setMinUdaljenost(minUdaljenost) {
    this.potencijal.minUdaljenost = minUdaljenost;
    return this;
  }

  setXMnozitelj(xMnozitelj) {
    this.potencijal.xMnozitelj = xMnozitelj;
    return this;
  }

  setPomak(pomak) {
    this.potencijal.pomak = pomak;
    return this;
  }

  build() {
    let krajnjiPotencijal = this.potencijal;
    this.potencijal = null;
    return krajnjiPotencijal;
  }
}
