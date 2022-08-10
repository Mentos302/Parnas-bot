import path from "path";
import db from "./database";
import Telegraf from "telegraf";
import sceneInitialisation from "./staging";
import { TelegrafContext } from "telegraf/typings/context";
import { ITelegrafContext } from "./interfaces/ITelegrafContext";
const sanityClient = require("@sanity/client");
const rateLimit = require("telegraf-ratelimit");
const session = require("telegraf/session");

export default () => {
  const client = sanityClient({
    projectId: "jrxrfxw3",
    dataset: "dataset",
    apiVersion: "2021-03-25", // use current UTC date - see "specifying API version"!
    token:
      "skR1H44kea38lNweRKe2LnNAUzoUUR0cDe7d606l6rJfZt0rWM0fJ0xBOFGzTMQlgN1YlE2jHQb1x1YA03GtvitESSV18mVsq5Ev0O8VUHTh2rwdTtRDaOeXUTKiT8enYnZsWfkQnSg4QhZemMxFwHytD4XSr8lRb1iwrGzkiYDRoNiJkaPT", // or leave blank for unauthenticated usage
    useCdn: true, // `false` if you want to ensure fresh data
  });

  const bot: any = new Telegraf(process.env.BOT_TOKEN as string);

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

  // bot.use(updateMiddleware)

  // bot.catch(errorNotification)

  bot.use((ctx: any) => {
    ctx.session.client = client;
    ctx.scene.enter("welcome");
  });

  // db.connection.once('open', async () => {
  //   console.log('Connected to MongoDB')
  //   bot.launch()
  //   console.log(`Bot has been started`)
  // })

  bot.launch();
  console.log(`Bot has been started`);
  return bot;
};
