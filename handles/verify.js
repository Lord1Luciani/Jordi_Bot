module.exports = (ctx, action) => {
  let response = false

  switch (ctx.chat.id) {
    case 686968130:
      ctx.answerCbQuery(action, [true])
      response = true
      break
    case 66478514:
      ctx.answerCbQuery('Люблю тебя, Юрочка', [true])
      break
    default:
      ctx.answerCbQuery('Не для вас написано', [true])
      break
  }
  return response
}
