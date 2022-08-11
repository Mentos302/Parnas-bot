import Telegraf from "telegraf";
import sceneInitialisation from "./staging";
import { TelegrafContext } from "telegraf/typings/context";
import { SanityService } from "./services/sanity-service";
import { updateMiddleware } from "./middleware/update";
import { ITelegrafContext } from "./interfaces/ITelegrafContext";
const sanityClient = require("@sanity/client");
const rateLimit = require("telegraf-ratelimit");
const session = require("telegraf/session");

export default () => {
  const client = sanityClient({
    projectId: "jrxrfxw3",
    dataset: "dataset",
    apiVersion: "2021-03-25",
    token: process.env.SANITY_TOKEN,
    useCdn: true,
  });

  const bot: any = new Telegraf(process.env.BOT_TOKEN as string);

  new SanityService(client).listenToNewPromo(bot);

  bot.use(
    rateLimit({
      window: 1000,
      limit: 1,
      onLimitExceeded: (ctx: TelegrafContext) => {
        try {
          ctx.reply("Спокійніше, бо я не встигаю 😤");
        } catch (error) {
          console.log(error);
        }
      },
    })
  );

  bot.use(
    session({
      getSessionKey: (ctx: TelegrafContext) =>
        ctx.from &&
        `${ctx.from.id}:${(ctx.chat && ctx.chat.id) || ctx.from.id}`,
    })
  );

  sceneInitialisation(bot);

  bot.use((ctx: ITelegrafContext) => {
    updateMiddleware(ctx, client);
  });

  bot.launch();

  console.log(`Bot has been started`);

  return bot;
};
