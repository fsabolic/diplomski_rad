function dohvatiPostavkeCookie() {
  let cookieString = document.cookie.valueOf("postavke-webgpu-sim");
  if (!cookieString) return null;
  let cookiePostavke = JSON.parse(cookieString.split("=")[1]);

  cookieString = window.localStorage.getItem("postavke-webgpu-sim");

  if (!cookieString) return null;

  return JSON.parse(cookieString);
}

function postaviPostavkeCookie() {
  document.cookie =
    "postavke-webgpu-sim=" + JSON.stringify(postavke) + "; path=/";
  window.localStorage.setItem("postavke-webgpu-sim", JSON.stringify(postavke));
}
