function kreirajGridRenderShader() {
  //Izrada grid render shadera

  //Compile render grid shadera
  let gridRenderModule = device.createShaderModule({
    code: cesticeRenderShaderiWGSL,
  });

  //Izrada grid pipelinea
  gridRenderPipeline = device.createRenderPipeline({
    label: "Grid Render Shaders",
    layout: "auto",
    vertex: {
      module: gridRenderModule,
      entryPoint: "vsGrid",
    },
    fragment: {
      module: gridRenderModule,
      entryPoint: "fsGrid",
      targets: [{ format: presentationFormat }],
    },
    primitive: {
      cullMode: "back",
      topology: "line-strip",
    },
    depthStencil: {
      depthWriteEnabled: true,
      depthCompare: "less",
      format: "depth24plus",
    },
  });

  //Izrada grid bind groupa
  gridRenderbindGroup = device.createBindGroup({
    label: "Grid Bind Group",
    layout: gridRenderPipeline.getBindGroupLayout(0),
    entries: [{ binding: 0, resource: { buffer: uniRenderParamsBuffer } }],
  });
}

function izvrsiGridRenderShader() {
  //Izrada grid render komandi za GPU
  const canvasTexture = context.getCurrentTexture();
  const gridRenderPassDescriptor = {
    label: "Grid Shader RenderPass",
    colorAttachments: [
      {
        view: context.getCurrentTexture(),
        loadOp: "load",
        storeOp: "store",
      },
    ],
    depthStencilAttachment: {
      view: context.getCurrentTexture(),
      depthClearValue: 1.0,
      depthLoadOp: "load",
      depthStoreOp: "store",
    },
  };
  gridRenderPassDescriptor.colorAttachments[0].view =
    canvasTexture.createView();
  if (
    !depthTexture ||
    depthTexture.width !== canvasTexture.width ||
    depthTexture.height !== canvasTexture.height
  ) {
    if (depthTexture) {
      depthTexture.destroy();
    }
    depthTexture = device.createTexture({
      size: [canvasTexture.width, canvasTexture.height],
      format: "depth24plus",
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });
  }
  gridRenderPassDescriptor.depthStencilAttachment.view =
    depthTexture.createView();

  const gridCommandEncoder = device.createCommandEncoder();
  const gridRenderPass = gridCommandEncoder.beginRenderPass(
    gridRenderPassDescriptor
  );
  gridRenderPass.setPipeline(gridRenderPipeline);

  gridRenderPass.setBindGroup(0, gridRenderbindGroup);
  gridRenderPass.draw(2, 10000);
  gridRenderPass.end();
  const commandBuffer = gridCommandEncoder.finish();
  device.queue.submit([commandBuffer]);
}
