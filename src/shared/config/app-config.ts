type AppMode = 'development' | 'production'

type AppConfig = {
  mode: AppMode
  domain: string
  tgBotName: string
  tgBotLink: string
}

const MODE_DEFAULTS: Record<AppMode, Omit<AppConfig, 'mode'>> = {
  development: {
    domain: 'https://adsmrkt.alfaconstructor.com/api',
    tgBotName: 'my_dev_bot',
    tgBotLink: 'https://t.me/my_dev_bot',
  },
  production: {
    domain: 'https://adsmrkt-stg.alfaconstructor.com/api',
    tgBotName: 'my_prod_bot',
    tgBotLink: 'https://t.me/my_prod_bot',
  },
}

const mode: AppMode =
  import.meta.env.MODE === 'production' ? 'production' : 'development'

const defaults = MODE_DEFAULTS[mode]

export const APP_CONFIG: AppConfig = {
  mode,
  domain: defaults.domain,
  tgBotName: defaults.tgBotName,
  tgBotLink: defaults.tgBotLink,
}
