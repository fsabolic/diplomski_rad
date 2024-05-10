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
  } // constructor

  transformirajPiksele(x, y) {
    return [(x - this.px) / this.sx, (y - this.py) / this.sy];
  }
  ocisti() {
    let max = this.h;
    if (this.w > this.h) max = this.w;
    this.g.clearRect(0, 0, max, max);
  } // ocisti

  postaviNa(x, y) {
    this.g.beginPath();
    this.g.moveTo(this.sx * x + this.px, this.sy * y + this.py);
  } // postaviNa

  linijaDo(x, y) {
    this.g.lineTo(this.sx * x + this.px, this.sy * y + this.py);
  } // linijaDo

  koristiBoju(c) {
    this.g.strokeStyle = c;
  } // koristiBoju

  povuciLiniju() {
    this.g.stroke();
  } // povuciLiniju

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
  } // puniKrug

  piksel(x, y, boja) {
    this.g.fillStyle = boja;
    this.g.fillRect(this.sx * x + this.px, this.sy * y + this.py, 3, 3);
  }
  tekst(str, x, y) {
    this.g.font = "16px Arial";
    this.g.fillStyle = "black";
    this.g.fillText(str, this.sx * x + this.px, this.sy * y + this.py);
  } // tekst
} // class GKS
