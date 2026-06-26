Component({
  properties: {
    name: { type: String, value: '' },
    size: { type: Number, value: 24 },
    color: { type: String, value: '#111' }
  },
  data: { src: '' },
  attached() { this.updateSrc() },
  observers: {
    'name,size,color': function () { this.updateSrc() }
  },
  methods: {
    updateSrc() {
      const name = (this.data.name || '').toLowerCase()
      const color = this.data.color || '#111'
      const size = this.data.size || 24
      const svg = this.renderSvg(name, color, size)
      try {
        const base64 = this.encodeBase64(svg)
        this.setData({ src: 'data:image/svg+xml;base64,' + base64 })
      } catch (e) { this.setData({ src: '' }) }
    },
    encodeBase64(str) {
      try { if (typeof btoa === 'function') { return btoa(str) } } catch (e) { }
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
      let output = ''
      let i = 0
      const utf8 = unescape(encodeURIComponent(str))
      while (i < utf8.length) {
        const c1 = utf8.charCodeAt(i++)
        const c2 = utf8.charCodeAt(i++)
        const c3 = utf8.charCodeAt(i++)
        const e1 = c1 >> 2
        const e2 = ((c1 & 3) << 4) | (c2 >> 4)
        let e3 = ((c2 & 15) << 2) | (c3 >> 6)
        let e4 = c3 & 63
        if (isNaN(c2)) {
          e3 = e4 = 64
        } else if (isNaN(c3)) {
          e4 = 64
        }
        output += chars.charAt(e1) + chars.charAt(e2) + chars.charAt(e3) + chars.charAt(e4)
      }
      return output
    },
    renderSvg(name, color, size) {
      // simple 24x24 stroke-based icons, single-color
      const stroke = color
      const sw = 1.8
      switch (name) {
        case 'clock': return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><circle cx='12' cy='12' r='9' stroke='${stroke}' stroke-width='${sw}' fill='none' stroke-linecap='round' stroke-linejoin='round'/><line x1='12' y1='12' x2='12' y2='7' stroke='${stroke}' stroke-width='${sw}' stroke-linecap='round'/><line x1='12' y1='12' x2='15' y2='12' stroke='${stroke}' stroke-width='${sw}' stroke-linecap='round'/></svg>`
        case 'braces': return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M9 7c-1.5 0-2 1-2 2v2c0 1 0.5 2 2 2' stroke='${stroke}' stroke-width='${sw}' fill='none' stroke-linecap='round' stroke-linejoin='round'/><path d='M15 7c1.5 0 2 1 2 2v2c0 1-0.5 2-2 2' stroke='${stroke}' stroke-width='${sw}' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>`
        case 'hash': return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M7 4 L7 20 M17 4 L17 20 M4 9 L20 9 M4 15 L20 15' stroke='${stroke}' stroke-width='${sw}' stroke-linecap='round' stroke-linejoin='round'/></svg>`
        case 'code': return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M9 17 L4 12 L9 7' stroke='${stroke}' stroke-width='${sw}' stroke-linecap='round' stroke-linejoin='round'/><path d='M15 17 L20 12 L15 7' stroke='${stroke}' stroke-width='${sw}' stroke-linecap='round' stroke-linejoin='round'/></svg>`
        case 'shield': return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M12 2 L4 6v6c0 5 4 10 8 12 4-2 8-7 8-12V6L12 2z' stroke='${stroke}' stroke-width='${sw}' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>`
        case 'link': return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M10 14a5 5 0 0 0 7 0l1-1' stroke='${stroke}' stroke-width='${sw}' fill='none' stroke-linecap='round' stroke-linejoin='round'/><path d='M14 10a5 5 0 0 0-7 0l-1 1' stroke='${stroke}' stroke-width='${sw}' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>`
        case 'document': return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' stroke='${stroke}' stroke-width='${sw}' fill='none' stroke-linecap='round' stroke-linejoin='round'/><path d='M14 2v6h6' stroke='${stroke}' stroke-width='${sw}' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>`
        case 'image': return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect x='3' y='4' width='18' height='16' rx='2' stroke='${stroke}' stroke-width='${sw}' fill='none' stroke-linecap='round' stroke-linejoin='round'/><circle cx='8.5' cy='9.5' r='1.5' fill='${stroke}'/><path d='M21 19l-5-5-4 4-3-3-4 4' stroke='${stroke}' stroke-width='${sw}' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>`
        case 'sparkles': return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M12 2 L13 5 L16 6 L13 7 L12 10 L11 7 L8 6 L11 5 Z' fill='${stroke}'/><path d='M20 12 L21 13 L23 14 L21 15 L20 17 L19 15 L17 14 L19 13 Z' fill='${stroke}'/></svg>`
        case 'text': return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M4 7h16' stroke='${stroke}' stroke-width='${sw}' stroke-linecap='round'/><path d='M5 12h14' stroke='${stroke}' stroke-width='${sw}' stroke-linecap='round'/><path d='M7 17h10' stroke='${stroke}' stroke-width='${sw}' stroke-linecap='round'/></svg>`
        case 'filter': return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M22 3H2l8 9v7l4 2v-9z' stroke='${stroke}' stroke-width='${sw}' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>`
        case 'closet': return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect x='5' y='4' width='14' height='16' rx='2' stroke='${stroke}' stroke-width='${sw}' fill='none'/><path d='M12 4V20' stroke='${stroke}' stroke-width='${sw}'/><circle cx='10' cy='12' r='0.8' fill='${stroke}'/><circle cx='14' cy='12' r='0.8' fill='${stroke}'/></svg>`
        case 'inventory': return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect x='4' y='8' width='16' height='10' rx='2' stroke='${stroke}' stroke-width='${sw}' fill='none'/><path d='M4 8H20' stroke='${stroke}' stroke-width='${sw}' stroke-linecap='round'/><path d='M10 12H14' stroke='${stroke}' stroke-width='${sw}' stroke-linecap='round'/></svg>`
        default: return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10' fill='${stroke}'/></svg>`
      }
    }
  }
})
