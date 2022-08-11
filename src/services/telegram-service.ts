import { Extra } from "telegraf";
import { TelegrafContext } from "telegraf/typings/context";
import { Message } from "telegraf/typings/telegram-types";
import { IPromo } from "../interfaces/IPromo";

type User = { chatId: number };

export class TelegramService {
  private bot: TelegrafContext;

  constructor(bot: TelegrafContext) {
    this.bot = bot;
  }

  async sendPromo(
    users: User[],
    promo: IPromo | Message,
    isSanity: boolean = true
  ) {
    await Promise.all(
      users.map(async (user: User) => {
        setTimeout(async () => {
          try {
            if (isSanity) {
              const { title, content, image } = promo as IPromo;

              if (image) {
                this.bot.telegram.sendPhoto(
                  user.chatId,
                  image,
                  Extra.caption(`<b>${title}</b>\n\n${content}`).HTML() as any
                );
              } else {
                this.bot.telegram.sendMessage(
                  user.chatId,
                  `<b>${title}</b>\n\n${content}`,
                  Extra.HTML()
                );
              }
            } else {
              this.bot.telegram.sendCopy(
                user.chatId,
                promo as Message,
                Extra.HTML()
              );
            }
          } catch (e: any) {
            console.log(e);
          }
        }, 50);
      })
    );
  }
}
