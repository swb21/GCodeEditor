const $ = require("jquery");
const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE);

const editor = {
    scene: null,
    light: null,
    grid: null,
    camera: null,
    renderer: null,
    orbitControl: null,
    lights: null,

    domElement: $('.project-canvas'),

    init() {
        init();
    },

    animate() {
        animate();
    }
};

$(document).ready(() => {
    editor.init();
    editor.animate();

    $(window).on('resize', onWindowResize);
});

let projectCanvas = $('.project-canvas');

function init() {
    let sceneSize = 1000;

    let editorWidth = editor.domElement.innerWidth();
    let editorHeight = editor.domElement.innerHeight();

    editor.scene = new THREE.Scene();
    editor.scene.background = new THREE.Color(0xf0f0f0);

    editor.camera = new THREE.PerspectiveCamera(50, editorWidth / editorHeight, 0.5, sceneSize * 1.5);
    editor.camera.position.set(0, sceneSize * 0.3, sceneSize * -0.4);
    editor.camera.lookAt(0, 0, 0);

    editor.renderer = new THREE.WebGLRenderer();
    editor.renderer.setSize(editorWidth, editorHeight);
    editor.domElement.append(editor.renderer.domElement);

    // Editor grid
    editor.grid = new THREE.GridHelper(sceneSize, 100);
    editor.grid.material.opacity = 0.25;
    editor.grid.material.transparent = true;
    editor.scene.add(editor.grid);

    // Movement of the camera
    editor.orbitControl = new OrbitControls(editor.camera, editor.renderer.domElement);
    editor.orbitControl.screenSpacePanning = true;
    editor.orbitControl.minDistance = 0.5;
    editor.orbitControl.maxDistance = sceneSize;
    editor.orbitControl.update();

    editor.lights = [];
    for (let i = 0; i < 10; i++) {
        editor.lights.push(new THREE.PointLight(0xffffff, .6, 0));
    }

    editor.lights[0].position.set(0, sceneSize, 0);
    editor.lights[1].position.set(0, -sceneSize, 0);
    editor.lights[2].position.set(sceneSize, 0, 0);
    editor.lights[3].position.set(-sceneSize, 0, 0);
    editor.lights[4].position.set(0, 0, sceneSize);
    editor.lights[5].position.set(0, 0, -sceneSize);
    editor.lights[6].position.set(sceneSize, sceneSize, sceneSize);
    editor.lights[7].position.set(-sceneSize, sceneSize, -sceneSize);
    editor.lights[8].position.set(sceneSize, -sceneSize, sceneSize);
    editor.lights[9].position.set(-sceneSize, -sceneSize, -sceneSize);

    editor.lights.forEach((light) => {
        editor.scene.add(light);
    });
}

function animate() {
    requestAnimationFrame(animate);

    editor.renderer.render(editor.scene, editor.camera);
    editor.orbitControl.update();
}

function onWindowResize() {
    let editorWidth = editor.domElement.innerWidth();
    let editorHeight = editor.domElement.innerHeight();

    editor.camera.aspect = editorWidth / editorHeight;
    editor.camera.updateProjectionMatrix();
    editor.renderer.setSize(editorWidth, editorHeight);
}

module.exports = editor;