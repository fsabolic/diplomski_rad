class Cestica {
  constructor(promjer, materijalnaTocka, boja) {
    this.materijalnaTocka = materijalnaTocka;
    this.boja = boja;
    this.promjer = promjer;
  } // constructor

  zarobi(gks) {
    if (
      this.materijalnaTocka.r.x < gks.xmin + this.promjer ||
      this.materijalnaTocka.r.x > gks.xmax - this.promjer
    ) {
      this.materijalnaTocka.v.x = -this.materijalnaTocka.v.x;
    }
    if (
      this.materijalnaTocka.r.y < gks.ymin + this.promjer ||
      this.materijalnaTocka.r.y > gks.ymax - this.promjer
    )
      this.materijalnaTocka.v.y = -this.materijalnaTocka.v.y;
    if (this.materijalnaTocka.r.y < gks.ymin + this.promjer) {
      this.materijalnaTocka.r.y = this.promjer;
    }
  } // zarobi

  iscrtaj(gks) {
    gks.piksel(this.materijalnaTocka.r.x, this.materijalnaTocka.r.y, "yellow");
  } // iscrtaj
} // class Loptica
