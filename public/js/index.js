import { THREE } from "./threejs.js";
import {
  scene,
  camera,
  renderer,
  fbxLoader,
  gltfLoader,
  clock,
} from "./config.js";
import { chooseSpatialRelation } from "./arrangmentController.js";
import { animations, models } from "./db.js";
let mixer;
const ground_geometry = new THREE.PlaneGeometry(10, 10);
const floor_texture = new THREE.TextureLoader().load(
  "textures/ground_flor.jpeg"
);
const ground_material = new THREE.MeshBasicMaterial({
  map: floor_texture,
  side: THREE.DoubleSide,
});
let rightFoot = null;
let old_position = null;
const plane = new THREE.Mesh(ground_geometry, ground_material);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);
const geometry = new THREE.BoxGeometry(10, 10, 10);
const geo = new THREE.SphereGeometry(0.1, 0.1, 0.1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mat = new THREE.MeshBasicMaterial({ color: 0xb61919 });
let cube = new THREE.Mesh(geometry, material);
let sphere = new THREE.Mesh(geo, mat);
let ball = new THREE.Mesh(geo, mat);

const animate = function () {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  renderer.render(scene, camera);
  var handPosition = new THREE.Vector3();
  const position = cube.getWorldPosition(handPosition);
  sphere.position.setX(position.x);
  sphere.position.setZ(position.z);
  TWEEN.update();
};
function loadModel(url, type) {
  return new Promise((resolve) => {
    switch (type) {
      case "fbx":
        fbxLoader.load(url, resolve);
        break;
      default:
        gltfLoader.load(url, resolve);
        break;
    }
  });
}
const generate = () => {
  try {
    for (var i = scene.children.length - 1; i >= 0; i--) {
      if (scene.children[i].scene_key) scene.remove(scene.children[i]);
    }
    let obj1 = document.getElementById("obj1").value;
    let relation = document.getElementById("spatial_relation").value;
    let obj2 = document.getElementById("obj2").value;
    let action = document.getElementById("animation").value;
    const loadedmodels = [];
    let model_obj1, model_obj2, animation_model;
    loadedmodels.push(
      loadModel(models[obj1].url, models[obj1].type).then((result) => {
        if (models[obj1].type === "fbx") model_obj1 = result;
        else model_obj1 = result.scene.clone();
        model_obj1.data = models[obj1];
        model_obj1.scene_key = "scene_example";
        model_obj1.scale.setScalar(models[obj1].scale);
        if (models[obj1].face)
          model_obj1.rotation.y = THREE.Math.degToRad(models[obj1].face);
        // model_obj1.traverse(function (child) {
        //   if (child.isMesh) {
        //     child.castShadow = true;
        //     child.receiveShadow = true;
        //   }
        // });
      })
    );
    loadedmodels.push(
      loadModel(models[obj2].url, models[obj2].type).then((result) => {
        if (models[obj2].type === "fbx") model_obj2 = result;
        else model_obj2 = result.scene.clone();
        model_obj2.data = models[obj2];
        model_obj2.scene_key = "scene_example";
        model_obj2.scale.setScalar(models[obj2].scale);
        if (models[obj2].face)
          model_obj2.rotation.y = THREE.Math.degToRad(models[obj2].face);
      })
    );
    if (action)
      loadedmodels.push(
        loadModel(animations[action].url, animations[action].type).then(
          (result) => {
            // loadModel("./animation/sitting.fbx", "fbx").then((result) => {
            animation_model = result;
          }
        )
      );

    Promise.all(loadedmodels).then(() => {
      model_obj2 = chooseSpatialRelation(model_obj2, plane, "on top");
      model_obj1 = chooseSpatialRelation(model_obj1, model_obj2, relation);
      if (action) {
        mixer = new THREE.AnimationMixer(model_obj1);
        animation_model.animations[0].tracks =
          animation_model.animations[0].tracks.filter((item) =>
            item.name.includes("quaternion")
          );
        const animation = mixer.clipAction(animation_model.animations[0]);
        animation.play();
      }
      scene.add(model_obj1);
      scene.add(model_obj2);
    });
  } catch (error) {
    console.log(error);
  }
};

let anims = [];
let counter = 0;
let animation_tempo = null;
fbxLoader.load("./models/Xbot/xbot2.fbx", (res) => {
  res.scale.setScalar(0.01);
  const leftHand = res.getObjectByName("mixamorigLeftHand");
  const rightHand = res.getObjectByName("mixamorigRightHand");
  rightFoot = res.getObjectByName("mixamorigRightFoot");
  const left_hand_object = cube.clone();
  const right_hand_object = cube.clone();
  leftHand.add(left_hand_object);
  rightHand.add(right_hand_object);
  console.log(rightFoot);
  left_hand_object.position.setX(left_hand_object.position.x + 10);
  left_hand_object.position.setY(left_hand_object.position.y - 7);
  right_hand_object.position.setX(right_hand_object.position.x - 10);
  right_hand_object.position.setY(right_hand_object.position.y - 7);
  sphere.position.setX(0.8377996318208151);
  sphere.position.setZ(-0.05924428533235318);
  scene.add(sphere);
  res = chooseSpatialRelation(res, plane, "on top");
  scene.add(res);
  mixer = new THREE.AnimationMixer(res);
  // anim 0
  fbxLoader.load("./animation/Throw.fbx", (anim) => {
    anim.animations[0].tracks = anim.animations[0].tracks.filter((item) =>
      item.name.includes("quaternion")
    );
    anims.push(anim.animations[0]);
    anims[0].duration = 10;
    const animation = mixer.clipAction(anims[0]);
    animation?.setLoop(1, 1);
    animation?.play();
    animation.clampWhenFinished = true;
    // animation.duration = 10;
    console.log(anim.animations[0]);
    console.log(animation.timeScale);
    console.log(animation);
    // animation.timeScale = 1 / 2;
    // console.log(animation.timeScale);
    console.log(animation);
    // animation.setDuration(3);
    const rock = ball.clone();
    rock.scale.setScalar(80);
    right_hand_object.add(rock);
    setTimeout(() => {
      animation.paused = true;
      const position = new THREE.Vector3();
      right_hand_object.getWorldPosition(position);
      console.log(position);
      const rock1 = ball.clone();
      rock.parent.remove(rock);
      rock1.position.set(position.x, position.y, position.z);
      scene.add(rock1);

      new TWEEN.Tween({ z: position.z })
        .to({ z: position.z + 3 }, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate((coord) => {
          rock1.position.setZ(coord.z);
        })
        .start();
    }, 650);
    // }, 4150);
    mixer.addEventListener("finished", function (e) {
      console.log("animation finished");
    });
  });
  // ball.position.set(-0.2, 0.15, 0);
  ball.position.set(-0.3, 0.3, 0.12);
  scene.add(ball);

  const tween = new TWEEN.Tween({ x: -0.3, y: 0.3, z: 0.12 })
    .to({ x: -0.3, y: 0.3, z: 3 }, 1000)
    .delay(2000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate((coord) => {
      ball.position.set(coord.x, coord.y, coord.z);
    })
    .start();
});

export { animate, generate };
