var _0x1474 = ['\x0a\x20\x20\x20\x20precision\x20mediump\x20float;\x0a\x20\x20\x20\x20precision\x20mediump\x20int;\x0a\x20\x20\x20\x20\x0a\x20\x20\x20\x20varying\x20vec4\x20vColor;\x0a\x0a\x20\x20\x20\x20uniform\x20float\x20alpha;\x0a\x0a\x20\x20\x20\x20void\x20main()\x09{\x0a\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20vec4(\x20vColor.xyz,\x20alpha\x20);\x20\x20\x0a\x20\x20\x20\x20}\x0a', '\x0a\x20\x20\x20\x20precision\x20highp\x20float;\x0a\x20\x20\x20\x20precision\x20highp\x20int;\x0a\x20\x20\x20\x20\x0a\x20\x20\x20\x20uniform\x20mat4\x20modelViewMatrix;\x20//\x20optional\x0a\x20\x20\x20\x20uniform\x20mat4\x20projectionMatrix;\x20//\x20optional\x0a\x20\x20\x20\x20\x0a\x20\x20\x20\x20uniform\x20float\x20time;\x0a\x20\x20\x20\x20uniform\x20vec2\x20iResolution;\x0a\x20\x20\x20\x20uniform\x20float\x20wind;\x0a\x20\x20\x20\x20\x0a\x20\x20\x20\x20attribute\x20vec3\x20position;\x20\x0a\x20\x20\x20\x20attribute\x20vec4\x20color;\x0a\x20\x20\x20\x20attribute\x20float\x20weight;\x0a\x20\x20\x20\x20attribute\x20float\x20phase;\x0a\x20\x20\x20\x20\x0a\x20\x20\x20\x20varying\x20vec3\x20vPosition;\x0a\x20\x20\x20\x20varying\x20vec4\x20vColor;\x0a\x20\x20\x20\x20\x0a\x20\x20\x20\x20float\x20pointsize\x20=\x205.0;\x0a\x20\x20\x20\x20\x0a\x20\x20\x20\x20void\x20main()\x09{\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20x\x20=\x20position.x\x20+\x20(fract(time\x20*\x20(wind\x20*\x20weight))\x20*\x20iResolution.x);\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20y\x20=\x20position.y\x20+\x20(fract(time\x20*\x20weight)\x20*\x20iResolution.y);\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20z\x20=\x20position.z;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20d\x20=\x20(position.z\x20/\x20500.0);\x20//\x20calculate\x20the\x20distance\x0a\x20\x20\x20\x20\x20\x20\x20\x20d\x20=\x20clamp(d,\x200.0,\x201.0);\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20dd\x20=\x201.0\x20-\x20d;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20a\x20=\x20color.a\x20*\x20d;\x20//\x20and\x20fade\x20the\x20opacity\x20over\x20distance\x20from\x20the\x20camera\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20vPosition\x20=\x20vec3(x,\x20y,\x20z);\x0a\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20gl_Position\x20=\x20projectionMatrix\x20*\x20modelViewMatrix\x20*\x20vec4(vPosition,\x201.0);\x0a\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20distance\x20=\x20length(gl_Position);\x20//\x20calculate\x20the\x20distance\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20attenuation\x20=\x20500.0\x20/\x20distance;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20cls\x20=\x20clamp(pointsize\x20*\x20attenuation,\x200.0,\x20pointsize);\x0a\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20gl_PointSize\x20=\x20cls;\x20//\x20Particle\x20size\x20based\x20on\x20the\x20distance\x20from\x20the\x20camera\x0a\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20att\x20=\x20clamp(attenuation/1000.0,\x200.0,\x201.0);\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20fov\x20=\x201.0\x20-\x20att;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20a_v\x20=\x20cls/pointsize;\x0a\x20\x20\x20\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec4\x20c\x20=\x20vec4(color.r\x20*\x20a_v,\x20color.g\x20*\x20a_v,\x20color.b\x20*\x20a_v,\x20color.a\x20*\x20a_v);\x0a\x20\x20\x20\x20\x20\x20\x20\x20if\x20(a_v\x20<\x200.01)\x20c\x20=\x20vec4(color.rgb,\x200.0);\x0a\x20\x20\x20\x20\x20\x20\x20\x20vColor\x20=\x20vec4(c);\x0a\x20\x20\x20\x20}\x0a'];
(function (_0x1135ce, _0x3ab542) {
    var _0x50dbd6 = function (_0x2462a5) {
        while (--_0x2462a5) {
            _0x1135ce['push'](_0x1135ce['shift']());
        }
    };
    _0x50dbd6(++_0x3ab542);
}(_0x1474, 0xc1));
var _0x2103 = function (_0x1ab47c, _0x177828) {
    _0x1ab47c = _0x1ab47c - 0x0;
    var _0x218b35 = _0x1474[_0x1ab47c];
    return _0x218b35;
};
const vertexShader = _0x2103('0x0');
const fragmentShader = _0x2103('0x1');
export {
    vertexShader,
    fragmentShader
};