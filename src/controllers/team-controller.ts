import { Markup } from "telegraf";
import { IDoctor } from "../interfaces/IDoctor";
import { ITelegrafContext } from "../interfaces/ITelegrafContext";
import { SanityService } from "../services/sanity-service";
const Extra = require("telegraf/extra");

class TeamContoroller {
  private specs: {
    name: string;
    doctors: IDoctor[];
  }[];

  constructor() {
    this.specs = [];
    this.doctorPage = this.doctorPage.bind(this);
  }

  async teamNavigation(ctx: ITelegrafContext) {
    const doctors = await new SanityService(ctx.session.client).fetchDoctors();

    if (!this.specs.length) {
      doctors.map((doctor) => {
        const spec = this.specs.find(
          (spec) => spec.name === doctor.specialization
        );

        if (spec) return spec.doctors.push(doctor);

        this.specs.push({
          name: doctor.specialization,
          doctors: [doctor],
        });
      });
    }

    ctx.reply(
      "<i>Виберіть спеціалізацію лікаря, який Вас цікавить:</i>",
      Extra.HTML().markup((m: Markup<any>) =>
        m.inlineKeyboard(
          this.specs.map((spec, i) => [
            m.callbackButton(spec.name, `specs-nav${i}`),
          ])
        )
      )
    );
  }

  callbackHandler(ctx: ITelegrafContext) {
    const type: string = ctx.callbackQuery.data.slice(0, 5);

    if (type === "specs") {
      this.specNavigation(ctx);
    } else if (type === "docto") {
      ctx.scene.enter(
        "doctors-single",
        JSON.parse(ctx.callbackQuery.data.slice(5))
      );
    }
  }

  specNavigation(ctx: ITelegrafContext) {
    const index = Number(
      ctx.callbackQuery.data[ctx.callbackQuery.data.length - 1]
    );

    const spec = this.specs[index];

    return ctx.reply(
      "<i>Виберіть лікаря, який Вас цікавить:</i>",
      Extra.HTML().markup((m: Markup<any>) =>
        m.inlineKeyboard(
          spec.doctors.map((doc, i) => [
            m.callbackButton(doc.name, `docto${JSON.stringify({ index, i })}`),
          ])
        )
      )
    );
  }

  doctorPage(ctx: ITelegrafContext) {
    const { index, i } = ctx.scene.state;

    const doc = this.specs[index].doctors[i];

    ctx.replyWithPhoto(
      doc.photo,
      Extra.HTML()
        .caption(`<b>${doc.name}</b>\n\n<i>${doc.description}</i>`)
        .markup((m: Markup<any>) =>
          m.inlineKeyboard([
            [m.callbackButton("Записатись на прийом", `appointment`)],
            [m.callbackButton("Головне меню", `menu`)],
          ])
        )
    );
  }

  toAppointment(ctx: ITelegrafContext) {
    ctx.scene.enter("appointment-isNewClient");
  }

  toMenu(ctx: ITelegrafContext) {
    ctx.scene.enter("welcome");
  }

  reEnter(ctx: ITelegrafContext) {
    ctx.scene.reenter();
  }
}

export default new TeamContoroller();
