//SOURCE: https://webgpufundamentals.org/webgpu/lessons/webgpu-cameras.html
const mat4 = {
  perspektiva(
    fovRadijani,
    aspekt,
    zBlizu,
    zDaleko,
    dst = new Float32Array(16)
  ) {
    const f = Math.tan(Math.PI * 0.5 - 0.5 * fovRadijani);
    const rangeInv = 1 / (zBlizu - zDaleko);

    dst.set([
      f / aspekt,
      0,
      0,
      0,
      0,
      f,
      0,
      0,
      0,
      0,
      zDaleko * rangeInv,
      -1,
      0,
      0,
      zBlizu * zDaleko * rangeInv,
      0,
    ]);

    return dst;
  },

  identitet(dst = new Float32Array(16)) {
    dst.set([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    return dst;
  },

  mnozi(a, b, dst) {
    dst = dst || new Float32Array(16);

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        dst[i * 4 + j] = 0;
        for (let k = 0; k < 4; k++) {
          dst[i * 4 + j] += b[i * 4 + k] * a[k * 4 + j];
        }
      }
    }

    return dst;
  },

  inverz(m, dst = new Float32Array(16)) {
    const [
      m00,
      m01,
      m02,
      m03,
      m10,
      m11,
      m12,
      m13,
      m20,
      m21,
      m22,
      m23,
      m30,
      m31,
      m32,
      m33,
    ] = m;

    const tmp = [
      m22 * m33,
      m32 * m23,
      m12 * m33,
      m32 * m13,
      m12 * m23,
      m22 * m13,
      m02 * m33,
      m32 * m03,
      m02 * m23,
      m22 * m03,
      m02 * m13,
      m12 * m03,
      m20 * m31,
      m30 * m21,
      m10 * m31,
      m30 * m11,
      m10 * m21,
      m20 * m11,
      m00 * m31,
      m30 * m01,
      m00 * m21,
      m20 * m01,
      m00 * m11,
      m10 * m01,
    ];

    const t = [
      tmp[0] * m11 +
        tmp[3] * m21 +
        tmp[4] * m31 -
        (tmp[1] * m11 + tmp[2] * m21 + tmp[5] * m31),
      tmp[1] * m01 +
        tmp[6] * m21 +
        tmp[9] * m31 -
        (tmp[0] * m01 + tmp[7] * m21 + tmp[8] * m31),
      tmp[2] * m01 +
        tmp[7] * m11 +
        tmp[10] * m31 -
        (tmp[3] * m01 + tmp[6] * m11 + tmp[11] * m31),
      tmp[5] * m01 +
        tmp[8] * m11 +
        tmp[11] * m21 -
        (tmp[4] * m01 + tmp[9] * m11 + tmp[10] * m21),
    ];

    const d = 1 / (m00 * t[0] + m10 * t[1] + m20 * t[2] + m30 * t[3]);

    dst.set([
      d * t[0],
      d * t[1],
      d * t[2],
      d * t[3],
      d *
        (tmp[1] * m10 +
          tmp[2] * m20 +
          tmp[5] * m30 -
          (tmp[0] * m10 + tmp[3] * m20 + tmp[4] * m30)),
      d *
        (tmp[0] * m00 +
          tmp[7] * m20 +
          tmp[8] * m30 -
          (tmp[1] * m00 + tmp[6] * m20 + tmp[9] * m30)),
      d *
        (tmp[3] * m00 +
          tmp[6] * m10 +
          tmp[11] * m30 -
          (tmp[2] * m00 + tmp[7] * m10 + tmp[10] * m30)),
      d *
        (tmp[4] * m00 +
          tmp[9] * m10 +
          tmp[10] * m20 -
          (tmp[5] * m00 + tmp[8] * m10 + tmp[11] * m20)),
      d *
        (tmp[12] * m13 +
          tmp[15] * m23 +
          tmp[16] * m33 -
          (tmp[13] * m13 + tmp[14] * m23 + tmp[17] * m33)),
      d *
        (tmp[13] * m03 +
          tmp[18] * m23 +
          tmp[21] * m33 -
          (tmp[12] * m03 + tmp[19] * m23 + tmp[20] * m33)),
      d *
        (tmp[14] * m03 +
          tmp[19] * m13 +
          tmp[22] * m33 -
          (tmp[15] * m03 + tmp[18] * m13 + tmp[23] * m33)),
      d *
        (tmp[17] * m03 +
          tmp[20] * m13 +
          tmp[23] * m23 -
          (tmp[16] * m03 + tmp[21] * m13 + tmp[22] * m23)),
      d *
        (tmp[14] * m22 +
          tmp[17] * m32 +
          tmp[13] * m12 -
          (tmp[16] * m32 + tmp[12] * m12 + tmp[15] * m22)),
      d *
        (tmp[20] * m32 +
          tmp[12] * m02 +
          tmp[19] * m22 -
          (tmp[18] * m22 + tmp[21] * m32 + tmp[13] * m02)),
      d *
        (tmp[18] * m12 +
          tmp[23] * m32 +
          tmp[15] * m02 -
          (tmp[22] * m32 + tmp[14] * m02 + tmp[19] * m12)),
      d *
        (tmp[22] * m22 +
          tmp[16] * m02 +
          tmp[21] * m12 -
          (tmp[20] * m12 + tmp[23] * m22 + tmp[17] * m02)),
    ]);

    return dst;
  },

  kamera(promatrac, objekt, gore, dst = new Float32Array(16)) {
    const zOs = vec3.normaliziraj(vec3.oduzmi(promatrac, objekt));
    const xOs = vec3.normaliziraj(vec3.vektorskiProdukt(gore, zOs));
    const yOs = vec3.normaliziraj(vec3.vektorskiProdukt(zOs, xOs));

    dst.set([
      xOs[0],
      xOs[1],
      xOs[2],
      0,
      yOs[0],
      yOs[1],
      yOs[2],
      0,
      zOs[0],
      zOs[1],
      zOs[2],
      0,
      promatrac[0],
      promatrac[1],
      promatrac[2],
      1,
    ]);

    return dst;
  },

  pogledaj(promatrac, objekt, gore, dst) {
    return this.inverz(this.kamera(promatrac, objekt, gore, dst), dst);
  },
};
