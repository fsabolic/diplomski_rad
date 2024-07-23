//SOURCE: https://developer.nvidia.com/gpugems/gpugems3/part-vi-gpu-computing/chapter-37-efficient-random-number-generation-and-application
const sileComputeShaders = /*wgsl*/ `


@group(0) @binding(0) var<uniform> dt: f32;
@group(0) @binding(1) var<storage, read_write> x_koordinate: array<f32>;
@group(0) @binding(2) var<storage, read_write> y_koordinate: array<f32>;
@group(0) @binding(3) var<storage, read_write> z_koordinate: array<f32>;
@group(0) @binding(4) var<storage, read_write> x_brzina: array<f32>;
@group(0) @binding(5) var<storage, read_write> y_brzina: array<f32>;
@group(0) @binding(6) var<storage, read_write> z_brzina: array<f32>;

@compute @workgroup_size(256) fn djelujSilomNaCestice(
  @builtin(global_invocation_id) i_dretve: vec3u
) {
    let dretva_id = i_dretve.x;
   
    var pozicija_potencijala : vec3f = vec3f(0,0,0);
    var pozicija_cestice : vec3f =  vec3f(x_koordinate[dretva_id],y_koordinate[dretva_id],z_koordinate[dretva_id]);
    var r_rez = pozicija_potencijala - pozicija_cestice;
    var udaljenost_od_potencijala:f32 = distance(pozicija_potencijala,pozicija_cestice);

    r_rez = djelujPotencijalom(udaljenost_od_potencijala,r_rez);

    var masa_cestice : f32 = 1;
    var dt_masa : f32 = dt/masa_cestice;

    var g : f32 = 1;

    x_brzina[dretva_id] +=  dt_masa*r_rez.x+0;
    y_brzina[dretva_id] +=  dt_masa*r_rez.y+1*-g;
    z_brzina[dretva_id] +=  dt_masa*r_rez.z+0;

    var otpor : f32 = 0.005;

    x_brzina[dretva_id] +=  x_brzina[dretva_id] *-otpor;
    y_brzina[dretva_id] +=  y_brzina[dretva_id] *-otpor;
    z_brzina[dretva_id] +=  z_brzina[dretva_id] *-otpor;

    
    x_koordinate[dretva_id] +=  dt*x_brzina[dretva_id];
    y_koordinate[dretva_id] +=  dt*y_brzina[dretva_id];
    z_koordinate[dretva_id] +=  dt*z_brzina[dretva_id];
    
    if(y_koordinate[dretva_id]<0){
      y_brzina[dretva_id] *=  -1;
      y_koordinate[dretva_id] = 0;
    }

}


fn djelujPotencijalom(udaljenost_od_potencijala:f32,sila_potencijala:vec3f) -> vec3f {
    var r_rez = sila_potencijala;

    var k : f32 = 0;
    var naboj : f32 = 1;
    var potencijal_udaljenosti : f32 = 1/pow(udaljenost_od_potencijala,2);

    r_rez.x = r_rez.x*k*naboj;
    r_rez.y = r_rez.y*k*naboj;
    r_rez.z = r_rez.z*k*naboj;

    r_rez.x = r_rez.x*potencijal_udaljenosti;
    r_rez.y = r_rez.y*potencijal_udaljenosti;
    r_rez.z = r_rez.z*potencijal_udaljenosti;
  return r_rez;
}


fn djelujGravitacijom() -> vec3f {
  return vec3f(0,0,0);
}


fn djelujOtporom() -> vec3f {
  return vec3f(0,0,0);
}
`;
