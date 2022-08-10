const Scene = require("telegraf/scenes/base");
import controller from "../../../controllers/team-controller";

export default (() => {
  const scene = new Scene("doctors-nav");

  scene.enter(controller.teamNavigation.bind(controller));

  scene.on(`callback_query`, controller.callbackHandler.bind(controller));

  return scene;
})();
