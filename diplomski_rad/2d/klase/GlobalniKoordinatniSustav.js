class GlobalniKoordinatniSustav {
  constructor(platno, xmin, xmax, ymin, ymax) {
    this.g = platno.getContext("2d");
    this.w = platno.width;
    this.h = platno.height;

    this.sx = this.w / (xmax - xmin);
    this.sy = -this.h / (ymax - ymin);
    this.px = -this.sx * xmin;
    this.py = -this.sy * ymax;

    this.xmin = xmin;
    this.xmax = xmax;
    this.ymin = ymin;
    this.ymax = ymax;
  }

  transformirajPiksele(x, y) {
    return [(x - this.px) / this.sx, (y - this.py) / this.sy];
  }

  ocisti() {
    let max = this.h;
    if (this.w > this.h) max = this.w;
    this.g.clearRect(0, 0, this.w, this.h);
  }

  puniKrug(x, y, R, boja) {
    this.g.beginPath();
    this.g.arc(
      this.sx * x + this.px,
      this.sy * y + this.py,
      this.sx * R,
      0,
      2 * Math.PI
    );
    this.g.fillStyle = boja;
    this.g.fill();
  }

  piksel(x, y, boja) {
    this.g.fillStyle = boja;
    this.g.fillRect(this.sx * x + this.px, this.sy * y + this.py, 1, 1);
  }

  tekst(str, x, y, font = "16px Arial") {
    this.g.font = font;
    this.g.fillStyle = "white";
    this.g.fillText(str, this.sx * x + this.px, this.sy * y + this.py);
  }
}
