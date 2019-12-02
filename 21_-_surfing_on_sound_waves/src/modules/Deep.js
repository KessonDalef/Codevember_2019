import {
    Vector2,
    BufferGeometry,
    Float32BufferAttribute,
    RawShaderMaterial,
    DoubleSide,
    AdditiveBlending,
    Points
} from '../../../node_modules/three/build/three.module.js';

import {
    vertexShader,
    fragmentShader
} from '../Shaders/Shaders.js';

import {
    ImprovedNoise
} from '../../../libs/ImprovedNoise.js';

const Tunnel = function (tot, r) {

    this.positions = [];
    this.angles = []
    this.uvs = [];
    this.noise = [];
    this.micro_noise = [];

    this.perlin = new ImprovedNoise();

    this.xnoise = Math.random() * 10.0;
    this.xnspeed = Math.random() * 0.02;
    this.ynoise = Math.random() * 10.0;
    this.ynspeed = Math.random()*0.02;

    let max = tot;

    this.r = r;

    for (let i = 0; i < max; i++) {
        
        let uvx = i / (max - 1);
        
        for (let j = 0; j < max; j++) {

            let a = (j / (max - 1)) * Math.PI;

            let xa = Math.cos(a);
            let ya = Math.sin(a);

            let uvy = j / (max - 1);

            let x = r * xa;
            let y = r * ya;
            let z = (uvx) * 8000;

            this.positions.push(x);
            this.positions.push(y);
            this.positions.push(z);

            // this.positions.push(Math.random() * 1000);
            // this.positions.push(Math.random() * 1000);
            // this.positions.push(Math.random() * 1000);

            this.angles.push(xa);
            this.angles.push(ya);

            this.noise.push(ya);
            this.noise.push(uvy);

            this.uvs.push(uvx);
            this.uvs.push(uvy);

        }

    }

    this.geometry = new BufferGeometry();

    this.geometry.setAttribute('position', new Float32BufferAttribute(this.positions, 3));
    this.geometry.setAttribute('angle', new Float32BufferAttribute(this.angles, 2));
    this.geometry.setAttribute('noise', new Float32BufferAttribute(this.noise, 2));
    this.geometry.setAttribute('soundUV', new Float32BufferAttribute(this.uvs, 2));

    this.material = new RawShaderMaterial({
        uniforms: {
            soundTexture: {
                type: 't',
                value: null
            },
            time: {
                type: 'f',
                value: 0.0
            },
            radius: {
                type: 'f',
                value: r
            },
            sensitivity: {
                type: 'f',
                value: r*.75
            },
            uDistortionX: {
                type: 'v2',
                value: new Vector2(80, 3),
            },
            uDistortionY: {
                type: 'v2',
                value: new Vector2(-40, 6.5)
            },
            uTravelLength: {
                type: 'f',
                value: 8000.0
            }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: DoubleSide,
        blending: AdditiveBlending,
        depthTest: false,
        transparent: true,
        depthWrite: true,
        vertexColors: true,
    });

    this.ParticleSystem = new Points(this.geometry, this.material);
    // this.ParticleSystem.positionY = this.r * 0.5;
    this.ParticleSystem.rotateZ(Math.PI);
    // this.ParticleSystem.rotateX(Math.PI);
    // this.ParticleSystem.positionY = 800;

    this.update = function(time, texture, n) {
        
        let t = time * 0.00001;
        let t2 = t * 10;
        let xn = this.perlin.noise(this.xnoise, t, this.ynoise);
        let yn = this.perlin.noise(this.ynoise, t, this.xnoise);
        let dist_x = new Vector2(xn * 80, 2.0 + Math.cos(t) * 1.0);
        let dist_y = new Vector2(yn * 40, 1.5 + Math.cos(t2) * 2.0);

        this.ParticleSystem.material.uniforms.uDistortionX.value = dist_x;
        this.ParticleSystem.material.uniforms.uDistortionY.value = dist_y;
        this.ParticleSystem.material.uniforms.time.value = time;
        this.ParticleSystem.material.uniforms.soundTexture.value = texture;
        this.ParticleSystem.material.needsUpdate = true;
        this.ParticleSystem.material.elementsNeedUpdate = true;

        this.xnoise += this.xnspeed;
        this.ynoise += this.ynspeed;

    }
}

export { Tunnel };