const cesticeRenderShaderiWGSL = /*wgsl*/ `
//Parametri simulacije (uniforms)
struct Parametri {
  matrica_3d: mat4x4f,
  pozicija_eksplozije: vec3f,
  iteracija:f32,
};

//Struktura za prosljeđivanje podataka o vrhu
struct VSOutput {
  @builtin(position) koordinate_vrha: vec4f,
  @location(0) boja: vec4f,
  @location(1) udaljenost: f32,
};

//Vrh čestice (predstavljena kao piramida)
struct VrhCestice{
  koordinate: vec4f,
  boja: vec4f,
}


@group(0) @binding(0) 
  var<uniform> parametri: Parametri;
@group(0) @binding(1) 
  var<uniform> vrhovi_cestice: array<VrhCestice,12>;
@group(0) @binding(2) 
  var<storage> x_koordinate: array<f32>;
@group(0) @binding(3) 
  var<storage> y_koordinate: array<f32>;
@group(0) @binding(4)
  var<storage> z_koordinate: array<f32>;

//Vertex shader za crtanje čestica
@vertex fn vsCestice(
  @builtin(vertex_index) i_vertex:u32,
  @builtin(instance_index) i_instance:u32) -> VSOutput {

  var vsOut: VSOutput;

  //Pomak koji se primjenjuje na piramidu u središtu koordinatnog sustava
  var vektor_pomaka:vec4f = vec4f(
    x_koordinate[i_instance],
    y_koordinate[i_instance],
    z_koordinate[i_instance],
    1
  );
    
  // Rotacijska matrica za rotaciju oko osi z
  var rotacijska_matrica = mat4x4<f32>(
    cos(f32(parametri.iteracija+f32(i_instance)/1)), -sin(f32(parametri.iteracija+f32(i_instance)/1)), 0.0,0.0,
    sin(f32(parametri.iteracija+f32(i_instance)/1)), cos(f32(parametri.iteracija+f32(i_instance)/1)),  0.0,0.0,
    0.0,      0.0,       1.0,0.0,
    0.0,      0.0,       0.0,1.0,
  );

  if((vrhovi_cestice[i_vertex].koordinate+vektor_pomaka).y<100){
    rotacijska_matrica = mat4x4<f32>(
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0,
    );
  }
  // Rotiraj koordinate koristeći rotacijsku matricu
  let rotiran_vrh = (rotacijska_matrica *  vrhovi_cestice[i_vertex].koordinate)+vektor_pomaka;


  // Primijeni 3D matricu transformacije na rotirani vrh
  vsOut.koordinate_vrha = parametri.matrica_3d * rotiran_vrh;
  vsOut.boja = vrhovi_cestice[i_vertex].boja;

  //Računanje udaljenosti između kamere i vrha čestice koji se trenutno gleda
  var srediste_eksplozije: vec3f = vec3f(parametri.pozicija_eksplozije.x,
                                    parametri.pozicija_eksplozije.y,
                                    parametri.pozicija_eksplozije.z);
  var pozicija_cestice: vec3f = vektor_pomaka.xyz;
  vsOut.udaljenost = distance(pozicija_cestice, srediste_eksplozije);

  return vsOut;
}

//Fragment shader za bojanje čestica tako da su svijetlije što su bliže kameri
@fragment fn fsCestice(vsOut: VSOutput) -> @location(0) vec4f {
  //Izračun faktora udaljenosti koji "smanjuje/povećava" svjetlinu čestice
  let faktor_udaljenosti = 8 / (3 + vsOut.udaljenost * 0.001);

  let prilagodena_boja = vsOut.boja * faktor_udaljenosti;
  return prilagodena_boja;
}

@vertex fn vsGrid(
  @builtin(vertex_index) i_vertex:u32,
  @builtin(instance_index) i_instance:u32) -> VSOutput {

  var vsOut: VSOutput;
  var br_iteracija = u32(5000);
  var sirina_resetke = f32(100000);
  var razmak_resetki = f32(500);
  var predznak = 1.0;
  if(i_vertex%2==1){
    predznak*=-1;
  }

  var x = 0.0;
  var z = predznak*sirina_resetke;
  var pomak_u_iza = i_instance;

  if(i_instance>br_iteracija){
    pomak_u_iza -= br_iteracija;
    x = razmak_resetki*f32(pomak_u_iza)-sirina_resetke*2;

  }else{
    x = razmak_resetki*f32(pomak_u_iza)-sirina_resetke*2;
    let pom = z;
    z = x;
    x = pom;
  }

  vsOut.koordinate_vrha = vec4f(x,0,z,1);
  vsOut.koordinate_vrha = parametri.matrica_3d*vsOut.koordinate_vrha;

  return vsOut;
}


@fragment fn fsGrid(vsOut: VSOutput) -> @location(0) vec4f {
  return vec4f(0.17,0.17,0.17,1);
}

`;
