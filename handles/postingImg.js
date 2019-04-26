const randomImg = require('./randomImg')


const gif = /\.gif/
let url

module.exports = async (ctx) => {
  url = await randomImg()

  if (url.search(gif) >= 1) {
    ctx.telegram.sendDocument('@jordi_tumblr', url)
  }
  else {
    ctx.telegram.sendPhoto('@jordi_tumblr', url)
      .catch((error) => console.log(error))
  }
}

