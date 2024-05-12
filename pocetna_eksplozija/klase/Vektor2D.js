class Vektor2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  } // constructor

  dodajCputaV(c, v) {
    this.x += c * v.x;
    this.y += c * v.y;
  } // dodajCputaV

  zbroji(v2) {
    return new Vektor2D(this.x + v2.x, this.y + v2.y);
  }

  oduzmi(v2) {
    return new Vektor2D(this.x - v2.x, this.y - v2.y);
  }

  pomnoziSkalarom(s) {
    return new Vektor2D(this.x * s, this.y * s);
  }

  udaljenost(v2) {
    let x = (this.x - v2.x) ** 2;
    let y = (this.y - v2.y) ** 2;

    return Math.sqrt(x + y);
  }
  rotirajOkoPocetka(kut) {
    kut = kut * (Math.PI / 180);

    let matrica = [
      [Math.cos(kut), -Math.sin(kut)],
      [Math.sin(kut), Math.cos(kut)],
    ];

    let zbrojX = 0;
    let zbrojY = 0;

    for (let i = 0; i < 2; i++) {
      zbrojX += this.x * matrica[0][i];
    }
    for (let i = 0; i < 2; i++) {
      zbrojY += this.y * matrica[1][i];
    }

    return new Vektor2D(zbrojX, zbrojY);
  }

  duljina() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
} // class Vektor
