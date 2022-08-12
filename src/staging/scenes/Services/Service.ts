const Scene = require("telegraf/scenes/base");
import controller from "../../../controllers/services-controller";

export default (() => {
  const scene = new Scene("services-single");

  scene.enter(controller.servicePage);

  scene.action("back", controller.getBack);

  scene.action("menu", controller.toMenu);

  scene.on("message", controller.reEnter);

  return scene;
})();
