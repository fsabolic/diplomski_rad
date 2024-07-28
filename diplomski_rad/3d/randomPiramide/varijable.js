let adapter;
let device;
let canvas;
let context;
let presentationFormat;

let brojWG = 256;
let brojCesticaXWG = brojWG * 25;
let brojVrhovaCestice;
let xKoordinateBuffer;
let yKoordinateBuffer;
let zKoordinateBuffer;
let xBrzinaBuffer;
let yBrzinaBuffer;
let zBrzinaBuffer;
let seedsBuffer;
let uniRenderParamsBuffer;
let uniRenderParamsValues;
let uniRenderParamsViews;
let uniCesticaBuffer;
let uniCesticaViews;
let uniCompParamsBuffer;
let uniCompParamsValues;
let uniCompParamsViews;

let prngComputePipeline;
let prngComputeBindGroup;
let cesticeRenderPipeline;
let cesticeRenderbindGroup;
let sileComputePipeline;
let sileComputeBindGroup;
let postavke = {
  brojCesticaXWG: brojCesticaXWG,
  seeds: { z1: 123456789, z2: 362436069, z3: 521288629, z4: 88675123 },
  reset: false,
  dt: 0.01667,
  otpor: 0.35,
  gravitacija: 300,
  incr: 0,
  pauza: false,
  grid: true,
};
let depthTexture;
