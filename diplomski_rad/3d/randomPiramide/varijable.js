let adapter;
let device;
let canvas;
let context;
let presentationFormat;

let brojCestica = 256 * 25;
let seeds = new Uint32Array([123456789, 362436069, 521288629, 88675123]);
let brojVrhovaPiramide;
let xCoordBuffer;
let yCoordBuffer;
let zCoordBuffer;
let xVelocityBuffer;
let yVelocityBuffer;
let zVelocityBuffer;
let seedsBuffer;
let uniformParametersBuffer;
let uniformParametersValues;
let uniformParametersViews;
let uniformPyramidBuffer;
let uniformPyramidViews;
let uniformSimulacijaParametriBuffer;
let uniformSimulacijaParametriValues;
let uniformSimulacijaParametriViews;

let prngComputePipeline;
let prngComputeBindGroup;
let pyramid3DRenderPipeline;
let pyramid3DRenderbindGroup;
let forceComputePipeline;
let forceComputeBindGroup;

const settings = {
  seeds: { z1: 0, z2: 0, z3: 0, z4: 0 },
  dt: 0.01667,
  otpor: 0.35,
  gravitacija: 300,
};
//ovo mora bit globalna varijabla
let depthTexture;
