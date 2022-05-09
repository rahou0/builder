import { THREE } from "./threejs.js";

//main Axis
const Right_Of = (object1, object2) => {
  const center = new THREE.Vector3();
  var box_object1 = new THREE.Box3().setFromObject(object1);
  var box_object2 = new THREE.Box3().setFromObject(object2);
  const { x: x1, y: y1 } = box_object1.getSize(center);
  let added_value = box_object2.min.x - 0.001 - (x1 / 2 + 0.05);
  let value = box_object2.min.y;
  if (box_object2.min.y > box_object1.min.y) value -= box_object1.min.y;
  else if (box_object2.min.y < box_object1.min.y) value += -box_object1.min.y;
  object1.position.set(added_value, value, object2.position.z);
  return object1;
};
const Left_Of = (object1, object2) => {
  const center = new THREE.Vector3();
  var box_object1 = new THREE.Box3().setFromObject(object1);
  var box_object2 = new THREE.Box3().setFromObject(object2);
  const { x: x1, y: y1 } = box_object1.getSize(center);
  let added_value = box_object2.max.x + 0.001 + (x1 / 2 + 0.05);
  let value = box_object2.min.y;
  if (box_object2.min.y > box_object1.min.y) value -= box_object1.min.y;
  else if (box_object2.min.y < box_object1.min.y) value += -box_object1.min.y;
  object1.position.set(added_value, value, object2.position.z);
  return object1;
};
const Front_Of = (object1, object2) => {
  const center = new THREE.Vector3();
  var box_object1 = new THREE.Box3().setFromObject(object1);
  var box_object2 = new THREE.Box3().setFromObject(object2);
  const { x: x1, y: y1, z: z1 } = box_object1.getSize(center);
  const { x: x2, y: y2, z: z2 } = box_object2.getSize(center);
  let added_value = box_object2.max.z + 0.001 + (z1 / 2 + 0.05);
  let value = box_object2.min.y;
  if (box_object2.min.y > box_object1.min.y) value -= box_object1.min.y;
  else if (box_object2.min.y < box_object1.min.y) value += -box_object1.min.y;
  object1.position.set(object2.position.x, value, added_value);
  return object1;
};
const Behind_Of = (object1, object2) => {
  const center = new THREE.Vector3();
  var box_object1 = new THREE.Box3().setFromObject(object1);
  var box_object2 = new THREE.Box3().setFromObject(object2);
  const { x: x1, y: y1, z: z1 } = box_object1.getSize(center);
  const { x: x2, y: y2, z: z2 } = box_object2.getSize(center);
  let added_value = box_object2.min.z - 0.001 - (z1 / 2 + 0.05);
  let value = box_object2.min.y;
  if (box_object2.min.y > box_object1.min.y) value -= box_object1.min.y;
  else if (box_object2.min.y < box_object1.min.y) value += -box_object1.min.y;
  object1.position.set(object2.position.x, value, added_value);
  return object1;
};
const Bellow_Of = (object1, object2) => {
  const center = new THREE.Vector3();
  var box_object1 = new THREE.Box3().setFromObject(object1);
  var box_object2 = new THREE.Box3().setFromObject(object2);
  const { x: x1, y: y1, z: z1 } = box_object1.getSize(center);
  const { x: x2, y: y2, z: z2 } = box_object2.getSize(center);
  console.log(box_object2);
  // const added_value = object2.position.y + (y2 / 2 + y1 / 2 + 0.001) * -1;
  const added_value = box_object2.min.y - y1 - 0.0001;

  object1.position.set(object2.position.x, added_value, object2.position.z);
  return object1;
};
const On_Of = (object1, object2) => {
  const center = new THREE.Vector3();
  var box_object1 = new THREE.Box3().setFromObject(object1);
  var box_object2 = new THREE.Box3().setFromObject(object2);
  const { x: x1, y: y1, z: z1 } = box_object1.getSize(center);
  const { x: x2, y: y2, z: z2 } = box_object2.getSize(center);
  const added_v = box_object2.max.y - box_object1.min.y + 0.0001;
  // let added_value = box_object2.max.y + 0.001;
  // if (!object1.data.aligned) added_value += y1 / 2;
  object1.position.set(object2.position.x, added_v, object2.position.z);
  return object1;
};

const Inside_In = (object1, object2) => {
  const center = new THREE.Vector3();
  var box_object1 = new THREE.Box3().setFromObject(object1);
  var box_object2 = new THREE.Box3().setFromObject(object2);
  const added_v = box_object2.min.y - box_object1.min.y + 0.0001;
  object1.position.set(object2.position.x, added_v, object2.position.z);
  return object1;
};
const On_Ground = (object) => {
  const center = new THREE.Vector3();
  var box = new THREE.Box3().setFromObject(object);
  const { y: yy } = box.getSize(center);
  console.log(yy);
  console.log(box.min);
  console.log(box.max);
  var box_object = new THREE.Box3().setFromObject(object);
  const { x, y, z } = box_object.getSize(center);
  const added_value = y / 2 + 0.001;
  object.position.set(
    object.position.x,
    0,
    // object.position.y + added_value,
    object.position.z
  );
  return object;
};

