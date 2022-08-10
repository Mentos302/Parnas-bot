import { ITelegrafContext } from "../interfaces/ITelegrafContext";
import { Markup } from "telegraf";
import { CONTACTS } from "../../mocks/CONTACTS";

const Extra = require("telegraf/extra");

class ContactsContoroller {
  // TO-DO: [SERVICE] get contacts from db

  enter(ctx: ITelegrafContext) {
    ctx.replyWithHTML(
      `Клініка естетичної стоматології PARNAS знаходиться за адресою: <b>${
        CONTACTS.address
      }</b>\n\n<b>Телефони</b>:${CONTACTS.phones.map(
        (phone) => `<code>\n${phone}</code>`
      )}\n\nЕлектронна адреса: ${CONTACTS.email}\nНаш сайт: ${CONTACTS.site}`,
      Extra.markup((m: Markup<any>) =>
        m.inlineKeyboard([
          [m.urlButton("Прокласти маршрут", CONTACTS.map_point)],
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
