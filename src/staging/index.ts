import { TelegrafContext } from 'telegraf/typings/context'
import WelcomeStage from './scenes/Welcome'
const Stage = require('telegraf/stage')

export default (bot: any) => {
  const stage = new Stage([WelcomeStage], {
    ttl: 120,
  })

  bot.use(stage.middleware())
}
