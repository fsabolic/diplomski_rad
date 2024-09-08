function kreirajPRNGComputeShader() {
  //Izrada PRNG shadera

  //Compile compute PRNG shadera
  const prngComputeModule = device.createShaderModule({
    label: "PRNG Compute Shader",
    code: computeShaderiWGSL,
  });

  device.pushErrorScope("validation");

  //Izrada PRNG pipelinea
  let prngComputePipelineDescriptor = {
    compute: {
      module: prngComputeModule,
      entryPoint: "popuniKoordinateCestica",
    },
    layout: "auto",
  };

  prngComputePipeline = device.createComputePipeline(
    prngComputePipelineDescriptor
  );

  //Izrada PRNG bind groupa
  prngComputeBindGroup = device.createBindGroup({
    label: "PRNG Bind Group",
    layout: prngComputePipeline.getBindGroupLayout(0),
    entries: [
      {
        binding: 0,
        resource: { buffer: seedsBuffer },
      },
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

function izvrsiPRNGComputeShader() {
  //Izrada PRNG compute komandi za GPU

  const prngComputeEncoder = device.createCommandEncoder({
    label: "PRNG Encoder",
  });
  const prngComputePass = prngComputeEncoder.beginComputePass({
    label: "PRNG Compute Pass",
  });

  prngComputePass.setPipeline(prngComputePipeline);
  prngComputePass.setBindGroup(0, prngComputeBindGroup);
  prngComputePass.dispatchWorkgroups(odrediWorkgroupBroj());
  prngComputePass.end();

  const prngCommandBuffer = prngComputeEncoder.finish();
  device.queue.submit([prngCommandBuffer]);
}
