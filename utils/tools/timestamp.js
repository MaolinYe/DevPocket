function execute(input){
  const v = (input||'').toString().trim()
  if(!v) throw new Error('请输入时间戳')
  let n = Number(v)
  if (v.length === 10) n = n * 1000
  const d = new Date(n)
  if (isNaN(d.getTime())) throw new Error('无效时间戳')
  return d.toString()
}
module.exports = { execute }
