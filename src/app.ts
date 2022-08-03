import path from 'path'
import db from './database'
import Telegraf from 'telegraf'
import sceneInitialisation from './staging'
import { TelegrafContext } from 'telegraf/typings/context'
import { ITelegrafContext } from './interfaces/ITelegrafContext'
const rateLimit = require('telegraf-ratelimit')
const session = require('telegraf/session')

export default () => {
  const bot: any = new Telegraf(process.env.BOT_TOKEN as string)

  bot.use(
    rateLimit({
      window: 1000,
      limit: 1,
      onLimitExceeded: (ctx: TelegrafContext) => {
        try {
          ctx.reply('Спокійніше, бо я не встигаю 😤')
        } catch (error) {
          console.log(error)
        }
      },
    })
  )

  bot.use(
    session({
      getSessionKey: (ctx: TelegrafContext) =>
        ctx.from &&
        `${ctx.from.id}:${(ctx.chat && ctx.chat.id) || ctx.from.id}`,
    })
  )

  sceneInitialisation(bot)

  // bot.use(updateMiddleware)

  // bot.catch(errorNotification)

  bot.on('message', (ctx: any) => ctx.scene.enter('welcome'))

  // db.connection.once('open', async () => {
  //   console.log('Connected to MongoDB')
  //   bot.launch()
  //   console.log(`Bot has been started`)
  // })

  bot.launch()
  console.log(`Bot has been started`)
  return bot
}
