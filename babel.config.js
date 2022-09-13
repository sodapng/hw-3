const isDevelopment = process.env.NODE_ENV !== 'production'

const presets = [
  '@babel/preset-env',
  [
    '@babel/preset-react',
    {
      runtime: 'automatic',
    },
  ],
  '@babel/preset-typescript',
]

const plugins = [isDevelopment && 'react-refresh/babel'].filter(Boolean)

module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV)

  return {
    presets,
    plugins,
  }
}
