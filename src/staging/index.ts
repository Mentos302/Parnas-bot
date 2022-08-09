import Welcome from "./scenes/Welcome";
import AppointmentIsNew from "./scenes/Appointment/IsNewClient";
import AppointmentName from "./scenes/Appointment/Name";
import AppointmentPhone from "./scenes/Appointment/Phone";
import Callback from "./scenes/Callback";
import Chating from "./scenes/Chating";
const Stage = require("telegraf/stage");

export default (bot: any) => {
  const stage = new Stage(
    [
      Welcome,
      AppointmentIsNew,
      AppointmentName,
      AppointmentPhone,
      Callback,
      Chating,
    ],
    {
      ttl: 120,
    }
  );

  bot.use(stage.middleware());
};
