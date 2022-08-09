import WelcomeStage from "./scenes/Welcome";
import AppointmentIsNew from "./scenes/Appointment/IsNewClient";
import AppointmentName from "./scenes/Appointment/Name";
import AppointmentPhone from "./scenes/Appointment/Phone";
const Stage = require("telegraf/stage");

export default (bot: any) => {
  const stage = new Stage(
    [WelcomeStage, AppointmentIsNew, AppointmentName, AppointmentPhone],
    {
      ttl: 120,
    }
  );

  bot.use(stage.middleware());
};
