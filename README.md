# env-config
> Interpolate ENV variables into a config schema.

Building:

```shell
pnpm build

```

Usage:


``` typescript
// default config options:
const base = {
  api: { url: "" },
  mysql: { port: 0, default: "value", extra: "value" },
  stripe: { public: { token: "" } },
};

// zod schema
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

const cfg = Schema.parse(Config<Config>(base));

console.log(JSON.stringify(cfg, null, 2));
```


``` shell
// ENV variable runtime overrides:
export API_URL='http://localhost:3000'
export MYSQL_PORT='5432'
export STRIPE_PUBLIC_TOKEN='token_'

```
#### Output:

``` JSON
{
  "api": {
    "url": "http://localhost:3000"
  },
  "mysql": {
    "port": 5432,
    "default": "value"
  },
  "stripe": {
    "public": {
      "token": "token_",
      "env": {
        "prod": "true"
      }
    }
  }
}
```
