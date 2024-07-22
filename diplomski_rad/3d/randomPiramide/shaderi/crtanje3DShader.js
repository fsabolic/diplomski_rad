const crtanje3DShader = /*wgsl*/ `
  struct Uniforms {
    matrix: mat4x4f,
    eye: vec3f,
  };

  struct VSOutput {
    @builtin(position) position: vec4f,
    @location(0) color: vec4f,
    @location(1) distance: f32,
  };
  
  struct PyramidVertex{
    position: vec4f,
    color: vec4f,
  }


  @group(0) @binding(0) var<uniform> uniforms: Uniforms;
  @group(0) @binding(1) var<uniform> pyramid_vertex: array<PyramidVertex,12>;
  @group(0) @binding(2) var<storage> x_coords: array<f32>;
  @group(0) @binding(3) var<storage> y_coords: array<f32>;
  @group(0) @binding(4) var<storage> z_coords: array<f32>;
  

  @vertex fn vs(@builtin(vertex_index) iVertex:u32,@builtin(instance_index) iInstance:u32) -> VSOutput {
    var vsOut: VSOutput;
  
    var offsetVec:vec4f = vec4f(x_coords[iInstance],y_coords[iInstance],z_coords[iInstance],1);
    
    vsOut.position = uniforms.matrix * (pyramid_vertex[iVertex].position+offsetVec);
    vsOut.color = pyramid_vertex[iVertex].color;

    var cameraPosition: vec3f = vec3f(uniforms.eye.x,uniforms.eye.y,uniforms.eye.z/2);
    var particlePosition: vec3f = offsetVec.xyz;
    vsOut.distance = distance(particlePosition, cameraPosition);
    return vsOut;
  }

  @fragment fn fs(vsOut: VSOutput) -> @location(0) vec4f {
    let distanceFactor = 1.0 / (1 + vsOut.distance * 0.005);
    let adjustedColor = vsOut.color * distanceFactor;
    return adjustedColor;
  }
`;
