require('dotenv').config()
const Telegraf = require('telegraf')
const axios = require('axios')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.launch()
