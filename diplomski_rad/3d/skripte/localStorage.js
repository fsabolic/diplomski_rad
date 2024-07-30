function dohvatiPostavkeLocalStorage() {
  let localStorageString = window.localStorage.getItem("postavke-webgpu-sim");
  if (!localStorageString) return null;

  return JSON.parse(localStorageString);
}

function postaviPostavkeLocalStorage() {
  window.localStorage.setItem("postavke-webgpu-sim", JSON.stringify(postavke));
}
