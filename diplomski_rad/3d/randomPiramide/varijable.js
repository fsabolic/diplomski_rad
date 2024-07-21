let adapter;
let device;
let canvas;
let context;
let presentationFormat;

let brojCestica = 256 * 4000;
let seeds = new Uint32Array([123456789, 362436069, 521288629, 88675123]);
let brojVrhovaPiramide;
let xCoordBuffer;
let yCoordBuffer;
let zCoordBuffer;
let seedsBuffer;
let uniformParametersBuffer;
let uniformParametersValues;
let uniformParametersViews;
let uniformPyramidBuffer;
let uniformPyramidViews;

let prngComputePipeline;
let prngComputeBindGroup;
let pyramid3DRenderPipeline;
let pyramid3DRenderbindGroup;

const settings = {
  fieldOfView: (100 * Math.PI) / 180,
  cameraAngle: 0,
};
//ovo mora bit globalna varijabla
let depthTexture;
