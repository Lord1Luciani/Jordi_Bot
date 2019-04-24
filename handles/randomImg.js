const axios = require('axios')
const cheerio = require('cheerio')
const mongoose = require('mongoose')


const pnj = /\.pnj/
let  image = false
let html = ''


module.exports = async () => {
  image = false
  while (!image) {
    await axios.get('http://le-jordi.com/random')
      // eslint-disable-next-line no-loop-func
      .then((response) => {
        html = response.data
      })
      .catch((error) => console.log(error))

    const $ = cheerio.load(html)

    image = $('.photo-post-photo').attr('data-retina')
  }
  //   images.each((i, item) => {
  //     data.push({
  //       link: item.attribs.src,
  //     })
  // console.log(data)
  //   })
  return image
}

