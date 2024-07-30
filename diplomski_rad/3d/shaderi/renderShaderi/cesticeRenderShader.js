function kreirajCesticeRenderShader() {
  //Izrada Cestice render shadera

  //Compile render Cestice shadera
  let cesticeRenderModule = device.createShaderModule({
    code: cesticeRenderShaderiWGSL,
  });

  //Izrada Cestice pipelinea
  cesticeRenderPipeline = device.createRenderPipeline({
    label: "2 attributes",
    layout: "auto",
    vertex: {
      module: cesticeRenderModule,
      entryPoint: "vsCestice",
    },
    fragment: {
      module: cesticeRenderModule,
      entryPoint: "fsCestice",
      targets: [{ format: presentationFormat }],
    },
    primitive: {
      cullMode: "back",
    },
    depthStencil: {
      depthWriteEnabled: true,
      depthCompare: "less",
      format: "depth24plus",
    },
  });

  //Izrada Cestice bind groupa
  cesticeRenderbindGroup = device.createBindGroup({
    label: "Cestice Bind Group",
    layout: cesticeRenderPipeline.getBindGroupLayout(0),
    entries: [
      { binding: 0, resource: { buffer: uniRenderParamsBuffer } },
      { binding: 1, resource: { buffer: uniCesticaBuffer } },
      {
        binding: 2,
        resource: { buffer: xKoordinateBuffer },
      },
      {
        binding: 3,
        resource: { buffer: yKoordinateBuffer },
      },
      {
        binding: 4,
        resource: { buffer: zKoordinateBuffer },
      },
    ],
  });
}

function izvrsiCesticeRenderShader() {
  //Izrada Cestice render komandi za GPU
  const canvasTexture = context.getCurrentTexture();
  const cesticeRenderPassDescriptor = {
    label: "Cestice Shader RenderPass",
    colorAttachments: [
      {
        view: context.getCurrentTexture(),
        loadOp: "clear",
        storeOp: "store",
      },
    ],
    depthStencilAttachment: {
      view: context.getCurrentTexture(),
      depthClearValue: 1.0,
      depthLoadOp: "clear",
      depthStoreOp: "store",
    },
  };
  cesticeRenderPassDescriptor.colorAttachments[0].view =
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
  cesticeRenderPassDescriptor.depthStencilAttachment.view =
    depthTexture.createView();

  const cesticeCommandEncoder = device.createCommandEncoder();
  const cesticeRenderPass = cesticeCommandEncoder.beginRenderPass(
    cesticeRenderPassDescriptor
  );
  cesticeRenderPass.setPipeline(cesticeRenderPipeline);

  cesticeRenderPass.setBindGroup(0, cesticeRenderbindGroup);
  cesticeRenderPass.draw(brojVrhovaCestice, brojCesticaXWG);
  cesticeRenderPass.end();
  const commandBuffer = cesticeCommandEncoder.finish();
  device.queue.submit([commandBuffer]);
}
