const crtanje3DShader = /*wgsl*/ `
  struct Uniforms {
    matrix: mat4x4f,
  };



  struct VSOutput {
    @builtin(position) position: vec4f,
    @location(0) color: vec4f,
  };
  
  struct Test{
    position: vec4f,
    color: vec4f,
  }


  @group(0) @binding(0) var<uniform> uni: Uniforms;
  @group(0) @binding(1) var<uniform> test: array<Test,12>;

  @vertex fn vs(@builtin(vertex_index) i:u32,@builtin(instance_index) ii:u32) -> VSOutput {
    var vsOut: VSOutput;
  
    var vecTrans : vec4f = vec4f(f32(ii)*0.005,f32(ii)*0.005,f32(ii)*0.005,1);
    if(ii%8==0){
      vecTrans.x = vecTrans.x*-1;
    }if(ii%8==1){
      vecTrans.y = vecTrans.y*-1;
      
    }if(ii%8==2){
      vecTrans.z = vecTrans.z*-1;
    }    
    if(ii%8==3){
      vecTrans.x = vecTrans.x*-1;
      vecTrans.y = vecTrans.y*-1;
    }if(ii%8==4){
      vecTrans.y = vecTrans.y*-1;
      vecTrans.z = vecTrans.z*-1;
      
    }if(ii%8==5){
      vecTrans.z = vecTrans.z*-1;
      vecTrans.x = vecTrans.x*-1;
    }if(ii%8==6){
      vecTrans.z = vecTrans.z*-1;
      vecTrans.x = vecTrans.x*-1;
      vecTrans.y = vecTrans.y*-1;
    }
    else{

    }
    
    vsOut.position = uni.matrix * (test[i].position+vecTrans);
    vsOut.color = test[i].color;
    return vsOut;
  }

  @fragment fn fs(vsOut: VSOutput) -> @location(0) vec4f {
    return vsOut.color;
  }
`;
