const { resolve } = require('path')
const { cwd } = require('process')

module.exports = {
  webpack: {
    alias: {
      '@': resolve(cwd(), 'src'),
    },
  },
}
