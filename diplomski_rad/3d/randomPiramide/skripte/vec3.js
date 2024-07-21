//SOURCE: https://webgpufundamentals.org/webgpu/lessons/webgpu-cameras.html
const vec3 = {
  vektorskiProdukt(a, b, dst) {
    dst = dst || new Float32Array(3);

    const t0 = a[1] * b[2] - a[2] * b[1];
    const t1 = a[2] * b[0] - a[0] * b[2];
    const t2 = a[0] * b[1] - a[1] * b[0];

    dst[0] = t0;
    dst[1] = t1;
    dst[2] = t2;

    return dst;
  },

  oduzmi(a, b, dst) {
    dst = dst || new Float32Array(3);

    dst[0] = a[0] - b[0];
    dst[1] = a[1] - b[1];
    dst[2] = a[2] - b[2];

    return dst;
  },

  normaliziraj(v, dst) {
    dst = dst || new Float32Array(3);

    const duljina = this.duljina(v);
    // make sure we don't divide by 0.
    if (duljina > 0.00001) {
      dst[0] = v[0] / duljina;
      dst[1] = v[1] / duljina;
      dst[2] = v[2] / duljina;
    } else {
      dst[0] = 0;
      dst[1] = 0;
      dst[2] = 0;
    }

    return dst;
  },

  duljina(v) {
    return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2) + Math.pow(v[2], 2));
  },
};
