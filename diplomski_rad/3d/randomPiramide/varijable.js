let adapter;
let device;
let canvas;
let context;
let presentationFormat;

let brojCesticaX256 = 256 * 25;
let seeds = new Uint32Array([123456789, 362436069, 521288629, 88675123]);
let brojVrhovaPiramide;
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
let uniPiramidaBuffer;
let uniPiramidaViews;
let uniCompParamsBuffer;
let uniCompParamsValues;
let uniCompParamsViews;

let prngComputePipeline;
let prngComputeBindGroup;
let cesticeRenderPipeline;
let cesticeRenderbindGroup;
let sileComputePipeline;
let sileComputeBindGroup;

const postavke = {
  seeds: { z1: 0, z2: 0, z3: 0, z4: 0 },
  dt: 0.01667,
  otpor: 0.35,
  gravitacija: 300,
  incr: 0,
};
//ovo mora bit globalna varijabla
let depthTexture;
