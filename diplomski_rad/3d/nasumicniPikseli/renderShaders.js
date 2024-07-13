const renderShaders = /*wgsl*/ `

@group(0) @binding(0) var<storage> x_coords: array<f32>;
@group(0) @binding(1) var<storage> y_coords: array<f32>;
@group(0) @binding(2) var<storage> z_coords: array<f32>;

@vertex
fn vertexMain(@builtin(vertex_index) i : u32 ) -> @builtin(position) vec4f {
    let x:f32 = x_coords[i];
    let y:f32 = y_coords[i];
    let z:f32 = z_coords[i];
    return vec4f(x, y, 0, 1);
}

@fragment
fn fragmentMain() -> @location(0) vec4f{
   return vec4f(1, 1, 1, 1);
}
`;
