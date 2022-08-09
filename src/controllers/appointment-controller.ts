import { Markup } from "telegraf";
import { ITelegrafContext } from "../interfaces/ITelegrafContext";
const Extra = require("telegraf/extra");

class AppointmentContoroller {
  isNewClient(ctx: ITelegrafContext) {
    ctx.reply(
      "Ви раніше проходили лікування в нашій клініці?",
      Extra.HTML().markup((m: Markup<any>) =>
        m.inlineKeyboard([
          [m.callbackButton("Так", "yes"), m.callbackButton("Ні", "no")],
        ])
      )
    );
  }

  resInNewClient(ctx: ITelegrafContext) {
    const isNewClient = String(ctx.match) === "yes";

    ctx.scene.enter("appointment-name", { isNewClient });
  }

  reqName(ctx: ITelegrafContext) {
    ctx.reply("Напишіть Ваше ім'я <b>(П.І.Б)</b> 👤", Extra.HTML());
  }

  resName(ctx: ITelegrafContext) {
    ctx.scene.enter("appointment-phone", {
      ...ctx.scene.state,
      name: ctx.message?.text,
    });
  }

  reqPhone(ctx: ITelegrafContext) {
    ctx.reply(
      "Відправте номер телефону для зв'язку з Вами 📞",
      Extra.HTML().markup((m: Markup<any>) =>
        m.keyboard([m.contactRequestButton("Відправити номер телефону")])
      )
    );
  }

  async resPhone(ctx: ITelegrafContext) {
    ctx.reply(
      "Ви успішно залишили заявку, очікуйте з Вами зв'яжкуться найближчим часом.",
      Extra.HTML()
        .markup((m: Markup<any>) =>
          m.inlineKeyboard([[m.callbackButton("Повернутись в меню", "any")]])
        )
        .markup((m: Markup<any>) => m.removeKeyboard())
    );

    const phone = ctx.message?.contact.phone_number || ctx.message?.text;

    // TO-DO: [MIDDLEWARE] phone validation
    // TO-DO: [SERVICE] send form to email/tg

    ctx.scene.leave();
  }

  reEnter(ctx: ITelegrafContext) {
    ctx.scene.reenter();
  }
}

export default new AppointmentContoroller();
