const fs = require('fs')


module.exports = (ctx, configuration) => {
  const ratio = ctx.message.text.split(/ +/)[1]
  const config = configuration

  config.rate = ratio

  fs.writeFileSync('./config.json', JSON.stringify(config))

  return Number(config.rate)
}
