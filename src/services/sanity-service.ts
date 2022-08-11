import { SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { IDoctor } from "../interfaces/IDoctor";
import { IService } from "../interfaces/IService";
import { ITelegrafContext } from "../interfaces/ITelegrafContext";
import { TelegramService } from "./telegram-service";

export class SanityService {
  private client;

  constructor(client: SanityClient) {
    this.client = client;
  }

  async fetchDoctors(): Promise<IDoctor[]> {
    const builder = imageUrlBuilder(this.client);

    const res = await this.client.fetch('*[_type == "doctors"]');

    return res.map((el: any) => ({
      name: el.doctorName,
      photo: builder.image(el.doctorPhoto).url(),
      description: el.doctorInfo,
      specialization: el.doctorSpec,
    }));
  }

  async fetchServices(): Promise<IService[]> {
    const res = await this.client.fetch('*[_type == "services"]');

    return res.map(
      (el: any): IService => ({
        parent_name: el.serviceParent,
        name: el.serviceName,
        description: el.serviceDescription,
        site_url: el.serviceUrl,
      })
    );
  }

  async fetchContacts() {
    const res = await this.client.fetch('*[_type == "contacts"]');

    return res[0];
  }

  async listenToNewPromo(bot: ITelegrafContext) {
    const builder = imageUrlBuilder(this.client);

    this.client.listen('[_type == "promo"]').subscribe(async (update: any) => {
      const { transition, mutations } = update;

      const condition =
        transition === "appear" &&
        mutations[0].create &&
        mutations[0].create.promoTitle;

      if (condition) {
        const users = await this.client.fetch(`*[_type == "users"]`);

        const { promoTitle, promoMes, promoPhoto } = mutations[0].create;

        const promo = {
          title: promoTitle || "",
          content: promoMes || "",
          image:
            promoPhoto && builder.image(mutations[0].create.promoPhoto).url(),
        };

        new TelegramService(bot).sendPromo(users, promo);
      }
    });
  }

  async getUser(chatId: number) {
    const user = await this.client.fetch(
      `*[_type == "users" && chatId == ${chatId}]`
    );

    return user;
  }

  async createUser(chatId: number, name: string) {
    const doc = {
      _id: 124,
      _type: "users",
      userFirstName: name,
      chatId,
    };

    await this.client.create(doc);
  }
}
