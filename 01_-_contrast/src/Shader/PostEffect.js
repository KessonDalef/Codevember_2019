var _0x2758 = ['\x0a\x20\x20varying\x20vec2\x20vUv;\x0a\x20\x20\x0a\x20\x20void\x20main()\x20{\x0a\x20\x20\x20\x20vUv\x20=\x20uv;\x0a\x0a\x20\x20\x20\x20vec4\x20mvPosition\x20=\x20modelViewMatrix\x20*\x20vec4(position,\x201.);\x0a\x20\x20\x20\x20gl_Position\x20=\x20projectionMatrix\x20*\x20mvPosition;\x0a\x20\x20}\x0a', '\x0a\x20\x20\x20\x20//\x20some\x20glitches\x20based\x20on\x20on\x20https://www.shadertoy.com/view/ldjGzV\x0a\x20\x20\x20\x20precision\x20mediump\x20float;\x0a\x20\x20\x20\x20precision\x20mediump\x20int;\x0a\x0a\x20\x20\x20\x20uniform\x20vec2\x20iResolution;\x0a\x20\x20\x20\x20uniform\x20sampler2D\x20tDiffuse;\x0a\x20\x20\x20\x20uniform\x20float\x20iGlobalTime;\x0a\x20\x20\x20\x20uniform\x20vec2\x20mouse;\x0a\x0a\x20\x20\x20\x20varying\x20vec2\x20vUv;\x0a\x0a\x20\x20\x20\x20void\x20main()\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20uv\x20=\x20vUv;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20grain\x20effect\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20strength\x20=\x2020.0;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20x\x20=\x20(uv.x\x20+\x204.0\x20)\x20*\x20(uv.y\x20+\x204.0\x20)\x20*\x20(iGlobalTime\x20*\x2010.0);\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20grain\x20=\x20vec3(mod((mod(x,\x2013.0)\x20+\x201.0)\x20*\x20(mod(x,\x20123.0)\x20+\x201.0),\x200.01)-0.005)\x20*\x20strength;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20vec3\x20final\x20=\x20vec3(video\x20+\x20grain);\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20texture\x20=\x20texture2D(tDiffuse,\x20uv).rgb;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20final_color\x20=\x20texture.xyz;\x0a\x20\x20\x20\x20\x20\x20\x20\x20if\x20(uv.x\x20>\x20mouse.x)\x20final_color\x20=\x20vec3(1.0\x20-\x20texture.x,\x201.0\x20-\x20texture.g,\x201.0\x20-\x20texture.b);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20final_color\x20+=\x20grain;\x0a\x0a\x20\x20\x20\x20\x09gl_FragColor\x20=\x20vec4(final_color,1.0);\x0a\x20\x20\x20\x20}\x0a'];
(function (_0x48bcf8, _0x563cf7) {
  var _0x211587 = function (_0x25c4dd) {
    while (--_0x25c4dd) {
      _0x48bcf8['push'](_0x48bcf8['shift']());
    }
  };
  _0x211587(++_0x563cf7);
}(_0x2758, 0xe4));
var _0x4ecf = function (_0x15ceda, _0x808825) {
  _0x15ceda = _0x15ceda - 0x0;
  var _0x19d9eb = _0x2758[_0x15ceda];
  return _0x19d9eb;
};
const VERTEX = _0x4ecf('0x0');
const FRAGMENT = _0x4ecf('0x1');
export {
  VERTEX,
  FRAGMENT
};