// this will replace $value in mesasge with the value of the input
//  all occurances are replaced
export const parseCustomMessage = (
  input: any,
  message?: string,
  name?: string
) => {
  console.log('input', input)
  console.log('message', message)
  console.log('name', name)
  let msg = message
  if (msg) {
    msg = msg.replace(/\$value/g, input)
    if (name) {
      msg = msg.replace(/\$name/g, name)
    }
  }
  return msg
}
