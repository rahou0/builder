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
const ground_geometry = new THREE.PlaneGeometry(20, 20);
const wall_geometry = new THREE.PlaneGeometry(20, 20);
const floor_texture = new THREE.TextureLoader().load("textures/floor.jpg");
const wall_texture = new THREE.TextureLoader().load("textures/wall.jpg");
const ground_material = new THREE.MeshBasicMaterial({
  map: floor_texture,
  side: THREE.DoubleSide,
});
const wall_material = new THREE.MeshBasicMaterial({
  map: wall_texture,
  side: THREE.DoubleSide,
});
let rightFoot = null;
let old_position = null;
const plane = new THREE.Mesh(ground_geometry, ground_material);
const wall = new THREE.Mesh(wall_geometry, wall_material);
plane.rotation.x = -Math.PI / 2;
wall.rotation.z = -Math.PI / 2;
plane.receiveShadow = true;
wall.position.setZ(10);
scene.add(plane);
scene.add(wall);
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
const createDemo = () => {
  let obj1 = "ball";
  let obj2 = "wooden_table";
  let obj3 = "kid";
  let action = "Open";
  let model_obj1, model_obj2, model_obj3, animation_model;

  const loadedmodels = [];
  loadedmodels.push(
    loadModel(models[obj1].url, models[obj1].type).then((result) => {
      if (models[obj1].type === "fbx") model_obj1 = result;
      else model_obj1 = result.scene.clone();
      model_obj1.data = models[obj1];
      model_obj1.scene_key = "scene_example";
      model_obj1.scale.setScalar(models[obj1].scale);
      if (models[obj1].face)
        model_obj1.rotation.y = THREE.Math.degToRad(models[obj1].face);
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
  loadedmodels.push(
    loadModel(models[obj3].url, models[obj3].type).then((result) => {
      if (models[obj3].type === "fbx") model_obj3 = result;
      else model_obj3 = result.scene.clone();
      model_obj3.data = models[obj3];
      model_obj3.scene_key = "scene_example";
      model_obj3.scale.setScalar(models[obj3].scale);
      if (models[obj3].face)
        model_obj3.rotation.y = THREE.Math.degToRad(models[obj3].face);
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
    model_obj1 = chooseSpatialRelation(
      model_obj1,
      model_obj2,
      "in the right upper corner"
    );
    model_obj3 = chooseSpatialRelation(model_obj3, plane, "on top");
    model_obj3.position.setZ(-1.2);
    model_obj3.position.setX(0.5);

    // model_obj1.position.setZ(9);
    // model_obj1.position.setX(0.4);
    // model_obj1.position.setY(0.2);
    if (action) {
      mixer = new THREE.AnimationMixer(model_obj3);
      animation_model.animations[0].tracks =
        animation_model.animations[0].tracks.filter((item) =>
          item.name.includes("quaternion")
        );
      const animation = mixer.clipAction(animation_model.animations[0]);
      animation.startAt(5);
      animation.clampWhenFinished = true;

      animation.play();
      setTimeout(() => {
        animation.paused = true;
        // const position = new THREE.Vector3();
        // right_hand_object.getWorldPosition(position);
        // console.log(position);
        // const rock1 = ball.clone();
        // rock.parent.remove(rock);
        // rock1.position.set(position.x, position.y, position.z);
        // scene.add(rock1);

        // new TWEEN.Tween({ z: position.z })
        //   .to({ z: position.z + 3 }, 1000)
        //   .easing(TWEEN.Easing.Quadratic.Out)
        //   .onUpdate((coord) => {
        //     rock1.position.setZ(coord.z);
        //   })
        //   .start();
      }, 5100);
    }
    // const rightHand = model_obj3.getObjectByName("mixamorigRightHand");
    // const right_hand_object = model_obj1.clone();
    // right_hand_object.scale.setScalar(5);

    // rightHand.add(right_hand_object);
    // right_hand_object.position.setZ(right_hand_object.position.z + 5);
    // right_hand_object.position.setY(right_hand_object.position.y + 7);

    scene.add(model_obj1);
    scene.add(model_obj2);
    scene.add(model_obj3);
  });
};
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
createDemo();

let anims = [];
let counter = 0;
let animation_tempo = null;

// fbxLoader.load("./models/kid/kid.fbx", (res1) => {
//   res1.scale.setScalar(0.01);
//   res1 = chooseSpatialRelation(res1, plane, "on top");
//   const leftHand = res1.getObjectByName("mixamorigLeftHand");
//   const rightHand = res1.getObjectByName("mixamorigRightHand");
//   const left_hand_object = cube.clone();
//   const right_hand_object = cube.clone();

//   leftHand.add(left_hand_object);
//   rightHand.add(right_hand_object);
//   console.log(rightFoot);
//   left_hand_object.position.setX(left_hand_object.position.x);
//   left_hand_object.position.setZ(left_hand_object.position.z + 5);
//   left_hand_object.position.setY(left_hand_object.position.y + 7);
//   right_hand_object.position.setX(right_hand_object.position.x);
//   right_hand_object.position.setZ(right_hand_object.position.z + 5);
//   right_hand_object.position.setY(right_hand_object.position.y + 7);
//   scene.add(res1);
//   mixer = new THREE.AnimationMixer(res1);
//   fbxLoader.load("./animation/T.fbx", (anim) => {
//     anim.animations[0].tracks = anim.animations[0].tracks.filter((item) =>
//       item.name.includes("quaternion")
//     );
//     anims.push(anim.animations[0]);
//     anims[0].duration = 10;
//     const animation = mixer.clipAction(anims[0]);
//     animation?.setLoop(1, 1);
//     animation?.play();
//     animation.clampWhenFinished = true;
//     // rock.scale.setScalar(80);

//     // }, 4150);
//     mixer.addEventListener("finished", function (e) {
//       console.log("animation finished");
//     });
//   });
// });

export { animate, generate };
