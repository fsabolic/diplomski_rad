class Cestica {
  constructor(promjer, materijalnaTocka, boja = "yellow") {
    this.materijalnaTocka = materijalnaTocka;
    this.boja = boja;
    this.promjer = promjer;
  }

  zarobi(gks, top = true, right = true, bottom = true, left = true) {
    if (this.materijalnaTocka.r.x < gks.xmin + this.promjer && left) {
      this.materijalnaTocka.v.x = -this.materijalnaTocka.v.x;
    }
    if (this.materijalnaTocka.r.x > gks.xmax - this.promjer && right) {
      this.materijalnaTocka.v.x = -this.materijalnaTocka.v.x;
    }
    if (this.materijalnaTocka.r.y < gks.ymin + this.promjer && bottom) {
      this.materijalnaTocka.v.y = -this.materijalnaTocka.v.y;
    }
    if (this.materijalnaTocka.r.y > gks.ymax - this.promjer && top) {
      this.materijalnaTocka.v.y = -this.materijalnaTocka.v.y;
    }
    if (this.materijalnaTocka.r.y < gks.ymin + this.promjer && bottom) {
      this.materijalnaTocka.r.y = gks.ymin + this.promjer;
    }
  }

  iscrtaj(gks) {
    gks.piksel(this.materijalnaTocka.r.x, this.materijalnaTocka.r.y, this.boja);
  }
}
