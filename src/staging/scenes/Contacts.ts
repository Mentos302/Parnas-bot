const Scene = require("telegraf/scenes/base");
import controller from "../../controllers/contacts-controller";

export default (() => {
  const scene = new Scene("contacts");

  scene.enter(controller.enter);

  scene.action("menu", controller.toMenu);

  scene.on("message", controller.reEnter);

  return scene;
})();