//corners

const Center_Of = (object1, object2) => {
  const center = new THREE.Vector3();
  var box_object1 = new THREE.Box3().setFromObject(object1);
  var box_object2 = new THREE.Box3().setFromObject(object2);
  const { x: x1, y: y1, z: z1 } = box_object1.getSize(center);
  const { x: x2, y: y2, z: z2 } = box_object2.getSize(center);
  const x2_center = (box_object2.max.x + box_object2.min.x) / 2;
  const z2_center = (box_object2.max.z + box_object2.min.z) / 2;
  let added_y = 0;
  if (!object1.data.aligned) added_y += y1 / 2;
  object1.position.set(x2_center, box_object2.max.y + added_y, z2_center);
  return object1;
};
const Right_Upper_Corner_of = (object1, object2) => {
  const center = new THREE.Vector3();
  var box_object1 = new THREE.Box3().setFromObject(object1);
  var box_object2 = new THREE.Box3().setFromObject(object2);
  const { x: x1, y: y1, z: z1 } = box_object1.getSize(center);
  const { x: x2, y: y2, z: z2 } = box_object2.getSize(center);
  const x2_center =
    x2 > x1
      ? box_object2.max.x - x1 / 2
      : (box_object2.max.x + box_object2.min.x) / 2;
  const z2_center =
    z2 > z1
      ? box_object2.min.z + z1 / 2
      : (box_object2.max.z + box_object2.min.z) / 2;
  const added_y = box_object2.max.y - box_object1.min.y + 0.0001;
  object1.position.set(x2_center, added_y, z2_center);
  return object1;
};
const Left_Upper_Corner_of = (object1, object2) => {
  const center = new THREE.Vector3();
  var box_object1 = new THREE.Box3().setFromObject(object1);
  var box_object2 = new THREE.Box3().setFromObject(object2);
  const { x: x1, y: y1, z: z1 } = box_object1.getSize(center);
  const { x: x2, y: y2, z: z2 } = box_object2.getSize(center);
  const x2_center =
    x2 > x1
      ? box_object2.min.x + x1 / 2
      : (box_object2.max.x + box_object2.min.x) / 2;
  const z2_center =
    z2 > z1
      ? box_object2.min.z + z1 / 2
      : (box_object2.max.z + box_object2.min.z) / 2;
  const added_y = box_object2.max.y - box_object1.min.y + 0.0001;
  object1.position.set(x2_center, added_y, z2_center);
  return object1;
};
const Left_Bottom_Corner_of = (object1, object2) => {
  const center = new THREE.Vector3();
  var box_object1 = new THREE.Box3().setFromObject(object1);
  var box_object2 = new THREE.Box3().setFromObject(object2);
  const { x: x1, y: y1, z: z1 } = box_object1.getSize(center);
  const { x: x2, y: y2, z: z2 } = box_object2.getSize(center);
  const x2_center =
    x2 > x1
      ? box_object2.min.x + x1 / 2
      : (box_object2.max.x + box_object2.min.x) / 2;
  const z2_center =
    z2 > z1
      ? box_object2.max.z - z1 / 2
      : (box_object2.max.z + box_object2.min.z) / 2;
  const added_y = box_object2.max.y - box_object1.min.y + 0.0001;
  object1.position.set(x2_center, added_y, z2_center);
  return object1;
};
const Right_Bottom_Corner_of = (object1, object2) => {
  const center = new THREE.Vector3();
  var box_object1 = new THREE.Box3().setFromObject(object1);
  var box_object2 = new THREE.Box3().setFromObject(object2);
  const { x: x1, y: y1, z: z1 } = box_object1.getSize(center);
  const { x: x2, y: y2, z: z2 } = box_object2.getSize(center);
  const x2_center =
    x2 > x1
      ? box_object2.max.x - x1 / 2
      : (box_object2.max.x + box_object2.min.x) / 2;
  const z2_center =
    z2 > z1
      ? box_object2.max.z - z1 / 2
      : (box_object2.max.z + box_object2.min.z) / 2;
  const added_y = box_object2.max.y - box_object1.min.y + 0.0001;
  object1.position.set(x2_center, added_y, z2_center);
  return object1;
};
export {
  Right_Of,
  Left_Of,
  On_Ground,
  Front_Of,
  Behind_Of,
  On_Of,
  Bellow_Of,
  Center_Of,
  Right_Upper_Corner_of,
  Left_Upper_Corner_of,
  Left_Bottom_Corner_of,
  Right_Bottom_Corner_of,
  Inside_In,
};
