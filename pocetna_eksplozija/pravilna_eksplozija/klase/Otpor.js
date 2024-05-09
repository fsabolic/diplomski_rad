class Otpor {
  constructor(o) {
    this.o = o;
  }
  F(materijalnaTocka) {
    return new Vektor2D(
      -this.o * materijalnaTocka.v.x,
      -this.o * materijalnaTocka.v.y
    );
  }
}
