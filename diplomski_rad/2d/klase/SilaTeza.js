class SilaTeza {
  constructor(g) {
    this.g = g;
  }

  F(mt) {
    return new Vektor2D(0, mt.masa * -this.g);
  }
}
