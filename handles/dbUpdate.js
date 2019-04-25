const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
  image_url: {
    type: String,
    // index: true,
    // required: true,
    // sparse: true,
  },
}, {
  timestamps: true,
})

const Post = mongoose.model('Post', userSchema)

Post.verify = async (url) => {
  let unique = true
  const image = await Post.findOne({ image_url: url })
    .catch(console.error)

  if (image) {
    console.log(`Repeated: ${image.image_url}`)
    unique = false
  }
  else {
    const post = new Post()

    post.image_url = url
    console.log(`add: ${post.image_url}`)
    post.save()
  }
  return unique
}

module.exports = Post

