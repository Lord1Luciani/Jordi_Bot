const randomImg = require('./randomImg')
let img

module.exports = async (ctx) => {
  img = await randomImg()
  console.log(img)
  ctx.telegram.sendPhoto('@jordi_tumblr', img)
    .catch((error) => console.log(error))
}

