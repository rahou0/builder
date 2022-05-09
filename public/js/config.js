import { THREE, FBXLoader, GLTFLoader, OrbitControls } from "./threejs.js";
const canvas = document.querySelector(".scene");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 750);
camera.position.set(0, 2, 4);
camera.lookAt(new THREE.Vector3(0, 0, 0));
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  canvas: canvas,
});
renderer.setSize(800, 400);
const ambient = new THREE.AmbientLight(0x404040, 5);
ambient.name = "scene_element";
scene.add(ambient);
const controls = new OrbitControls(camera, renderer.domElement);
controls.damping = 0.2;
controls.update();
let gltfLoader = new GLTFLoader();
let fbxLoader = new FBXLoader();
const clock = new THREE.Clock();

export { scene, camera, renderer, fbxLoader, gltfLoader, clock };
