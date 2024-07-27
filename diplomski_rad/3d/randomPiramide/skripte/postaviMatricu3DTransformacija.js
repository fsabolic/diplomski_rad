function postaviMatricu3DTransformacija() {
  const aspekt = canvas.clientWidth / canvas.clientHeight;
  const perspektiva = mat4.perspektiva(
    (100 * Math.PI) / 180,
    aspekt,
    1, // zBlizu
    2000000000 // zDaleko
  );

  const objekt = [0, 1245, 0];
  const promatrac = [0, 700, -1905];

  uniRenderParamsViews.pozicijaPromatraca.set(
    new Float32Array([promatrac[0], promatrac[1], promatrac[2]])
  );

  const up = [0, 1, 0];
  const viewMatrix = mat4.pogledaj(promatrac, objekt, up);
  const viewProjectionMatrix = mat4.mnozi(perspektiva, viewMatrix);

  const angle = 0;
  const x = 0;
  const y = 0;
  const z = 0;

  return mat4.translatiraj(
    viewProjectionMatrix,
    [x, y, z],
    uniRenderParamsViews.matrica3d
  );
}
