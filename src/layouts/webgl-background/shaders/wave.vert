attribute float size;

uniform float time;

void main() {
  vec3 newPosition = position;
  float displacement = sin( (position.x + time) * 0.3 ) * 2.0 +
                        sin( (position.y + time) * 0.2 ) * 2.0;

  newPosition.z = displacement * (.06 * cos(0.5 * time) * position.x - 0.04 * position.y * sin(0.5 * time));
  // newPosition.z = displacement * 2.0 * sin(.06 * cos(time) * position.x + 0.04 * position.y * sin(time));

  // gl_PointSize = (sin( (position.x + time) * 0.3 ) + 1.0 ) * 1.5 +
  //                 (sin( (position.y + time) * 0.2 ) + 1.0 ) * 1.5;

  gl_PointSize = 2.0;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}