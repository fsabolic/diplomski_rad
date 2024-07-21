//SOURCE: https://webgpufundamentals.org/webgpu/lessons/webgpu-cameras.html
function definirajPiramidu() {
  let osnovnaKoordinata = 5;
  const koordinate = [
    //A
    osnovnaKoordinata,
    osnovnaKoordinata,
    osnovnaKoordinata,

    //B
    osnovnaKoordinata,
    -osnovnaKoordinata,
    -osnovnaKoordinata,
    //C
    -osnovnaKoordinata,
    osnovnaKoordinata,
    -osnovnaKoordinata,
    //D
    -osnovnaKoordinata,
    -osnovnaKoordinata,
    osnovnaKoordinata,
  ];

  const indeksi = [
    //ABC
    0, 1, 2,
    //ADB
    0, 3, 1,
    //ACD
    0, 2, 3,
    //BDC
    1, 3, 2,
    //4
  ];

  const boje = [
    //rozna
    200, 70, 120,
    //zuta
    200, 200, 0,
    //plava
    70, 120, 200,
    //zelena
    120, 200, 70,
  ];

  const brojVrhova = indeksi.length;
  const podaciKoordinata = new Float32Array(brojVrhova * 4); // xyz + color
  const podaciBoja = new Float32Array(brojVrhova * 4);

  for (let i = 0; i < indeksi.length; ++i) {
    let skaliraniIndexPozicije = indeksi[i] * 3;
    const pozicija = koordinate.slice(
      skaliraniIndexPozicije,
      skaliraniIndexPozicije + 3
    );
    pozicija.push(1);
    podaciKoordinata.set(pozicija, i * 4);

    let skaliraniIndexBoje = Math.floor((i * 3) / 9) * 3;
    const boja = [
      boje[skaliraniIndexBoje] / 255,
      boje[skaliraniIndexBoje + 1] / 255,
      boje[skaliraniIndexBoje + 2] / 255,
      255 / 255,
    ];
    podaciBoja.set(boja, i * 4);
  }

  return {
    podaciKoordinata: podaciKoordinata,
    podaciBoja: podaciBoja,
    brojVrhova: brojVrhova,
  };
}
