import { TelegrafContext } from "telegraf/typings/context";
import { Markup } from "telegraf";
import { ITelegrafContext } from "../interfaces/ITelegrafContext";
const Extra = require("telegraf/extra");

class WelcomeContoroller {
  async greeting(ctx: ITelegrafContext) {
    await ctx.reply(
      "<b>👋 Вітаю! Я віртуальний помічник клініки естетичної стоматології PARNAS</b>",
      Extra.HTML().markup((m: Markup<any>) => m.removeKeyboard())
    );

    ctx.reply(
      "<i>Я можу допомогти Вам:</i>",
      Extra.HTML().markup((m: Markup<any>) =>
        m.inlineKeyboard([
          [m.callbackButton("📥 Записатися на прийом", "req1")],
          [m.callbackButton("📞 Замовити зворотній зв'язок", "req2")],
          [m.callbackButton("💬 Почати чат з адміністратором", "req3")],
          [
            m.callbackButton(
              "👤 Познайомитися з нашими спеціалістами",
              "doctors"
            ),
          ],
          [
            m.callbackButton(
              "🔖 Дізнатися про послуги, які ми надаємо",
              "services"
            ),
          ],
          [m.callbackButton("📍 Як нас знайти", "contacts")],
        ])
      )
    );
  }

  toAppointment(ctx: ITelegrafContext) {
    ctx.scene.enter("appointment-isNewClient");
  }

  toCallback(ctx: ITelegrafContext) {
    ctx.scene.enter("callback");
  }

  toChating(ctx: ITelegrafContext) {
    ctx.scene.enter("chating");
  }

  toDoctors(ctx: ITelegrafContext) {
    ctx.scene.enter("doctors-nav");
  }

  toServices(ctx: ITelegrafContext) {
    ctx.scene.enter("services-nav");
  }

  toContacts(ctx: ITelegrafContext) {
    ctx.scene.enter("contacts");
  }

  reEnter(ctx: ITelegrafContext) {
    ctx.scene.reenter();
  }
}

export default new WelcomeContoroller();
