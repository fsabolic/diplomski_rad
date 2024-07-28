//SOURCE: https://developer.nvidia.com/gpugems/gpugems3/part-vi-gpu-computing/chapter-37-efficient-random-number-generation-and-application

const computeShaderiWGSL = /*wgsl*/ `

struct Parametri{
    dt:f32,
    otpor:f32,
    gravitacija:f32,
    pozicija_eksplozije:vec3f,
  }
  
const pi: f32 = 3.1415926535897932384626433832795;
@group(0) @binding(0) var<uniform> seeds: vec4<u32>;
@group(0) @binding(1) var<uniform> parametri: Parametri;
@group(0) @binding(2) var<storage, read_write> x_koordinate: array<f32>;
@group(0) @binding(3) var<storage, read_write> y_koordinate: array<f32>;
@group(0) @binding(4) var<storage, read_write> z_koordinate: array<f32>;
@group(0) @binding(5) var<storage, read_write> x_brzina: array<f32>;
@group(0) @binding(6) var<storage, read_write> y_brzina: array<f32>;
@group(0) @binding(7) var<storage, read_write> z_brzina: array<f32>;

@compute @workgroup_size(256) fn popuniKoordinateCestica(
  @builtin(global_invocation_id) i_dretve: vec3u
) {
    let dretva_id = i_dretve.x;
    var z1: u32 = seeds[0] * (dretva_id+1);
    var z2: u32 = seeds[1] * (dretva_id+1);
    var z3: u32 = seeds[2] * (dretva_id+1);
    var z4: u32 = seeds[3] * (dretva_id+1);

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

    var multi : f32 =1.2;
    var trans : f32 = 4000;

    var pozicija_potencijala = parametri.pozicija_eksplozije;
    x_koordinate[dretva_id] = normaliziraj(sqrt(-2*log(u[0]))*cos(2*pi*u[1]))*multi+pozicija_potencijala.x; //BoxMuller transformacija
    y_koordinate[dretva_id] = normaliziraj(sqrt(-2*log(u[0]))*sin(2*pi*u[1]))*multi+pozicija_potencijala.y; //BoxMuller transformacija
    z_koordinate[dretva_id] = normaliziraj(sqrt(-2*log(u[2]))*sin(2*pi*u[3]))*multi+pozicija_potencijala.z; //BoxMuller transformacija

    x_brzina[dretva_id] =  0;
    y_brzina[dretva_id] =  0;
    z_brzina[dretva_id] =  0;

    var masa_cestice : f32 = 1;
    var r_rez_potencijala = djelujPotencijalom(dretva_id,pozicija_potencijala,70000);
    var r_rez_gravitacije = djelujGravitacijom(masa_cestice);
    var r_rez_otpora = djelujOtporom(dretva_id);

    var r_rez = r_rez_potencijala+r_rez_gravitacije+r_rez_otpora;
    
    pomakni_cesticu(r_rez,masa_cestice,dretva_id);

    odbijCesticuOdPoda(dretva_id);
}

fn tausStep(z: u32, S1: u32, S2: u32, S3: u32, M: u32) -> u32 {
    let b = (((z << S1) ^ z) >> S2);
    return (((z & M) << S3) ^ b);
}

fn lcgStep(z: u32, A: u32, C: u32) -> u32 {
    return A * z + C;
}

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

@compute @workgroup_size(256) fn djelujSilomNaCestice(
    @builtin(global_invocation_id) i_dretve: vec3u
  ) {
      let dretva_id = i_dretve.x;
  
      var masa_cestice : f32 = 1;
      var pozicija_potencijala : vec3f = vec3f(0,0,0);
      var r_rez_potencijala = djelujPotencijalom(dretva_id,pozicija_potencijala,0);
      var r_rez_gravitacije = djelujGravitacijom(masa_cestice);
      var r_rez_otpora = djelujOtporom(dretva_id);
      var r_rez = r_rez_potencijala+r_rez_gravitacije+r_rez_otpora;
      
      pomakni_cesticu(r_rez,masa_cestice,dretva_id);
      
      odbijCesticuOdPoda(dretva_id);
  
  }
  
  
  fn djelujPotencijalom(dretva_id:u32,pozicija_potencijala:vec3f,k:f32) -> vec3f {    
      
      var pozicija_cestice : vec3f =  vec3f(x_koordinate[dretva_id],
                                            y_koordinate[dretva_id],
                                            z_koordinate[dretva_id]);
      var r_rez = pozicija_potencijala - pozicija_cestice;
      var udaljenost_od_potencijala:f32 = distance(pozicija_potencijala,pozicija_cestice);
  
      var naboj : f32 = -1;
      var potencijal_udaljenosti : f32 = 1/pow(udaljenost_od_potencijala,1.5);
  
      r_rez.x = r_rez.x*k*naboj*potencijal_udaljenosti;
      r_rez.y = r_rez.y*k*naboj*potencijal_udaljenosti;
      r_rez.z = r_rez.z*k*naboj*potencijal_udaljenosti;
  
    return r_rez;
  }
  
  fn djelujGravitacijom(masa_cestice:f32) -> vec3f {
  
    return vec3f(0,masa_cestice*-parametri.gravitacija,0);
  }
  
  
  fn djelujOtporom(dretva_id:u32) -> vec3f {
    return vec3f(-parametri.otpor*x_brzina[dretva_id],
                -parametri.otpor*y_brzina[dretva_id],
                -parametri.otpor*z_brzina[dretva_id]);
  }
  
  fn pomakni_cesticu(rezultantna_sila:vec3f,masa_cestice:f32,dretva_id:u32){
    x_brzina[dretva_id] +=  (parametri.dt/masa_cestice)*rezultantna_sila.x;
    y_brzina[dretva_id] +=  (parametri.dt/masa_cestice)*rezultantna_sila.y;
    z_brzina[dretva_id] +=  (parametri.dt/masa_cestice)*rezultantna_sila.z;
  
    x_koordinate[dretva_id] += parametri.dt * x_brzina[dretva_id];
    y_koordinate[dretva_id] += parametri.dt * y_brzina[dretva_id];
    z_koordinate[dretva_id] += parametri.dt * z_brzina[dretva_id];
  }

  fn odbijCesticuOdPoda(dretva_id:u32){
    if(y_koordinate[dretva_id]<0){
      y_brzina[dretva_id] *=  -0.5;
      y_koordinate[dretva_id] = 0;
    }
  }
`;
