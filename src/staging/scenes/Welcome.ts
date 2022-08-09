const Scene = require("telegraf/scenes/base");
import controller from "../../controllers/welcome-controller";

export default (() => {
  const scene = new Scene("welcome");

  scene.enter(controller.greeting);

  scene.action("req1", controller.toAppointment);

  return scene;
})();
