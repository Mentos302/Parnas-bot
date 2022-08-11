import { Markup } from "telegraf";
import { ITelegrafContext } from "../interfaces/ITelegrafContext";
import { SERVICES } from "../../mocks/SERVICES";
import { IService } from "../interfaces/IService";
import { SanityService } from "../services/sanity-service";

const Extra = require("telegraf/extra");

class ServicesContoroller {
  private items: {
    name: string;
    services: IService[];
  }[];

  constructor() {
    this.items = [];
    this.servicePage = this.servicePage.bind(this);
    this.callbackHandler = this.callbackHandler.bind(this);
    this.navigation = this.navigation.bind(this);
  }

  async navigation(ctx: ITelegrafContext) {
    const services = await new SanityService(
      ctx.session.client
    ).fetchServices();

    if (!this.items.length)
      services.map((service) => {
        const arr =
          service.parent_name &&
          this.items.find((item) => item.name === service.parent_name);

        if (arr) return arr.services.push(service);

        this.items.push({
          name: service.parent_name || service.name,
          services: [service],
        });
      });

    ctx.reply(
      "<i>Виберіть послугу, яка Вас цікавить:</i>",
      Extra.HTML().markup((m: Markup<any>) =>
        m.inlineKeyboard(
          this.items.map((item, i) => [
            m.callbackButton(item.name, `items-nav${i}`),
          ])
        )
      )
    );
  }

  callbackHandler(ctx: ITelegrafContext) {
    const type: string = ctx.callbackQuery.data.slice(0, 5);

    if (type === "items") {
      this.itemNavigation(ctx);
    } else if (type === "servi") {
      ctx.scene.enter(
        "services-single",
        JSON.parse(ctx.callbackQuery.data.slice(5))
      );
    }
  }

  itemNavigation(ctx: ITelegrafContext) {
    const index = Number(
      ctx.callbackQuery.data[ctx.callbackQuery.data.length - 1]
    );

    const item = this.items[index];

    if (item.services.length > 1)
      return ctx.reply(
        `<b>${item.name}:</b>`,
        Extra.HTML().markup((m: Markup<any>) =>
          m.inlineKeyboard(
            item.services.map((serv, i) => [
              m.callbackButton(
                serv.name,
                `servi${JSON.stringify({ index, i })}`
              ),
            ])
          )
        )
      );

    ctx.scene.enter("services-single", item.services[0]);
  }

  servicePage(ctx: ITelegrafContext) {
    let service: IService;

    if (ctx.scene.state.name) {
      service = ctx.scene.state;
    } else {
      service = this.items[ctx.scene.state.index].services[ctx.scene.state.i];
    }

    ctx.reply(
      `<b>${service.name}</b>\n\n<i>${service.description}</i>`,
      Extra.HTML().markup((m: Markup<any>) =>
        m.inlineKeyboard([
          [m.urlButton("Перейти на сайт", service.site_url)],
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

export default new ServicesContoroller();
