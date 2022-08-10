import { ITelegrafContext } from "../interfaces/ITelegrafContext";
import { Markup } from "telegraf";
import { SanityService } from "../services/sanity-service";
const Extra = require("telegraf/extra");

class ContactsContoroller {
  async enter(ctx: ITelegrafContext) {
    const contacts = await new SanityService(
      ctx.session.client
    ).fetchContacts();

    ctx.replyWithHTML(
      `Клініка естетичної стоматології PARNAS знаходиться за адресою: <b>${
        contacts.address
      }</b>\n\n<b>Телефони</b>:${contacts.phones.map(
        (phone: string) => `<code>\n${phone}</code>`
      )}\n\nЕлектронна адреса: ${contacts.email}\nНаш сайт: ${contacts.site}`,
      Extra.markup((m: Markup<any>) =>
        m.inlineKeyboard([
          [m.urlButton("Прокласти маршрут", contacts.geopoint)],
          [m.callbackButton("Головне меню", `menu`)],
        ])
      )
    );
  }

  toMenu(ctx: ITelegrafContext) {
    ctx.scene.enter("welcome");
  }

  reEnter(ctx: ITelegrafContext) {
    ctx.scene.reenter();
  }
}

export default new ContactsContoroller();
