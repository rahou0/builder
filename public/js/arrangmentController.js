import {
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
} from "./spatialControl.js";

const chooseSpatialRelation = (model1, model2, relation, parent) => {
  switch (relation) {
    case "in the left":
      model1 = Left_Of(model1, model2);
      break;
    case "on top":
      model1 = On_Of(model1, model2);
      break;
    case "in the right":
      model1 = Right_Of(model1, model2);
      break;
    case "in front":
      model1 = Front_Of(model1, model2);
      break;
    case "below":
      model1 = Bellow_Of(model1, model2);
      break;
    case "behind":
      model1 = Behind_Of(model1, model2);
      break;
    case "in the center":
      model1 = Center_Of(model1, model2);
      break;
    case "in the right upper corner":
      model1 = Right_Upper_Corner_of(model1, model2);
      break;
    case "in the left upper corner":
      model1 = Left_Upper_Corner_of(model1, model2);
      break;
    case "in the right bottom corner":
      model1 = Right_Bottom_Corner_of(model1, model2);
      break;
    case "in the left bottom corner":
      model1 = Left_Bottom_Corner_of(model1, model2);
      break;
    default:
      console.log("default case");
      model1 = Left_Of(model1, model2);
      break;
  }
  return model1;
};

export { chooseSpatialRelation };
