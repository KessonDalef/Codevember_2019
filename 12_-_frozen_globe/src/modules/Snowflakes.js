import {
    Vector3,
    Geometry,
    PointsMaterial,
    Points,
} from '../../../node_modules/three/build/three.module.js';

import {
    limit
} from '../../../utils/math.js';

const ParticleSystem = function (w_, h_) {

    // variables for the gravity and the physics
    this.acceleration = [];
    this.velocity = [];
    this.weight = [];
    this.size = [];
    this.wind = [];
    this.generalWind = -0.2 + (Math.random() * 0.4);

    // create the particle variable
    this.particlesCount = (100 + Math.floor(Math.random() * 1000)) * 1;
    this.particles = new Geometry();
    this.particlesMaterial = new PointsMaterial({
        color: 0x88ffff,
        size: 10,
        sizeAttenuation: true
    });

    for (let i = 0; i < this.particlesCount; i++) {
        let px = -(w_*2) + (Math.random() * w_ * 4);
        let py = (h_*2) - (Math.random() * h_ * 4);
        let pz = (Math.random() * 6000);

        let particle = new Vector3(px, py, pz);

        this.acceleration.push(new Vector3(0, 0, 0));
        this.velocity.push(new Vector3(0, 0, 0));
        this.weight.push(1.5 + (Math.random() * 1.5));
        this.wind.push(-0.05 + (Math.random() * 0.1));

        this.particles.vertices.push(particle);
    }

    // Create a new particle system with the particles and the material
    this.ParticleSystem = new Points(this.particles, this.particlesMaterial);
    this.ParticleSystem.position.z = -3000;
    this.ParticleSystem.rotateX = Math.PI / 2;

    // update function
    this.update = function (w_, h_) {
        for (let i = 0; i < this.particlesCount; i++) {

            let particle = this.particles.vertices[i];

            if (particle.y > h_*2) {
                particle.x = -(w_ * 2) + (Math.random() * w_ * 4);
                particle.y = (h_ * 2) - (Math.random() * h_ * 4);
                this.weight[i] = 1.5 + (Math.random() * 1.5);
            }

            this.acceleration[i].multiplyScalar(0);
            this.acceleration[i].y -= this.weight[i];
            this.acceleration[i].x += this.generalWind + this.wind[i];
            this.acceleration[i] = limit(this.acceleration[i], 1);

            this.velocity[i].add(this.acceleration[i]);
            this.velocity[i] = limit(this.velocity[i], this.weight[i] * this.weight[i]);

            particle.sub(this.velocity[i]);
        }

        // flag to the particle system
        // that we've changed its vertices.
        this.particles.verticesNeedUpdate = true;
    };

}

export {
    ParticleSystem
};