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
