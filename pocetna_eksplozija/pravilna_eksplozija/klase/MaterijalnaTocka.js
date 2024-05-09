class MaterijalnaTocka {
  constructor(masa, rVektor, vVektor) {
    this.masa = masa;
    this.r = rVektor;
    this.v = vVektor;
  } // constructor

  // 2. Newtonov zakon
  pomakni(dt, rezultantnaSila) {
    this.v.dodajCputaV(dt / this.masa, rezultantnaSila);
    this.r.dodajCputaV(dt, this.v);
  } // pomakni
} // class MT
