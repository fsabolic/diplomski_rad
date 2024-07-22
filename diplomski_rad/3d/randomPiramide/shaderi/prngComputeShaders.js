//SOURCE: https://developer.nvidia.com/gpugems/gpugems3/part-vi-gpu-computing/chapter-37-efficient-random-number-generation-and-application
const prngComputeShaders = /*wgsl*/ `

const pi: f32 = 3.1415926535897932384626433832795;
@group(0) @binding(0) var<uniform> seeds: vec4<u32>;
@group(0) @binding(1) var<storage, read_write> x_coords: array<f32>;
@group(0) @binding(2) var<storage, read_write> y_coords: array<f32>;
@group(0) @binding(3) var<storage, read_write> z_coords: array<f32>;
@group(0) @binding(4) var<storage, read_write> x_velocity: array<f32>;
@group(0) @binding(5) var<storage, read_write> y_velocity: array<f32>;
@group(0) @binding(6) var<storage, read_write> z_velocity: array<f32>;

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

    var multi : f32 = 0.05;
    var trans : f32 = 50;
    x_coords[idx] = normaliziraj(sqrt(-2*log(u[0]))*cos(2*pi*u[1]))*multi; //BoxMuller transformacija
    y_coords[idx] = normaliziraj(sqrt(-2*log(u[0]))*sin(2*pi*u[1]))*multi+trans; //BoxMuller transformacija
    z_coords[idx] = normaliziraj(sqrt(-2*log(u[2]))*sin(2*pi*u[3]))*multi; //BoxMuller transformacija

    x_velocity[idx] =  0;
    y_velocity[idx] =  0;
    z_velocity[idx] =  0;

    var potential_coords : vec3f = vec3f(0,50,0);
    var particle_coords : vec3f =  vec3f(x_coords[idx],y_coords[idx],z_coords[idx]);
    var r_res = potential_coords - particle_coords;
    var potential_particle_distance:f32 = distance(particle_coords,potential_coords);

    var k : f32 = 1000;
    var charge : f32 = -1;
    var distance_scalar : f32 = 1/pow(potential_particle_distance,1.5);

    r_res.x = r_res.x*k*charge;
    r_res.y = r_res.y*k*charge;
    r_res.z = r_res.z*k*charge;

    r_res.x = r_res.x*distance_scalar;
    r_res.y = r_res.y*distance_scalar;
    r_res.z = r_res.z*distance_scalar;

    var dt: f32 = 0.001;
    var dt_mass : f32 = dt/0.1;


    x_velocity[idx] +=  dt_mass*r_res.x;
    y_velocity[idx] +=  dt_mass*r_res.y;
    z_velocity[idx] +=  dt_mass*r_res.z;

    
    x_coords[idx] +=  dt*x_velocity[idx];
    y_coords[idx] +=  dt*y_velocity[idx];
    z_coords[idx] +=  dt*z_velocity[idx];

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
