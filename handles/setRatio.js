const fs = require('fs')

let SPEED_RATE

function setRatio(ctx, configuration) {
  const ratio = ctx.message.text.split(/\s+/)[1]
  const config = configuration

  config.rate = ratio

  fs.writeFileSync('./config.json', JSON.stringify(config))
  return Number(config.rate)
}

module.exports = async (ctx, config) => {
  if (ctx.chat.id === 686968130) {
    SPEED_RATE = await setRatio(ctx, config)

    ctx.reply(`Rate is ${Math.ceil(SPEED_RATE / 1000)} sec`)
      .then((msg) => {
        setTimeout(() => {
          ctx.telegram.deleteMessage(ctx.chat.id, msg.message_id - 1)
          ctx.telegram.deleteMessage(msg.chat.id, msg.message_id)
        }, 5000)
      })
  }
  return SPEED_RATE
}
