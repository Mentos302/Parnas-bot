import { Markup } from "telegraf";
import { ITelegrafContext } from "../interfaces/ITelegrafContext";
const Extra = require("telegraf/extra");

class CallbackContoroller {
  reqPhone(ctx: ITelegrafContext) {
    ctx.reply(
      "Будь ласка, надішліть свій номер телефону, просто натиснувши на нього.\n\nЯкщо він не з’явився, або цей номер не актуальний, напишіть свій коректний номер для зв’язку.\n\nДякуємо!",
      Extra.HTML().markup((m: Markup<any>) =>
        m.keyboard([m.contactRequestButton("Поділитися")])
      )
    );
  }

  resPhone(ctx: ITelegrafContext) {
    ctx.reply(
      "Дякуємо! Ваша заявка на дзвінок успішно прийнята.\n\nМи обов’язково зателефонуємо Вам!",
      Extra.HTML()
        .markup((m: Markup<any>) =>
          m.inlineKeyboard([[m.callbackButton("Повернутись в меню", "any")]])
        )
        .markup((m: Markup<any>) => m.removeKeyboard())
    );

    const phone = ctx.message?.contact.phone_number || ctx.message?.text;

    // TO-DO: [MIDDLEWARE] phone validation
    // TO-DO: [SERVICE] send phone to email/tg

    ctx.scene.leave();
  }

  reEnter(ctx: ITelegrafContext) {
    ctx.scene.reenter();
  }
}

export default new CallbackContoroller();
