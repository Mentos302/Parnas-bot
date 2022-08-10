import Welcome from "./scenes/Welcome";
import AppointmentIsNew from "./scenes/Appointment/IsNewClient";
import AppointmentName from "./scenes/Appointment/Name";
import AppointmentPhone from "./scenes/Appointment/Phone";
import Callback from "./scenes/Callback";
import Chating from "./scenes/Chating";
import SpecNav from "./scenes/Team/SpecNav";
import Doctor from "./scenes/Team/Doctor";
import ServNav from "./scenes/Services/Nav";
import Service from "./scenes/Services/Service";
import Contacts from "./scenes/Contacts";
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
      SpecNav,
      Doctor,
      ServNav,
      Service,
      Contacts,
    ],
    {
      ttl: 120,
    }
  );

  bot.use(stage.middleware());
};
