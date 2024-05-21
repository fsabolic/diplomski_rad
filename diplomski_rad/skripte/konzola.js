let paused = false;
let brzina = 1000;
let prviFrame = false;
let brojacCestica = 0;
let pocetnoStanjeCestica = null;
let cesticeSave = null;
let pocetnoStanjePotencijala = null;
let potencijalSave = null;
let topGranica = true;
let leftGranica = true;
let bottomGranica = true;
let rightGranica = true;

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

function spremiPocetnoStanjePotencijala(potencijal) {
  potencijalSave = potencijal;
  pocetnoStanjePotencijala = deepClone(potencijal);
}
function spremiPocetnoStanjeCestica(cestice) {
  cesticeSave = cestice;
  pocetnoStanjeCestica = cestice.map((cestica) => {
    let deepCopy = deepClone(cestica);
    return deepCopy;
  });
}
//kod za deep copy preuzet s:
//https://saturncloud.io/blog/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript/
//https://stackoverflow.com/questions/77353410/how-to-deep-clone-with-prototype-chain
function deepClone(objekt) {
  if (objekt === null || typeof objekt !== "object") {
    return objekt;
  }

  let kopija = Object.create(Object.getPrototypeOf(objekt));

  for (let key in objekt) {
    if (Object.prototype.hasOwnProperty.call(objekt, key)) {
      kopija[key] = deepClone(objekt[key]);
    }
  }

  return kopija;
}
function reload() {
  location.reload();
}

function reset() {
  while (cesticeSave.length > 0) {
    cesticeSave.pop();
  }

  pocetnoStanjeCestica.map((cestica) => {
    let deepCopy = deepClone(cestica);
    cesticeSave.push(deepCopy);
  });

  if (pocetnoStanjePotencijala != null) {
    for (let key in pocetnoStanjePotencijala) {
      potencijalSave[key] = pocetnoStanjePotencijala[key];
    }
    pocetnoStanjePotencijala = deepClone(potencijalSave);
  }
}

function granicaClick(event) {
  let odabranaGranica = event.target;
  if (odabranaGranica.className == "border-item") {
    odabranaGranica.className = "border-item-selected";
  } else {
    odabranaGranica.className = "border-item";
  }

  switch (odabranaGranica.id) {
    case "top":
      topGranica = !topGranica;
      break;
    case "right":
      rightGranica = !rightGranica;
      break;
    case "bottom":
      bottomGranica = !bottomGranica;
      break;
    case "left":
      leftGranica = !leftGranica;
      break;
  }
}
