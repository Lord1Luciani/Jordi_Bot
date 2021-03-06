require('dotenv').config()
const Telegraf = require('telegraf')
const mongoose = require('mongoose')
const fs = require('fs')
const postingImg = require('./handles/postingImg')
const menu = require('./handles/menu')
const verify = require('./handles/verify')
const setRatio = require('./handles/setRatio')


let SPEED_RATE = 600000
let config = fs.readFileSync('./config.json')

config = JSON.parse(config)

SPEED_RATE = config.rate

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
  SPEED_RATE = config.rate
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
  SPEED_RATE = await setRatio(ctx, config)
})
bot.launch()
