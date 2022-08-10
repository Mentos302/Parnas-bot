import { SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { IDoctor } from "../interfaces/IDoctor";
import { IService } from "../interfaces/IService";

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
}
