import { Markup } from "telegraf";
import { ITelegrafContext } from "../interfaces/ITelegrafContext";
const Extra = require("telegraf/extra");

class ChatingContoroller {
  reqProblem(ctx: ITelegrafContext) {
    ctx.reply(
      "Напишіть, будь ласка, що Вас турбує.\n\nЦе допоможе нам підібрати спеціаліста, який  вирішить Вашу проблему."
    );
  }

  resProblem(ctx: ITelegrafContext) {
    ctx.reply(
      "Ви успішно залишили заявку, очікуйте з Вами зв'яжкуться найближчим часом.",
      Extra.HTML().markup((m: Markup<any>) =>
        m.inlineKeyboard([[m.callbackButton("Повернутись в меню", "any")]])
      )
    );

    ctx.telegram.sendMessage(
      process.env.ADMIN_ID!,
      `Нова заявка на чат від <a href="tg://user?id=${ctx.from?.id}">${ctx.from?.first_name}</a>\n\n${ctx.message?.text}`,
      Extra.HTML()
    );

    ctx.scene.leave();
  }

  reEnter(ctx: ITelegrafContext) {
    ctx.scene.reenter();
  }
}

export default new ChatingContoroller();
