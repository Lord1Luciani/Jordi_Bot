require('dotenv').config()
const Telegraf = require('telegraf')
const mongoose = require('mongoose')
const randomImg = require('./handles/randomImg')
const postingImg = require('./handles/postingImg')
const menu = require('./handles/menu')
const verify = require('./handles/verify')
const setRatio = require('./handles/setRatio')
let SPEED_RATE = 6000

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

bot.action('startPosting', (ctx) => {
  if (verify(ctx, 'Started')) {
    postinInt = setTimeout(function recPost() {
      postingImg(ctx)
      postinInt = setTimeout(recPost, SPEED_RATE)
    }, SPEED_RATE)
  }
})
bot.action('stopPosting', (ctx) => {
  if (verify(ctx, 'Stoped')) clearTimeout(postinInt)
})
bot.command('qwer', (ctx) => {
  postingImg(ctx)
})
bot.hears(/^!rate($|\s.*)/, async (ctx) => {
  if (verify(ctx, 'Changed speed rate')) SPEED_RATE = await setRatio(ctx)
})
bot.launch()
