import * as THREE from '../../node_modules/three/build/three.module.js'

import {
    OrbitControls
}
from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';

import {
    ParticleSystem
} from './modules/ParticleSystem.js';
var particle_system;

import {
    PostProcessing
} from './modules/postProcessing.js';
var post_processing;

/* Check if is running on a mobile device */
import {
    MobileCheck
} from '../../utils/MobileCheck.js';
const mobileCheck = new MobileCheck();
const isMobile = mobileCheck.isMobile;

// set up the scene
var scene, camera, renderer;

// Orbit camera
var orbit;

// Mouse and mouse pointer for linear interpolation
var mouse = new THREE.Vector2(0.0, 0.0);
var mouse_nd = new THREE.Vector2(0.0, 0.0);
var mouse_m = 0.1; // Interpolation speed

// Orientation, for mobile devices
var orientation_start = new THREE.Vector2(-1000000, -1000000);

// Focus, to focus on specific point and remove the blur on mouse click
var focus = 1;
var focus_nd = 1;

// screen resolution
var resolution;

/* EVENTS */

// make the canvas adaptable to the window screen
window.addEventListener('resize', function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);
    post_processing.adaptResolution(width, height);
});

// Mouse Pointer function
function mousePointer(e) {
    mouse_nd.x = e.pageX;
    mouse_nd.y = e.pageY;
}

// Device orientation function
function deviceOrientationListener(event) {
    if (orientation_start.x === -1000000 && orientation_start.y === -1000000) {
        orientation_start.x = event.gamma;
        orientation_start.y = event.beta;
    }

    mouse_nd.x = (orientation_start.x - event.gamma) * 50.0;
    mouse_nd.y = (orientation_start.y - event.beta) * 10.0;
}

// On mouse press, for the focus effect
document.onmousedown = function () {
    focus_nd = 4;
}

document.onmouseup = function () {
    focus_nd = 1;
}

window.onload = function () {

    setTimeout(function () {
        document.getElementById('title').classList.add('intro');

        setTimeout(function () {
            document.getElementById('codevember').classList.add('intro');
        }, 250);

    }, 250);

    setTimeout(function () {
        document.getElementById('title').classList.add('outro');

        setTimeout(function () {
            document.getElementById('codevember').classList.add('outro');
        }, 250);

    }, 8000);

    if (isMobile) {
        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", deviceOrientationListener);
        }
    } else {
        window.addEventListener('mousemove', mousePointer);
    }

    // set up the scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xff0000, 0.7);

    // set up the camera
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 10000000);
    camera.position.z = -750;
    camera.position.y = 50;

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        preserveDrawingBuffer: true
    });
    renderer.setPixelRatio(1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x010101, 1.0);
    document.body.appendChild(renderer.domElement);

    resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);

    post_processing = new PostProcessing(window.innerWidth, window.innerHeight, renderer, scene, camera);

    let particlesAmount = 0;
    let multiplier = 0;

    if (!isMobile) {
        particlesAmount = 512;
        multiplier = 3;
    } else {
        particlesAmount = 200;
        multiplier = 4;
    }

    orbit = new OrbitControls(camera, renderer.domElement);
    orbit.autoRotate = false;
    orbit.enabled = false;
    orbit.update();

    particle_system = new ParticleSystem(particlesAmount, multiplier, isMobile);
    scene.add(particle_system.ParticleSystem);

    animate();
};

// update function
function update() {
    // Update the mouse, linear interpolation
    mouse.x = 0.1 * (mouse_nd.x - mouse.x) + mouse.x;
    mouse.y = 0.1 * (mouse_nd.y - mouse.y) + mouse.y;

    // Update the focuse
    focus = 0.1 * (focus_nd - focus) + focus;

    // Update the orbit camera to turn around
    var orbx = (mouse.x - resolution.x / 2) * -mouse_m;
    var orby = (mouse.y - resolution.y / 2) * -mouse_m;
    orbit.target = new THREE.Vector3(orbx, orby, 0);
    orbit.update();

    particle_system.update(performance.now());
};

// Loop and render function
function animate() {

    requestAnimationFrame(animate);

    // update and render
    update();

    renderer.render(scene, camera);

    post_processing.runShader(focus, mouse);
};