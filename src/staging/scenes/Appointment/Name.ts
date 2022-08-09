const Scene = require("telegraf/scenes/base");
import controller from "../../../controllers/appointment-controller";

export default (() => {
  const scene = new Scene("appointment-name");

  scene.enter(controller.reqName);

  scene.on("text", controller.resName);

  scene.on("message", controller.reEnter);

  return scene;
})();
