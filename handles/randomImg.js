const axios = require('axios')
const cheerio = require('cheerio')
const mongoose = require('mongoose')
const Posts = require('./dbUpdate')


const pnj = /\.pnj/

let uniqueImg = false
let image
let html = ''

function pause500ms() {
  return new Promise((res) => setTimeout(res, 500))
}

module.exports = async () => {
  uniqueImg = false
  while (!uniqueImg) {
    await pause500ms()
    await axios.get('http://le-jordi.com/random')
      // eslint-disable-next-line no-loop-func
      .then((response) => {
        html = response.data
      })
      .catch((error) => console.log(error))

    const $ = cheerio.load(html)

    image = $('.photo-post-photo').attr('data-retina')

    uniqueImg = await Posts.verify(image)
    uniqueImg = uniqueImg
  }
  //   images.each((i, item) => {
  //     data.push({
  //       link: item.attribs.src,
  //     })
  // console.log(data)
  //   })
  return image
}

