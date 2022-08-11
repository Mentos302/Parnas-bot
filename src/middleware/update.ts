import { SanityClient } from "@sanity/client";
import { ITelegrafContext } from "../interfaces/ITelegrafContext";
import { SanityService } from "../services/sanity-service";

export const updateMiddleware = async (
  ctx: ITelegrafContext,
  client: SanityClient
) => {
  const service = new SanityService(client);

  if (ctx.from) {
    const user = await service.getUser(ctx.from?.id);

    if (!user) {
      service.createUser(ctx.from.id, ctx.from.first_name);
    }
  }

  ctx.session.client = client;

  ctx.scene.enter("welcome");
};
