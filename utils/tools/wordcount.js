function execute(input){
  const s = input || ''
  return { chars: s.length, words: s.trim() ? s.trim().split(/\s+/).length : 0 }
}
module.exports = { execute }
