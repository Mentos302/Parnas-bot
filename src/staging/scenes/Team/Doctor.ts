const Scene = require("telegraf/scenes/base");
import controller from "../../../controllers/team-controller";

export default (() => {
  const scene = new Scene("doctors-single");

  scene.enter(controller.doctorPage);

  scene.action("appointment", controller.toAppointment);

  scene.action("menu", controller.toMenu);

  scene.action("back", controller.getBack);

  scene.on("message", controller.reEnter);

  return scene;
})();
