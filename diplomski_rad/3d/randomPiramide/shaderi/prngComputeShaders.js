//SOURCE: https://developer.nvidia.com/gpugems/gpugems3/part-vi-gpu-computing/chapter-37-efficient-random-number-generation-and-application
const prngComputeShaders = /*wgsl*/ `

const pi: f32 = 3.1415926535897932384626433832795;
@group(0) @binding(3) var<uniform> seeds: vec4<u32>;
@group(0) @binding(0) var<storage, read_write> x_coords: array<f32>;
@group(0) @binding(1) var<storage, read_write> y_coords: array<f32>;
@group(0) @binding(2) var<storage, read_write> z_coords: array<f32>;

@compute @workgroup_size(256) fn popuniKoordinateCestica(
  @builtin(global_invocation_id) id: vec3u
) {
    let idx = id.x;
    var z1: u32 = seeds[0] * (idx+1);
    var z2: u32 = seeds[1] * (idx+1);
    var z3: u32 = seeds[2] * (idx+1);
    var z4: u32 = seeds[3] * (idx+1);

    var u: array<f32, 4> = array<f32, 4>(0.0, 0.0, 0.0, 0.0);

    for (var i = 0; i < 25; i++) { //Zagrijavanje generatora
        z1 = tausStep(z1, 13u, 19u, 12u, 4294967294u);
        z2 = tausStep(z2, 2u, 25u, 4u, 4294967288u);
        z3 = tausStep(z3, 3u, 11u, 17u, 4294967280u);
        z4 = lcgStep(z4, 1664525u, 1013904223u);
        if(i%5==0){
            u[i/5] = hybridTaus(z1,z2,z3,z4);
        }
    }

    x_coords[idx] = normaliziraj(sqrt(-2*log(u[0]))*cos(2*pi*u[1])); //BoxMuller transformacija
    y_coords[idx] = normaliziraj(sqrt(-2*log(u[0]))*sin(2*pi*u[1])); //BoxMuller transformacija
    z_coords[idx] = normaliziraj(sqrt(-2*log(u[2]))*sin(2*pi*u[3])); //BoxMuller transformacija
}


// TausStep
fn tausStep(z: u32, S1: u32, S2: u32, S3: u32, M: u32) -> u32 {
    let b = (((z << S1) ^ z) >> S2);
    return (((z & M) << S3) ^ b);
}

// LCGStep
fn lcgStep(z: u32, A: u32, C: u32) -> u32 {
    return A * z + C;
}

// HybridTaus
fn hybridTaus(z1: u32, z2: u32, z3: u32, z4: u32) -> f32 {
    let t1 = tausStep(z1, 13u, 19u, 12u, 4294967294u);
    let t2 = tausStep(z2, 2u, 25u, 4u, 4294967288u);
    let t3 = tausStep(z3, 3u, 11u, 17u, 4294967280u);
    let lcg = lcgStep(z4, 1664525u, 1013904223u);

    let combined = t1 ^ t2 ^ t3 ^ lcg;
    return f32(combined) * 2.3283064365387e-10;
}

fn normaliziraj(vrijednost:f32)-> f32{
    var vrijednost_slozena:f32 = vrijednost;
    let rmin:f32 = -6;
    let rmax:f32 = 6;
    let tmin:f32 = -1;
    let tmax:f32 = 1;
    var norm:f32 = (((vrijednost_slozena-rmin)/(rmax-rmin))*(tmax-tmin))+tmin;
    if(norm>tmax){ return tmax;}
    else if(norm<tmin){ return tmin;}
    return norm;
}
`;
