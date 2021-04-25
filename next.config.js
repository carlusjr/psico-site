module.exports = {
  env: {
    GLOBAL_SITE: process.env.GLOBAL_SITE,
    MYSQL_CONNSTRING: process.env.MYSQL_CONNSTRING
  },
  serverRuntimeConfig: {
    CONTATO_STRING: process.env.CONTATO_STRING
  },
  future: {
    webpack5: false,
  },
}

