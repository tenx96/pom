// this will replace $value in mesasge with the value of the input
//  all occurances are replaced
export const parseCustomMessage = (
  input: any,
  message?: string,
  name?: string
) => {
  let msg = message
  if (msg) {
    msg = msg.replace(/\$value/g, input)
    if (name) {
      msg = msg.replace(/\$name/g, name)
    }
  }
  return msg
}
