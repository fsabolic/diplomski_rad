let paused = false;
let brzina = 1000;
let prviFrame = false;

let brojacCestica = 0;

function start() {
  paused = false;
}
function stop() {
  paused = true;
}

function azurirajBrzinuSimulacije(value) {
  brzina = value;
}

function skaliraj(brzina) {
  brzina = Math.abs(brzina - 1001);
  return ((brzina - 1) / (1000 - 1)) * (30 - 1) + 1;
}

function postaviBrojac(element) {
  let cesticeArray = [];

  let cesticeProxy = new Proxy(cesticeArray, {
    set: function (target, key, value) {
      if (key === "length") {
        element.textContent = value;
      }
      target[key] = value;
      return true;
    },
  });

  return cesticeProxy;
}
