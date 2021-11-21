import "./style.scss";
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";

// Canvas
const canvas = document.querySelector(".webgl");

// Every Three js scene needs a scene, camera, objects and a renderer
const scene = new THREE.Scene();

// Make a simple red cube
// To create an object, we need a Mesh, combination of a
// - geometry (shape)
// - material (how it looks)
const geometry = new THREE.BoxGeometry(1, 3, 1); // Length, width, height - no units
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Parameter is an object of properties and values
// RRGGBB - red is all the way up so it's FF ()

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh); // Always add everything to the scene

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height); // FOV (in degrees - 55 max for most objects), Aspect Ratio - width/height
// Move the camera backwards or else it will be inside of the cube

// Conrols
const controls = new TrackballControls(camera, canvas);
controls.enableDamping = true;
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

// Renderer - Result is drawn into a canvas
const renderer = new THREE.WebGLRenderer({
  canvas: canvas, // could remove duplicate canvas because they are the same name
  alpha: true, // Set the background of the canvas element to transparent
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Animate
const clock = new THREE.Clock();

const tick = () => {
  // const elapsedTime = clock.getElapsedTime();
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
