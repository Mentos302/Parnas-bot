const Scene = require("telegraf/scenes/base");
import controller from "../../controllers/chating-controller";

export default (() => {
  const scene = new Scene("chating");

  scene.enter(controller.reqProblem);

  scene.on("text", controller.resProblem);

  scene.on("message", controller.reEnter);

  return scene;
})();
