const Scene = require("telegraf/scenes/base");
import controller from "../../controllers/callback-controller";

export default (() => {
  const scene = new Scene("callback");

  scene.enter(controller.reqPhone);

  scene.on("contact", controller.resPhone);

  scene.on("text", controller.resPhone);

  scene.on("message", controller.reEnter);

  return scene;
})();
