document.addEventListener("DOMContentLoaded", function () {
  let predputanja = odrediPredputanju() + "/2d/";

  var listaImporta = [
    "klase/Vektor2D.js",
    "klase/SilaTeza.js",
    "klase/Cestica.js",
    "klase/Otpor.js",
    "klase/GlobalniKoordinatniSustav.js",
    "klase/CoulombovPotencijal.js",
    "klase/CoulombovPotencijalBuilder.js",
    "klase/Konzola.js",
    "klase/Parametri.js",
    "klase/MaterijalnaTocka.js",
    "skripte/distribucije.js",
    "skripte/generirajCestice.js",
    "skripte/pravilnaEksplozija.js",
    "skripte/gaussEksplozija.js",
    "skripte/coulombEksplozija.js",
    "skripte/visestrukiCoulombEksplozija.js",
    "skripte/main.js",
  ];

  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = predputanja + "css/style.css";
  document.head.appendChild(link);

  let scriptLoadPromises = listaImporta.map((src) => {
    return new Promise((resolve, reject) => {
      var script = document.createElement("script");
      script.src = predputanja + src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  });

  Promise.all(scriptLoadPromises)
    .then(() => {
      let htmlKomponenta = dohvatiHtmlKomponentu(predputanja);
      const tempDiv = document.createElement("div");

      tempDiv.innerHTML = htmlKomponenta;

      const komponenta = tempDiv.querySelector(".page-container");
      document.getElementById("template-container").innerHTML =
        komponenta.innerHTML;
      pokreni();
    })
    .catch((error) => {
      console.error("Script loading failed:", error);
    });
});

function odrediPredputanju() {
  let putanja = window.location.pathname;
  let splitPutanja = putanja.split("/");
  let index = splitPutanja.lastIndexOf("diplomski_rad");
  let brTockica = splitPutanja.length - index - 2;
  let predputanja = "";
  for (let i = 0; i < brTockica; i++) predputanja += "../";
  return predputanja;
}

function dohvatiHtmlKomponentu(predputanja) {
  return /*html*/ `
<div class="page-container">
  <div class="canvas-console-container">
    <div class="canvas-container">
      <canvas id="canvas" width="600" height="600">
        Vaš preglednik ne podržava HTML5 canvas.
      </canvas>
    </div>
    <div class="page-console">
      <div class="console-buttons">
        <button type="button" onclick="Konzola.pokreniButtonClickEventHandler()" id="start">
          <img src="${predputanja}assets/play.png" />
        </button>
        <button type="button" onclick="Konzola.pauzirajButtonClickEventHandler()" id="stop">
          <img src="${predputanja}assets/pause.png" />
        </button>
        <button type="button" onclick="Konzola.resetButtonClickEventHandler()" id="reset">
          <img src="${predputanja}assets/restart.png" />
        </button>
        <button type="button" onclick="Konzola.reloadButtonClickEventHandler()" id="reload">
          <img src="${predputanja}assets/reload.png" />
        </button>
      </div>
      <div class="console-speed-slider">
        <p>Brzina:</p>
        <input type="range" min="1" max="1000" value="1000" class="slider" id="sliderSpeed" onchange="Konzola.brzinaSimulacijeSliderEventHandler(this.value)" />
      </div>
      <div class="setters">
        <div class="simulation-precision number-input">
          <p class="number-input-setter-text" id="simulation-precision-text">Preciznost:</p>
          <input class="number-input-setter-value" id="simulation-precision-value" type="text" value="" onfocusout="Konzola.preciznostInputFocusoutEventHandler(event)" />
        </div>
        <div class="particle-counter number-input">
          <p class="number-input-setter-text" id="particle-counter-text">Ukupno čestica:</p>
          <p class="number-input-setter-value" id="particle-counter-value">0</p>
        </div>
        <div class="particle-number-setter number-input">
          <p class="number-input-setter-text" id="particle-number-setter-text">Br. eksplozije:</p>
          <input class="number-input-setter-value" id="particle-number-setter-value" type="text" value="" onfocusout="Konzola.brojEksplozijeInputFocusoutEventHandler(event)" />
        </div>
        <div class="gravity-setter number-input">
          <p class="number-input-setter-text" id="gravity-setter-text">Gravitacija:</p>
          <input class="number-input-setter-value" id="gravity-setter-value" type="text" value="" onfocusout="Konzola.gravitacijaInputFocusoutEventHandler(event)" />
        </div>
        <div class="resistance-setter number-input">
          <p class="number-input-setter-text" id="resistance-setter-text">Otpor:</p>
          <input class="number-input-setter-value" id="resistance-setter-value" type="text" value="" onfocusout="Konzola.otporInputFocusoutEventHandler(event)" />
        </div>
      </div>
      <div class="borders-container">
        <p>Granice odbijanja:</p>
        <div class="borders">
          <div id="top" class="border-item" onclick="Konzola.granicaClickEventHandler(event)"></div>
          <div id="left" class="border-item" onclick="Konzola.granicaClickEventHandler(event)"></div>
          <div id="right" class="border-item" onclick="Konzola.granicaClickEventHandler(event)"></div>
          <div id="bottom" class="border-item" onclick="Konzola.granicaClickEventHandler(event)"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="shroom-console">
    <div class="shroom-console-head">
      <div id="click-handler-radio" class="click-handler-radio">
        <p>Klik:</p>
        <input type="radio" id="radio-pe" name="click_setter" value="pravilnaEksplozija" title="Pravilna eksplozija" onclick="Konzola.klikMetodaSelectEventHandler(this.value)" />
        <label for="radio-pe" title="Pravilna eksplozija">pE</label>
        <input type="radio" id="radio-ge" name="click_setter" value="gaussEksplozija" title="Gauss eksplozija" onclick="Konzola.klikMetodaSelectEventHandler(this.value)" />
        <label for="radio-ge" title="Gauss eksplozija">gE</label>
        <input checked type="radio" id="radio-jce" name="click_setter" value="coulombEksplozija" title="Jednostruki Coulomb eksplozija" onclick="Konzola.klikMetodaSelectEventHandler(this.value)" />
        <label for="radio-jce" title="Jednostruki Coulomb eksplozija">jcE</label>
        <input type="radio" id="radio-vce" name="click_setter" value="visestrukiCoulombEksplozija" title="Višestruki Coulomb eksplozija" onclick="Konzola.klikMetodaSelectEventHandler(this.value)" />
        <label for="radio-vce" title="Višestruki Coulomb eksplozija">vcE</label>
        <input type="radio" id="radio-dp" name="click_setter" value="dodavanjePotencijala" title="Dodavanje potencijala" onclick="Konzola.klikMetodaSelectEventHandler(this.value)" />
        <label for="radio-dp" title="Dodavanje potencijala">dP</label>
        <input type="radio" id="radio-no" name="click_setter" value="praznaFunkcija" title="Ništa" onclick="Konzola.klikMetodaSelectEventHandler(this.value)" />
        <label for="radio-no" title="Prazna funkcija">-</label>
      </div>
    </div>
    <div class="shroom-console-body">
      <div class="potential-section">
        <div class="potential-list">
          <select class="potential-selector" id="selector" name="potential_selector" size="4"></select>
          <div id="potential-switch-buttons" class="potential-switch-buttons">
            <button id="on-button" onclick="Konzola.onButtonClickEventHandler()">On</button>
            <button id="off-button" onclick="Konzola.offButtonClickEventHandler()">Off</button>
          </div>
        </div>
        <div class="potential-settings">
          <div id="charge-setter" class="charge-setter number-input">
            <p class="number-input-setter-text" id="charge-setter-text">Naboj:</p>
            <input class="number-input-setter-value" id="charge-setter-value" type="text" value="" onfocusout="Konzola.nabojInputFocusoutEventHandler(event)" />
          </div>
          <div id="coefficient-setter" class="coefficient-setter number-input">
            <p class="number-input-setter-text" id="coefficient-setter-text">Koef.:</p>
            <input class="number-input-setter-value" id="coefficient-setter-value" type="text" value="" onfocusout="Konzola.koeficijentInputFocusoutEventHandler(event)" />
          </div>
          <div id="distance-coefficient-setter" class="distance-coefficient-setter number-input">
            <p class="number-input-setter-text" id="distance-coefficient-setter-text">Koef. ud.:</p>
            <input class="number-input-setter-value" id="distance-coefficient-setter-value" type="text" value="" onfocusout="Konzola.koeficijentUdaljenostiInputFocusoutEventHandler(event)" />
          </div>
          <div id="max-distance-setter" class="coefficient-setter number-input">
            <p class="number-input-setter-text" id="max-distance-setter-text">Max. ud.:</p>
            <input class="number-input-setter-value" id="max-distance-setter-value" type="text" value="" onfocusout="Konzola.maxUdaljenostInputFocusoutEventHandler(event)" />
          </div>
          <div id="min-distance-setter" class="coefficient-setter number-input">
            <p class="number-input-setter-text" id="min-distance-setter-text">Min. ud.:</p>
            <input class="number-input-setter-value" id="min-distance-setter-value" type="text" value="" onfocusout="Konzola.minUdaljenostInputFocusoutEventHandler(event)" />
          </div>
          <div id="x-influence-setter" class="coefficient-setter number-input">
            <p class="number-input-setter-text" id="x-influence-setter-text">Utjecaj x:</p>
            <input class="number-input-setter-value" id="x-influence-setter-value" type="text" value="" onfocusout="Konzola.utjecajXInputFocusoutEventHandler(event)" />
          </div>
          <div id="potential-x-position-setter" class="potential-x-position-setter number-input">
            <p class="number-input-setter-text" id="potential-x-position-setter-text">x:</p>
            <input class="number-input-setter-value" id="potential-x-position-setter-value" type="text" value="" onfocusout="Konzola.xKoordinataInputFocusoutEventHandler(event)" />
          </div>
          <div id="potential-y-position-setter" class="potential-y-position-setter number-input">
            <p class="number-input-setter-text" id="potential-y-position-setter-text">y:</p>
            <input class="number-input-setter-value" id="potential-y-position-setter-value" type="text" value="" onfocusout="Konzola.yKoordinataInputFocusoutEventHandler(event)" />
          </div>
        </div>
      </div>
      <div class="particle-layer">
        <div class="particle-layer-xmin-setter number-input">
          <p class="number-input-setter-text" id="particle-layer-number-setter-text">Sloj:</p>
          <input class="number-input-setter-value" id="particle-layer-number-setter-value" type="text" value="" onfocusout="Konzola.slojCesticaInputFocusoutEventHandler(event)" />
        </div>
        <div class="particle-layer-xmin-setter number-input">
          <p class="number-input-setter-text" id="particle-layer-xmin-setter-text">Xmin:</p>
          <input class="number-input-setter-value" id="particle-layer-xmin-setter-value" type="text" value="" onfocusout="Konzola.xMinSlojaInputFocusoutEventHandler(event)" />
        </div>
        <div class="particle-layer-xmin-setter number-input">
          <p class="number-input-setter-text" id="particle-layer-xmax-setter-text">Xmax</p>
          <input class="number-input-setter-value" id="particle-layer-xmax-setter-value" type="text" value="" onfocusout="Konzola.xMaxSlojaInputFocusoutEventHandler(event)" />
        </div>
        <div class="particle-layer-ymin-setter number-input">
          <p class="number-input-setter-text" id="particle-layer-ymin-setter-text">Ymin</p>
          <input class="number-input-setter-value" id="particle-layer-ymin-setter-value" type="text" value="" onfocusout="Konzola.yMinSlojaInputFocusoutEventHandler(event)" />
        </div>
        <div class="particle-layer-ymax-setter number-input">
          <p class="number-input-setter-text" id="particle-layer-ymax-setter-text">Ymax</p>
          <input class="number-input-setter-value" id="particle-layer-ymax-setter-value" type="text" value="" onfocusout="Konzola.yMaxSlojaInputFocusoutEventHandler(event)" />
        </div>
      </div>
    </div>
  </div>
</div>
`;
}
