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
    const isNewClient = String(ctx.match) === "no";

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
        m
          .keyboard([m.contactRequestButton("Відправити номер телефону")])
          .resize()
      )
    );
  }

  async resPhone(ctx: ITelegrafContext) {
    const { isNewClient, name } = ctx.scene.state;
    ctx.reply(
      "Ви успішно залишили заявку, очікуйте з Вами зв'яжкуться найближчим часом.",
      Extra.HTML().markup((m: Markup<any>) =>
        m.inlineKeyboard([[m.callbackButton("Повернутись в меню", "any")]])
      )
    );

    const phone = ctx.message?.contact
      ? ctx.message?.contact.phone_number
      : ctx.message?.text;

    ctx.telegram.sendMessage(
      process.env.ADMIN_ID!,
      `Нова заявка на прийом від <a href="tg://user?id=${ctx.from?.id}">${
        ctx.from?.first_name
      }</a>\n\n<b>Новий клієнт:</b> <code>${
        isNewClient ? "Так" : "Ні"
      }</code>\n<b>П.І.Б:</b> <code>${name}</code>\n<b>Номер телефону:</b> <code>${phone}</code>`,
      Extra.HTML()
    );

    ctx.scene.leave();
  }

  reEnter(ctx: ITelegrafContext) {
    ctx.scene.reenter();
  }
}

export default new AppointmentContoroller();
