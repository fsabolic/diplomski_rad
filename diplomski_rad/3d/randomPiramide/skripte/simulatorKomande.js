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
  postaviPostavkeCookie();
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
