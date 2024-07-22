//SOURCE: https://developer.nvidia.com/gpugems/gpugems3/part-vi-gpu-computing/chapter-37-efficient-random-number-generation-and-application
const forceComputeShaders = /*wgsl*/ `


@group(0) @binding(0) var<uniform> time: f32;
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
   
    var potential_coords : vec3f = vec3f(0,0,0);
    var particle_coords : vec3f =  vec3f(x_coords[idx],y_coords[idx],z_coords[idx]);
    var r_res = potential_coords - particle_coords;
    var potential_particle_distance:f32 = distance(potential_coords,particle_coords);

    var k : f32 = 0;
    var charge : f32 = -1;
    var distance_scalar : f32 = 1/pow(potential_particle_distance,2);

    r_res.x = r_res.x*k*charge;
    r_res.y = r_res.y*k*charge;
    r_res.z = r_res.z*k*charge;

    r_res.x = r_res.x*distance_scalar;
    r_res.y = r_res.y*distance_scalar;
    r_res.z = r_res.z*distance_scalar;

    var dt: f32 = time;
    var dt_mass : f32 = dt/1;

    var g : f32 = 3;

    x_velocity[idx] +=  dt_mass*r_res.x+0;
    y_velocity[idx] +=  dt_mass*r_res.y+1*-g;
    z_velocity[idx] +=  dt_mass*r_res.z+0;

    var resistance : f32 = 0.01;

    x_velocity[idx] +=  x_velocity[idx] *-resistance;
    y_velocity[idx] +=  y_velocity[idx] *-resistance;
    z_velocity[idx] +=  z_velocity[idx] *-resistance;

    
    x_coords[idx] +=  dt*x_velocity[idx];
    y_coords[idx] +=  dt*y_velocity[idx];
    z_coords[idx] +=  dt*z_velocity[idx];
    
    if(y_coords[idx]<0){
      y_velocity[idx] *=  -1;
      y_coords[idx] = 0;
    }

}
`;
