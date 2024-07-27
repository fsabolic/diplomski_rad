const cesticeRenderShaderiWGSL = /*wgsl*/ `
//Parametri simulacije (uniforms)
struct Parametri {
  matrica_3d: mat4x4f,
  pozicija_promatraca: vec3f,
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
@vertex fn vs(
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
  var pozicija_kamere: vec3f = vec3f(parametri.pozicija_promatraca.x*1.7,
                                    parametri.pozicija_promatraca.y*1.7,
                                    parametri.pozicija_promatraca.z*1.7);
  var pozicija_cestice: vec3f = vektor_pomaka.xyz;
  vsOut.udaljenost = distance(pozicija_cestice, pozicija_kamere);

  return vsOut;
}

//Fragment shader za bojanje čestica tako da su svijetlije što su bliže kameri
@fragment fn fs(vsOut: VSOutput) -> @location(0) vec4f {
  //Izračun faktora udaljenosti koji "smanjuje/povećava" svjetlinu čestice
  let faktor_udaljenosti =5 / (3 + vsOut.udaljenost * 0.00045);
  let prilagodena_boja = vsOut.boja * faktor_udaljenosti;
  return prilagodena_boja;
}
`;
