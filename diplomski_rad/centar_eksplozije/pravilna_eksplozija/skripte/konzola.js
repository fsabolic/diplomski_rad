let paused = false;
let brzina = 1000;
let prviFrame = false;

let brojacCestica = 0;

function pokreniButtonClickEventHandler() {
  paused = false;
  console.log(cestice);
}
function pauzirajButtonClickEventHandler() {
  paused = true;
}

function brzinaSimulacijeSliderEventHandler(value) {
  brzina = value;
}

function skalirajBrzinuSlidera(brzina) {
  brzina = Math.abs(brzina - 1001);
  return ((brzina - 1) / (1000 - 1)) * (30 - 1) + 1;
}

function postaviBrojac() {
  let cesticeArray = [];

  let cesticeProxy = new Proxy(cesticeArray, {
    set: function (target, key, value) {
      if (key === "length" || !isNaN(key)) {
        document.getElementById("particle-counter-value").textContent = value;
      }
      target[key] = value;
      return true;
    },
  });

  return cesticeProxy;
}
