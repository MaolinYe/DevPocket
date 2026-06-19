function execute(input){
  if(!input) return ''
  const trimmed = input.trim()
  try{
    const obj = JSON.parse(trimmed)
    return JSON.stringify(obj, null, 2)
  }catch(e){
    throw new Error('JSON 解析失败')
  }
}
module.exports = { execute }
