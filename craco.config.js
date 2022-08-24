const { resolve } = require('path')
const { cwd } = require('process')

module.exports = {
  webpack: {
    alias: {
      '@': resolve(cwd(), 'src'),
      '@components': resolve(cwd(), 'src/components'),
      '@pages': resolve(cwd(), 'src/pages'),
    },
  },
}
