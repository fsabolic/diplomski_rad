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

    var masa_cestice : f32 = 1;

    var r_rez_potencijala = djelujPotencijalom(dretva_id);
    var r_rez_gravitacije = djelujGravitacijom(masa_cestice);
    var r_rez_otpora = djelujOtporom(dretva_id);

    var r_rez = r_rez_potencijala+r_rez_gravitacije+r_rez_otpora;
    
    pomakni_cesticu(r_rez,masa_cestice,dretva_id);
    
    if(y_koordinate[dretva_id]<0){
      y_brzina[dretva_id] *=  -0.5;
      y_koordinate[dretva_id] = 0;
    }

}


fn djelujPotencijalom(dretva_id:u32) -> vec3f {    
    var pozicija_potencijala : vec3f = vec3f(0,0,0);
    var pozicija_cestice : vec3f =  vec3f(x_koordinate[dretva_id],y_koordinate[dretva_id],z_koordinate[dretva_id]);
    var r_rez = pozicija_potencijala - pozicija_cestice;
    var udaljenost_od_potencijala:f32 = distance(pozicija_potencijala,pozicija_cestice);

    var k : f32 = 0;
    var naboj : f32 = -1;
    var potencijal_udaljenosti : f32 = 1/pow(udaljenost_od_potencijala,2);

    r_rez.x = r_rez.x*k*naboj*potencijal_udaljenosti;
    r_rez.y = r_rez.y*k*naboj*potencijal_udaljenosti;
    r_rez.z = r_rez.z*k*naboj*potencijal_udaljenosti;

  return r_rez;
}


fn djelujGravitacijom(masa_cestice:f32) -> vec3f {
  var g : f32 = 100;

  return vec3f(0,masa_cestice*-g,0);
}


fn djelujOtporom(dretva_id:u32) -> vec3f {
  var otpor : f32 = 0.45;
  return vec3f(-otpor*x_brzina[dretva_id],-otpor*y_brzina[dretva_id],-otpor*z_brzina[dretva_id]);
}

fn pomakni_cesticu(rezultantna_sila:vec3f,masa_cestice:f32,dretva_id:u32){
  x_brzina[dretva_id] +=  (dt/masa_cestice)*rezultantna_sila.x;
  y_brzina[dretva_id] +=  (dt/masa_cestice)*rezultantna_sila.y;
  z_brzina[dretva_id] +=  (dt/masa_cestice)*rezultantna_sila.z;

  x_koordinate[dretva_id] += dt * x_brzina[dretva_id];
  y_koordinate[dretva_id] += dt * y_brzina[dretva_id];
  z_koordinate[dretva_id] += dt * z_brzina[dretva_id];
}
`;
