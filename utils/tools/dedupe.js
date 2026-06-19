function execute(input){
  const lines = (input||'').split(/\r?\n/).map(l=>l.trim()).filter(Boolean)
  const seen = new Set(); const out = []
  for(const l of lines){ if(!seen.has(l)){ seen.add(l); out.push(l) }}
  return out.join('\n')
}
module.exports = { execute }
