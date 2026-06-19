// base64 encode/decode with UTF-8 support
function utf8ToBytes(str){
  const bytes = []
  for(let i=0;i<str.length;i++){
    let code = str.charCodeAt(i)
    if(code < 0x80){ bytes.push(code) }
    else if(code < 0x800){ bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f)) }
    else if(code < 0xd800 || code >= 0xe000){ bytes.push(0xe0 | (code >> 12), 0x80 | ((code>>6)&0x3f), 0x80 | (code & 0x3f)) }
    else{ // surrogate pair
      i++
      const code2 = str.charCodeAt(i)
      const full = 0x10000 + (((code & 0x3ff) << 10) | (code2 & 0x3ff))
      bytes.push(0xf0 | (full >> 18), 0x80 | ((full>>12)&0x3f), 0x80 | ((full>>6)&0x3f), 0x80 | (full & 0x3f))
    }
  }
  return bytes
}

function bytesToUtf8(bytes){
  let i=0, out=''
  while(i<bytes.length){
    const b1 = bytes[i++]
    if(b1 < 0x80) out += String.fromCharCode(b1)
    else if(b1 < 0xE0){ const b2 = bytes[i++]; out += String.fromCharCode(((b1 & 0x1F)<<6) | (b2 & 0x3F)) }
    else if(b1 < 0xF0){ const b2 = bytes[i++], b3 = bytes[i++]; out += String.fromCharCode(((b1 & 0x0F)<<12) | ((b2 & 0x3F)<<6) | (b3 & 0x3F)) }
    else{ const b2 = bytes[i++], b3 = bytes[i++], b4 = bytes[i++]; const code = ((b1 & 0x07)<<18) | ((b2 &0x3F)<<12) | ((b3 &0x3F)<<6) | (b4 &0x3F); const c = code - 0x10000; out += String.fromCharCode((c>>10)+0xD800, (c&0x3FF)+0xDC00) }
  }
  return out
}

const b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

function bytesToBase64(bytes){
  let output = ''
  let i=0
  while(i < bytes.length){
    const b1 = bytes[i++] || 0
    const b2 = i < bytes.length ? bytes[i++] : 0
    const b3 = i < bytes.length ? bytes[i++] : 0
    const enc1 = b1 >> 2
    const enc2 = ((b1 & 3) << 4) | (b2 >> 4)
    const enc3 = ((b2 & 15) << 2) | (b3 >> 6)
    const enc4 = b3 & 63
    if(isNaN(b2)){ output += b64chars.charAt(enc1) + b64chars.charAt(enc2) + '==' ; }
    else if(isNaN(b3)){ output += b64chars.charAt(enc1) + b64chars.charAt(enc2) + b64chars.charAt(enc3) + '=' }
    else{ output += b64chars.charAt(enc1) + b64chars.charAt(enc2) + b64chars.charAt(enc3) + b64chars.charAt(enc4) }
  }
  return output
}

function base64ToBytes(b64){
  b64 = String(b64).replace(/[^A-Za-z0-9+/=]/g, '')
  const bytes = []
  let i=0
  while(i < b64.length){
    const enc1 = b64chars.indexOf(b64.charAt(i++))
    const enc2 = b64chars.indexOf(b64.charAt(i++))
    const enc3 = b64chars.indexOf(b64.charAt(i++))
    const enc4 = b64chars.indexOf(b64.charAt(i++))
    const b1 = (enc1 << 2) | (enc2 >> 4)
    const b2 = ((enc2 & 15) << 4) | (enc3 >> 2)
    const b3 = ((enc3 & 3) << 6) | enc4
    bytes.push(b1)
    if(enc3 !== 64 && enc3 !== -1) bytes.push(b2)
    if(enc4 !== 64 && enc4 !== -1) bytes.push(b3)
  }
  return bytes
}

function encode(str){
  try{ if(typeof Buffer !== 'undefined'){ return Buffer.from(String(str||''), 'utf8').toString('base64') } }catch(e){}
  const bytes = utf8ToBytes(String(str||''))
  return bytesToBase64(bytes)
}

function decode(b64){
  try{ if(typeof Buffer !== 'undefined'){ return Buffer.from(String(b64||''), 'base64').toString('utf8') } }catch(e){}
  const bytes = base64ToBytes(String(b64||''))
  return bytesToUtf8(bytes)
}

function execute(input){ return encode(input) }

module.exports = { execute, encode, decode }
