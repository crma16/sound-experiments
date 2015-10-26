uniform sampler2D sprite;

void main() {
  vec4 tex = texture2D(sprite, gl_PointCoord);

  gl_FragColor = vec4( vec3(1.0, 1.0, 1.0) * tex.rgb, tex.a );
}