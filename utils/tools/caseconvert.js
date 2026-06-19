function execute(input, mode){
  const s = input || ''
  switch(mode){
    case 'upper': return s.toUpperCase()
    case 'lower': return s.toLowerCase()
    case 'title': return s.toLowerCase().replace(/(^|\s)\S/g, l=>l.toUpperCase())
    default: return s
  }
}
module.exports = { execute }
