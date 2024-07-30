function kreirajBuffere() {
  //Kreiranje buffera

  //_____seed storage buffer_____
  //pohranjuju se vrijednosti seedova za pseudonasumično generiranje čestica
  function dodajRand() {
    if (!postavke.reset) return Math.random() * 10;
    return 1;
  }
  postavke.seeds.z1 *= dodajRand();
  postavke.seeds.z2 *= dodajRand();
  postavke.seeds.z3 *= dodajRand();
  postavke.seeds.z4 *= dodajRand();
  let seeds = new Uint32Array([
    postavke.seeds.z1,
    postavke.seeds.z2,
    postavke.seeds.z3,
    postavke.seeds.z4,
  ]);
  seedsBuffer = device.createBuffer({
    label: "Seeds Buffer",
    size: seeds.byteLength,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(seedsBuffer, 0, seeds);

  //_____osnovna cestica uniform buffer_____
  //pohranjuju se vrijednosti vrhova cestice koja predstavlja česticu
  let { podaciKoordinata, podaciBoja, brojVrhova } = definirajCesticu();
  brojVrhovaCestice = brojVrhova;
  const cesticaValues = new ArrayBuffer(384);
  let cesticaViews = [];
  for (let i = 0; i < brojVrhova; i++) {
    cesticaViews.push({
      koordinate: new Float32Array(cesticaValues, 32 * i, 4),
      boja: new Float32Array(cesticaValues, 32 * i + 16, 4),
    });
    cesticaViews[i].koordinate.set([
      podaciKoordinata[i * 4],
      podaciKoordinata[i * 4 + 1],
      podaciKoordinata[i * 4 + 2],
      podaciKoordinata[i * 4 + 3],
    ]);
    cesticaViews[i].boja.set([
      podaciBoja[i * 4],
      podaciBoja[i * 4 + 1],
      podaciBoja[i * 4 + 2],
      podaciBoja[i * 4 + 3],
    ]);
  }

  uniCesticaBuffer = device.createBuffer({
    label: "Osnovna Cestica Buffer",
    size: cesticaValues.byteLength,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(uniCesticaBuffer, 0, cesticaValues);

  //_____render parametri uniform buffer_____
  //pohranjuju se vrijednosti parametara za crtanje čestica
  brojCesticaXWG = postavke.brojCesticaXWG;
  uniRenderParamsValues = new ArrayBuffer(80);
  uniRenderParamsViews = {
    matrica3d: new Float32Array(uniRenderParamsValues, 0, 16),
    pozicijaEksplozije: new Float32Array(uniRenderParamsValues, 64, 3),
    iteracija: new Float32Array(uniRenderParamsValues, 76, 1),
  };
  uniRenderParamsViews.pozicijaEksplozije.set(
    new Float32Array([
      postavke.pozicijaEksplozije.x,
      postavke.pozicijaEksplozije.y,
      postavke.pozicijaEksplozije.z,
    ])
  );
  uniRenderParamsBuffer = device.createBuffer({
    label: "Uniform Render Params Buffer",
    size: uniRenderParamsValues.byteLength,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  //_____compute parametri uniform buffer_____
  //pohranjuju se vrijednosti parametara za generiranje čestica
  uniCompParamsValues = new ArrayBuffer(48);
  uniCompParamsViews = {
    dt: new Float32Array(uniCompParamsValues, 0, 1),
    otpor: new Float32Array(uniCompParamsValues, 4, 1),
    gravitacija: new Float32Array(uniCompParamsValues, 8, 1),
    pozicijaEksplozije: new Float32Array(uniCompParamsValues, 16, 3),
    snagaPotencijala: new Float32Array(uniCompParamsValues, 28, 1),
    radijusCestica: new Float32Array(uniCompParamsValues, 32, 1),
  };
  uniCompParamsBuffer = device.createBuffer({
    label: "Uniform Compute Params Buffer",
    size: uniCompParamsValues.byteLength,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  //_____x koordinate storage buffer_____
  //pohranuju se vrijednosti x koordinata čestica
  let xKoordinateArray = new Float32Array(brojCesticaXWG);
  xKoordinateBuffer = device.createBuffer({
    label: "X Koordinate Buffer",
    size: xKoordinateArray.byteLength,
    usage:
      GPUBufferUsage.STORAGE |
      GPUBufferUsage.COPY_SRC |
      GPUBufferUsage.COPY_DST,
  });

  //_____y koordinate storage buffer_____
  //pohranuju se vrijednosti y koordinata čestica
  let yKoordinateArray = new Float32Array(brojCesticaXWG);
  yKoordinateBuffer = device.createBuffer({
    label: "Y Koordinate Buffer",
    size: yKoordinateArray.byteLength,
    usage:
      GPUBufferUsage.STORAGE |
      GPUBufferUsage.COPY_SRC |
      GPUBufferUsage.COPY_DST,
  });

  //_____z koordinate storage buffer_____
  //pohranuju se vrijednosti z koordinata čestica
  let zKoordinateArray = new Float32Array(brojCesticaXWG);
  zKoordinateBuffer = device.createBuffer({
    label: "Z Koordinate Buffer",
    size: zKoordinateArray.byteLength,
    usage:
      GPUBufferUsage.STORAGE |
      GPUBufferUsage.COPY_SRC |
      GPUBufferUsage.COPY_DST,
  });

  //_____x brzina storage buffer_____
  //pohranuju se vrijednosti x komponente brzina čestica
  let xBrzinaArray = new Float32Array(brojCesticaXWG);
  xBrzinaBuffer = device.createBuffer({
    label: "X Brzina Buffer",
    size: xBrzinaArray.byteLength,
    usage:
      GPUBufferUsage.STORAGE |
      GPUBufferUsage.COPY_SRC |
      GPUBufferUsage.COPY_DST,
  });

  //_____y brzina storage buffer_____
  //pohranuju se vrijednosti y komponente brzina čestica
  let yBrzinaArray = new Float32Array(brojCesticaXWG);
  yBrzinaBuffer = device.createBuffer({
    label: "Y Brzina Buffer",
    size: yBrzinaArray.byteLength,
    usage:
      GPUBufferUsage.STORAGE |
      GPUBufferUsage.COPY_SRC |
      GPUBufferUsage.COPY_DST,
  });

  //_____z brzina storage buffer_____
  //pohranuju se vrijednosti z komponente brzina čestica
  let zBrzinaArray = new Float32Array(brojCesticaXWG);
  zBrzinaBuffer = device.createBuffer({
    label: "Z Brzina Buffer",
    size: zBrzinaArray.byteLength,
    usage:
      GPUBufferUsage.STORAGE |
      GPUBufferUsage.COPY_SRC |
      GPUBufferUsage.COPY_DST,
  });
}
