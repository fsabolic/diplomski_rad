function nasumnicnaNormalnaDistribucija(brojTocaka, dimenzije = 2) {
  let brojSkupova = dimenzije;
  if (brojSkupova % 2 != 0) brojSkupova += 1;

  let uniformniSkupovi = nasumicniUniformniSkupovi(brojTocaka, dimenzije);

  let normalniSkupovi = boxMullerTransformacija(uniformniSkupovi);

  return normalniSkupovi;
}

function nasumicniUniformniSkupovi(brojTocaka, dimenzije = 2) {
  let brojSkupova = dimenzije;
  if (brojSkupova % 2 != 0) brojSkupova += 1;
  let uniformniSkupovi = [];
  for (let i = 0; i < brojSkupova; i++) {
    uniformniSkupovi.push(nasumicniUniformniSkup(brojTocaka));
  }

  return uniformniSkupovi;
}

function nasumicniUniformniSkup(brojTocaka) {
  let uniformniSkup = [];
  for (let j = 0; j < brojTocaka; j++) {
    uniformniSkup.push(Math.random());
  }
  return uniformniSkup;
}

function boxMullerTransformacija(uniformniSkupovi) {
  let brojTocakaSkupa = uniformniSkupovi[0].length;

  let dimenzije = uniformniSkupovi.length;

  for (let i = 0; i < dimenzije; i++) {
    if (brojTocakaSkupa != uniformniSkupovi[0].length) {
      return undefined;
    }
  }

  if (dimenzije % 2 != 0) {
    let uniformniSkup = nasumicniUniformniSkup(brojTocakaSkupa);
    uniformniSkupovi.push(uniformniSkup);
  }

  let brojSkupova = uniformniSkupovi.length;
  let normalniSkupovi = [];
  for (let i = 0; i < brojSkupova; i += 2) {
    let normalniSkupA = [];
    let normalniSkupB = [];
    for (let j = 0; j < uniformniSkupovi[0].length; j++) {
      let u1 = uniformniSkupovi[i][j];
      let u2 = uniformniSkupovi[i + 1][j];
      let z1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      let z2 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);
      normalniSkupA.push(z1);
      normalniSkupB.push(z2);
    }
    normalniSkupovi.push(normalniSkupA);
    normalniSkupovi.push(normalniSkupB);
  }

  return normalniSkupovi.slice(0, dimenzije);
}
