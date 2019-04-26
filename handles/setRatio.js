module.exports = (ctx) => {
  const ratio = ctx.message.text.split(/ +/)

  return Number(ratio[1])
}
