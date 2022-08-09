const Scene = require("telegraf/scenes/base");
import controller from "../../controllers/welcome-controller";

export default (() => {
  const scene = new Scene("welcome");

  scene.enter(controller.greeting);

  scene.action("req1", controller.toAppointment);

  scene.action("req2", controller.toCallback);

  scene.action("req3", controller.toChating);

  return scene;
})();
