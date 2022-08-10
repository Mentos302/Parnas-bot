const Scene = require("telegraf/scenes/base");
import controller from "../../../controllers/services-controller";

export default (() => {
  const scene = new Scene("services-single");

  scene.enter(controller.servicePage);

  scene.action("menu", controller.toMenu);

  return scene;
})();