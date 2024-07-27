function dohvatiPostavkeCookie() {
  let cookieString = document.cookie.valueOf("postavke-webgpu-sim");
  if (!cookieString) return null;
  let cookiePostavke = JSON.parse(cookieString.split("=")[1]);
  return cookiePostavke;
}

function postaviPostavkeCookie() {
  document.cookie =
    "postavke-webgpu-sim=" + JSON.stringify(postavke) + "; path=/";
}
