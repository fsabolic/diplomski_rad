var listaImporta = [
  "/diplomski_rad/klase/Vektor2D.js",
  "/diplomski_rad/klase/Fizika.js",
  "/diplomski_rad/klase/Cestica.js",
  "/diplomski_rad/klase/Otpor.js",
  "/diplomski_rad/klase/GlobalniKoordinatniSustav.js",
  "/diplomski_rad/klase/YDPotencijal.js",
  "/diplomski_rad/klase/CoulombovPotencijal.js",
  "/diplomski_rad/klase/Konzola.js",
  "/diplomski_rad/klase/Parametri.js",
  "skripte/generirajCestice.js",
  "skripte/gaussDistribucija.js",
  "/diplomski_rad/klase/MaterijalnaTocka.js",
  "/diplomski_rad/skripte/pravilnaEksplozija.js",
  "/diplomski_rad/skripte/gaussEksplozija.js",
  "/diplomski_rad/skripte/coulombEksplozija.js",
  "/diplomski_rad/skripte/visestrukiCoulombEksplozija.js",
  "/diplomski_rad/skripte/main.js",
];

var link = document.createElement("link");
link.rel = "stylesheet";
link.href = "/diplomski_rad/css/global.css";
document.head.appendChild(link);

for (let i = 0; i < listaImporta.length; i++) {
  var script = document.createElement("script");
  script.src = listaImporta[i];
  document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("/diplomski_rad/simulator.html")
    .then((htmlKomponenta) => htmlKomponenta.text())
    .then((htmlKomponenta) => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlKomponenta;

      const komponenta = tempDiv.querySelector(".page-container");
      document.getElementById("template-container").innerHTML =
        komponenta.innerHTML;

      pokreni();
    })
    .catch((error) => console.error("Greška pri učitavanju HTML-a:", error));
});
