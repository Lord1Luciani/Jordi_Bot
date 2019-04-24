const Markup = require('telegraf/markup')


module.exports = () => Markup.inlineKeyboard([
  Markup.callbackButton('▶️ Старт', 'startPosting'),
  Markup.callbackButton('Стоп', 'stopPosting'),
])

