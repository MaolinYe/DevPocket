function encode(input){
  try{ return encodeURIComponent(input||'') }catch(e){ return '' }
}

function decode(input){
  try{ return decodeURIComponent(input||'') }catch(e){ return '' }
}

function execute(input){ return encode(input) }

module.exports = { execute, encode, decode }
