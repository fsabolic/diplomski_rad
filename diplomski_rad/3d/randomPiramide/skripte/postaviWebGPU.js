async function postaviWebGPU() {
  //Učitavanje konteksta i ostalih WebGPU stvari za rad
  adapter = await navigator.gpu?.requestAdapter();
  device = await adapter?.requestDevice();
  if (!device) {
    fail("Ovaj preglednik ne podržava WebGPU");
    return;
  }

  canvas = document.querySelector("canvas");
  context = canvas.getContext("webgpu");
  presentationFormat = navigator.gpu.getPreferredCanvasFormat();
  context.configure({
    device,
    format: presentationFormat,
    alphaMode: "premultiplied",
  });
}

function fail(msg) {
  alert(msg);
}
