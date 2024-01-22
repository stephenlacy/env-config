import { z } from "zod";
import { Config } from "./index.js";

const Schema = z.object({
  api: z.object({
    url: z.string(),
  }),
  mysql: z.object({
    port: z.coerce.number(),
    default: z.string(),
    missing: z.optional(z.string()),
  }),
  stripe: z.object({
    public: z.object({
      token: z.string(),
      env: z.object({
        prod: z.string(),
      }),
    }),
  }),
});
type Config = z.infer<typeof Schema>;

const base = {
  api: { url: "" },
  mysql: { port: 0, default: "value", extra: "value" },
  stripe: { public: { token: "" } },
};

const cfg = Schema.parse(Config<Config>(base));

console.log(JSON.stringify(cfg, null, 2));
