export const signalVertex = /* glsl */ `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

/**
 * Professional monochrome gradient mesh.
 * Soft tonal washes, continuous vertical flow, restrained highlights.
 * Dark: white mist on void. Light: charcoal ink on paper.
 */
export const signalFragment = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uDark;
uniform float uMobile;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.02 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

float blob(vec2 p, vec2 c, vec2 r) {
  vec2 d = (p - c) / r;
  return exp(-dot(d, d));
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

  // Editorial drift — slow enough to feel like atmosphere, not animation
  float speed = mix(0.02, 0.014, uMobile);
  float t = uTime * speed;

  vec2 pointer = (uPointer - 0.5) * vec2(aspect, 1.0);

  // Soft domain warp — wide, low-amplitude so fields melt rather than swirl
  float warpAmp = mix(0.07, 0.045, uMobile);
  vec2 warpA = vec2(
    fbm(p * 0.72 + vec2(t * 0.07, -t * 0.045)),
    fbm(p * 0.72 + vec2(-t * 0.05, t * 0.08) + 3.8)
  );
  vec2 warpB = vec2(
    fbm(p * 1.25 + vec2(-t * 0.035, t * 0.06) + 1.4),
    fbm(p * 1.25 + vec2(t * 0.045, t * 0.03) + 6.1)
  );
  vec2 pw = p + (warpA - 0.5) * warpAmp + (warpB - 0.5) * warpAmp * 0.28;

  // Four soft centers — wider radii, quieter motion, less pointer pull
  vec2 c1 = vec2(
    0.36 + sin(t * 0.24) * 0.06 + cos(t * 0.13) * 0.03,
    0.06 + cos(t * 0.2) * 0.055 + sin(t * 0.11) * 0.02
  );
  vec2 c2 = vec2(
    0.04 + cos(t * 0.17) * 0.07,
    0.18 + sin(t * 0.21) * 0.055
  );
  vec2 c3 = vec2(
    0.48 + sin(t * 0.15 + 1.2) * 0.055,
    -0.16 + cos(t * 0.22) * 0.05
  );
  vec2 c4 = mix(vec2(0.34, 0.03), pointer * 0.22, 0.18)
    + vec2(sin(t * 0.26) * 0.018, cos(t * 0.22) * 0.014);

  float scale = mix(1.08, 0.96, uMobile);
  float b1 = blob(pw, c1, vec2(0.82, 0.64) * scale);
  float b2 = blob(pw, c2, vec2(0.7, 0.56));
  float b3 = blob(pw, c3, vec2(0.66, 0.72));
  float b4 = blob(pw, c4, vec2(0.48, 0.42));

  float field = b1 * 1.0 + b2 * 0.78 + b3 * 0.72 + b4 * 0.38;
  float mesh = smoothstep(0.02, 1.25, field);

  // Soft underpaint — barely-there terrain
  float terrain = fbm(pw * 1.05 + vec2(t * 0.03, -t * 0.022));

  // Palette — refined neutrals, closer to paper/void for quieter contrast
  vec3 paper = vec3(0.988, 0.988, 0.99);
  vec3 voidCol = vec3(0.018, 0.018, 0.022);
  vec3 inkSoft = vec3(0.16, 0.165, 0.18);
  vec3 inkDeep = vec3(0.08, 0.082, 0.09);
  vec3 chalkSoft = vec3(0.78, 0.79, 0.815);
  vec3 chalkBright = vec3(0.9, 0.905, 0.92);

  vec3 base = mix(paper, voidCol, uDark);
  vec3 toneA = mix(inkSoft, chalkSoft, uDark);
  vec3 toneB = mix(inkDeep, chalkBright, uDark);

  // Smooth tonal blend by blob contribution
  float blend = clamp((b1 * 0.8 + b3 * 0.55) / max(field, 0.001), 0.0, 1.0);
  vec3 meshCol = mix(toneA, toneB, blend);

  float meshStrength = mix(0.2, 0.28, uDark);
  vec3 col = mix(base, meshCol, mesh * meshStrength);

  // Terrain: print-level variation only
  col = mix(col, mix(vec3(0.95), vec3(0.05), uDark), terrain * mix(0.02, 0.035, uDark));

  // One soft specular — polish, not sparkle
  float hi = blob(p, c1 + vec2(-0.05, 0.03), vec2(0.22, 0.17));
  col += mix(inkSoft, chalkBright, uDark) * hi * mix(0.045, 0.09, uDark);

  // Wide diagonal sheen — slow light fall, very restrained
  float sheen = abs(pw.x * 0.28 + pw.y * 0.9 - 0.01 - sin(t * 0.1) * 0.05);
  float sheenBand = (1.0 - smoothstep(0.0, 0.5, sheen)) * mix(0.035, 0.028, uDark);
  col += mix(inkSoft, chalkSoft, uDark) * sheenBand;

  // Left copy zone — calm, readable
  float copyMask = smoothstep(0.04, 0.55, uv.x);
  vec3 copyBase = base + mix(inkSoft, chalkSoft, uDark) * mix(0.01, 0.006, uDark);
  col = mix(copyBase, col, 0.32 + copyMask * 0.68);

  // Soft vignette toward edges
  float vig = smoothstep(1.65, 0.52, length((uv - vec2(0.58, 0.46)) * vec2(1.02, 1.08)));
  col = mix(col * mix(0.985, 0.62, uDark), col, vig);

  // Vertical dissolve toward page — longer fade into the chapter flow
  float floorFade = smoothstep(0.0, 0.48, uv.y);
  col = mix(base, col, 0.42 + floorFade * 0.58);

  // Fine grain — print texture, not film noise
  float grain = (hash(uv * uResolution.xy + floor(uTime * 6.0)) - 0.5)
    * mix(0.008, 0.014, uDark);
  col += grain;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;
