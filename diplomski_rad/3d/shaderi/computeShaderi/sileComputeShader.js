function kreirajSileComputeShader() {
  //Izrada Sile shadera

  //Compile compute Sile shadera
  const sileComputeModule = device.createShaderModule({
    label: "Sile Compute Shader",
    code: computeShaderiWGSL,
  });

  device.pushErrorScope("validation");

  //Izrada Sile pipelinea
  let sileComputePipelineDescriptor = {
    compute: {
      module: sileComputeModule,
      entryPoint: "djelujSilomNaCestice",
    },
    layout: "auto",
  };

  sileComputePipeline = device.createComputePipeline(
    sileComputePipelineDescriptor
  );

  //Izrada Sile bind groupa
  sileComputeBindGroup = device.createBindGroup({
    label: "Sile Bind Group",
    layout: sileComputePipeline.getBindGroupLayout(0),
    entries: [
      {
        binding: 1,
        resource: { buffer: uniCompParamsBuffer },
      },
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
      {
        binding: 5,
        resource: { buffer: xBrzinaBuffer },
      },
      {
        binding: 6,
        resource: { buffer: yBrzinaBuffer },
      },
      {
        binding: 7,
        resource: { buffer: zBrzinaBuffer },
      },
    ],
  });
}

function izvrsiSileComputeShader() {
  //Izrada Sile compute komandi za GPU
  const sileComputeEncoder = device.createCommandEncoder({
    label: "Sile Encoder",
  });
  const sileComputePass = sileComputeEncoder.beginComputePass({
    label: "Sile Compute Pass",
  });
  sileComputePass.setPipeline(sileComputePipeline);
  sileComputePass.setBindGroup(0, sileComputeBindGroup);
  sileComputePass.dispatchWorkgroups(odrediWorkgroupBroj());
  sileComputePass.end();

  const commandBuffer = sileComputeEncoder.finish();
  device.queue.submit([commandBuffer]);
}
