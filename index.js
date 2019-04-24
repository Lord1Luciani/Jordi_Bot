require('dotenv').config()
const Telegraf = require('telegraf')
const mongoose = require('mongoose')
const randomImg = require('./handles/randomImg')
const postingImg = require('./handles/postingImg')
const menu = require('./handles/menu')


const bot = new Telegraf(process.env.BOT_TOKEN)
const { telegram } = bot
let postinInt

mongoose.connect(process.env.MONGODB_ARKAWA, {
  useCreateIndex: true,
  useNewUrlParser: true,
})

bot.context.db = mongoose.connection
bot.context.db.on('error', console.error)

bot.start((ctx) => ctx.reply('Ядерный чемоданчик Аркаши (@jordi_tumblr)', menu().extra()))

bot.action('startPosting', async (ctx) => {
  postinInt = setInterval(() => postingImg(ctx), 60000)
})
bot.action('stopPosting', () => clearTimeout(postinInt))
bot.launch()
