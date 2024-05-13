class Fizika {
  constructor(g) {
    this.g = g; // jakost polja sile teže
  } // constructor

  // sila teža
  F(mt) {
    return new Vektor2D(0, mt.masa * -this.g);
  } // F
} // class Fizika
