function pokreni() {
  postavke.pauza = false;
}

function pauziraj() {
  postavke.pauza = true;
}
function zatvori(event) {
  let konzola = document.getElementById("console");
  if (konzola.style.opacity > 0) {
    konzola.style.opacity = 0;
    konzola.style.minHeight = "none";
    konzola.style.height = "0px";
    konzola.style.minWidth = "0px";
    konzola.style.width = "0px";
    event.target.innerHTML = "+";
    event.target.backgroundColor = "#000";
  } else {
    konzola.style.opacity = 100;
    konzola.style.minHeight = "";
    konzola.style.height = "";
    konzola.style.minWidth = "";
    konzola.style.width = "";
    event.target.innerHTML = "-";
  }
}

function reset() {
  postavke.incr = 0;
  postavke.reset = true;
  postaviPostavkeLocalStorage();
  location.reload(true);
}

function reload() {
  location.reload(true);
}

function gravitacija(value) {
  postavke.gravitacija = value;
}

function otpor(value) {
  postavke.otpor = value;
}

function dt(value) {
  postavke.dt = 0 + value / 2000;
}

function brCestica(value) {
  if (value > Math.pow(2, 16)) return;
  postavke.brojCesticaXWG = 256 * value;
}

function grid() {
  postavke.grid = !postavke.grid;
}

function explosionPositionX(value) {
  postavke.pozicijaEksplozije.x = value.target.value;
}
function explosionPositionY(value) {
  postavke.pozicijaEksplozije.y = value.target.value;
}
function explosionPositionZ(value) {
  postavke.pozicijaEksplozije.z = value.target.value;
}
function potentialStrength(value) {
  postavke.snagaPotencijala = value;
}

function particleRadius(value) {
  postavke.radijusCestica = value;
}

function objectPositionX(value) {
  postavke.pozicijaObjekta.x = value.target.value;
}
function objectPositionY(value) {
  postavke.pozicijaObjekta.y = value.target.value;
}
function objectPositionZ(value) {
  postavke.pozicijaObjekta.z = value.target.value;
}

function cameraPositionX(value) {
  postavke.pozicijaKamere.x = value.target.value;
}
function cameraPositionY(value) {
  postavke.pozicijaKamere.y = value.target.value;
}
function cameraPositionZ(value) {
  postavke.pozicijaKamere.z = value.target.value;
}

function handleKeyboardInput(event) {
  switch (event.key) {
    case "A":
    case "a":
      postavke.pozicijaKamere.x -= 175;
      break;
    case "D":
    case "d":
      postavke.pozicijaKamere.x += 175;
      break;
    case "W":
    case "w":
      postavke.pozicijaKamere.z += 175;
      break;
    case "S":
    case "s":
      postavke.pozicijaKamere.z -= 175;
      break;

    case "ArrowUp":
      postavke.pozicijaObjekta.y += 175;
      break;
    case "ArrowDown":
      postavke.pozicijaObjekta.y -= 175;
      break;
    case "ArrowLeft":
      postavke.pozicijaObjekta.x += 175;
      break;
    case "ArrowRight":
      postavke.pozicijaObjekta.x -= 175;
      break;
    case "Shift":
      postavke.pozicijaObjekta.z += 175;
      break;
    case "Control":
      postavke.pozicijaObjekta.z -= 175;
      break;
  }
  document.getElementById("keys-logger").innerHTML = event.key;
}

function handleMouseScroll(event) {
  let upDown = event.deltaY > 0;
  document.getElementById("keys-logger").innerHTML = !upDown
    ? "ScrollUp"
    : "ScrollDown";
  postavke.pozicijaKamere.y -= event.deltaY * 1.2;
}

function dodajEventListenere() {
  window.addEventListener("keydown", handleKeyboardInput);
  window.addEventListener("wheel", handleMouseScroll);
}
