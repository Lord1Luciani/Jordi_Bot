require('dotenv').config()
const Telegraf = require('telegraf')
const mongoose = require('mongoose')
const randomImg = require('./handles/randomImg')
const postingImg = require('./handles/postingImg')
const bot = new Telegraf(process.env.BOT_TOKEN)
const { telegram } = bot


// mongoose.connect(process.env.MONGODB_ARKAWA, {
//   useCreateIndex: true,
//   useNewUrlParser: true,
// })

// bot.context.db = mongoose.connection
// bot.context.db.on('error', console.error)

bot.use(async (ctx) => {
  // ctx.reply('')
  setInterval(() => postingImg(ctx), 60000)
})
bot.launch()
