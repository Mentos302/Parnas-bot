const Scene = require("telegraf/scenes/base");
import controller from "../../../controllers/services-controller";

export default (() => {
  const scene = new Scene("services-nav");

  scene.enter(controller.navigation);

  scene.on(`callback_query`, controller.callbackHandler);

  return scene;
})();
