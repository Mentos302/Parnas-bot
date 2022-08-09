const Scene = require("telegraf/scenes/base");
import controller from "../../../controllers/appointment-controller";

export default (() => {
  const scene = new Scene("appointment-isNewClient");

  scene.enter(controller.isNewClient);

  scene.action("yes", controller.resInNewClient);

  scene.action("no", controller.resInNewClient);

  scene.on("message", controller.reEnter);

  return scene;
})();
